import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  RadioGroup,
  Chip
} from "@material-ui/core";
import { Rating, RatingOptions, CategoryRating } from "../types/Rating";
import Radio from "@material-ui/core/Radio";
import AddCircle from "@material-ui/icons/AddCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ratingContent: {
      height: "100%"
    }
  })
);

type ResultProps = {
  currentPage: CategoryRating;
  setPageRating: (criteriaRating: RatingOptions) => void;
  setPageText: (text: string) => void;
  addTag: (string) => void;
};

export default function RatingView(props: ResultProps) {
  const classes = useStyles({});
  const { currentPage, setPageRating, setPageText, addTag } = props;
  const [tag, setTag] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: RatingOptions =
      RatingOptions[(event.target as HTMLInputElement).value];
    setPageRating(value);
  };

  const onAddTag = () => {
    addTag(tag);
    setTag("");
  };

  return (
    <Card className={classes.ratingContent}>
      <CardContent>
        <Typography variant="h4" component="h2">
          {`${currentPage.question.category.name} - ${currentPage.question.subCategory.name}`}
        </Typography>
        <div>
          <Typography variant="body2" component="div">
            {currentPage.question.text}
          </Typography>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={currentPage.rating}
            onChange={handleChange}
          >
            <FormControlLabel
              value={RatingOptions.YES}
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value={RatingOptions.FALSE}
              control={<Radio />}
              label="False"
            />
            <FormControlLabel
              value={RatingOptions.UNDECIDED}
              control={<Radio />}
              label="Undecided"
            />
          </RadioGroup>
          <TextField
            aria-label="empty textarea"
            placeholder="Enter a comment for this question!"
            onChange={event => setPageText(event.target.value)}
            value={currentPage.comment}
            multiline
            rows="4"
            variant="outlined"
          />
        </div>
        <div>
          {currentPage.tag.map((tag, index) => {
            return <Chip key={index} label={tag} />;
          })}
        </div>
        <TextField
          id="standard-basic"
          label="Add tag"
          value={tag}
          onChange={event => setTag(event.target.value)}
        />
        <IconButton onClick={onAddTag} aria-label="add">
          <AddCircle />
        </IconButton>
      </CardContent>
    </Card>
  );
}
