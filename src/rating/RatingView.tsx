import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  RadioGroup,
  Chip,
  Grid
} from "@material-ui/core";
import { Rating, RatingOptions, CategoryRating, Category, SubCategory } from "../types/Rating";
import Radio from "@material-ui/core/Radio";
import AddCircle from "@material-ui/icons/AddCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { Question } from './../types/Rating';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ratingContent: {
      height: "100%"
    },
    textFields: {
      width: "100%",
      marginBottom: "0.3em"
    },
    chip: {
      margin: "0.2em"
    }
  })
);

type ResultProps = {
  currentPage: CategoryRating;
  setPageRating: (criteriaRating: RatingOptions) => void;
  setPageText: (text: string) => void;
  addTag: (string) => void;
  removeTag: (string) => void;
  handleFollowUp: (RatingOptions) => void;
};

interface ChipData {
    key: number;
    label: string;
  }

export default function RatingView(props: ResultProps) {
  const classes = useStyles({});
  const { currentPage, setPageRating, setPageText, addTag, removeTag, handleFollowUp } = props;
  const [tag, setTag] = useState<string>("");
  const categories: Category[] = useSelector(
    (state: any) => state.ratingStore.categories
  );
  const subCategories: SubCategory[] = useSelector(
    (state: any) => state.ratingStore.subCategories
  );
  const questions: Question[] = useSelector(
    (state: any) => state.ratingStore.questions
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: RatingOptions =
      RatingOptions[(event.target as HTMLInputElement).value];
    setPageRating(value);
    if (value !== RatingOptions.YES) {
      handleFollowUp(value);
    }
  };

  const onAddTag = () => {
    addTag(tag);
    setTag("");
  };

  const handleDelete = (tag: string) => {
        removeTag(tag);
  }

  const question = questions.find( question => question.id === currentPage.questionId);
  const category = categories.find( category => category.id === question.categoryId);
  const subCategory = subCategories.find( subCategory => subCategory.id === question.subCategoryId); 
  console.log(categories);
  console.log(question);

  return (
    <Card className={classes.ratingContent}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h2">
              {`${category && category.name} ${subCategory && subCategory.name !== null ? `- ${subCategory.name}` : ``}`}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Typography variant="body2" component="div">
                {question.text}
              </Typography>
            </Grid>
            {question.hasCheckbox && (
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
            )}
            <TextField
              aria-label="empty textarea"
              placeholder="Enter a comment for this question!"
              onChange={event => setPageText(event.target.value)}
              value={currentPage.comment}
              className={classes.textFields}
              multiline
              rows="4"
              variant="outlined"
            />
          </Grid>
          <Grid xs={12}>
            {currentPage.tag.map((tag, index) => {
              return (
                <Chip
                  key={index}
                  label={tag}
                  className={classes.chip}
                  onDelete={() => handleDelete(tag)}
                />
              );
            })}
          </Grid>
          <Grid container xs={12}>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Add tag"
                value={tag}
                className={classes.textFields}
                onChange={event => setTag(event.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={onAddTag} aria-label="add">
                <AddCircle />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
