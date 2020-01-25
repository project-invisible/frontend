import React, { useEffect } from "react";
import { PointOfInterest } from "../types/PointOfInterest";
import { getRatingsForPoi } from "./RatingReducer";
import { Rating, RatingOptions } from "./../types/Rating";
import Face from "@material-ui/icons/Face";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconButton from "@material-ui/core/IconButton";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  RadioGroup
} from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import { postRatingReport } from "./../admin/AdminReducer";
import { RatingReport } from "../types/Reports";
import { useDispatch, useSelector } from "react-redux";
import { User } from "./../types/User";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowY: "auto",
      width: 400
    },
    rating: {
      marginTop: "0.5em"
    },
    chip: {
      margin: "0.2em"
    },
    divider: {
      margin: "0.5em 0"
    },
    questionText: {
      fontWeight: 600
    },
    iconButton: {
      borderRadius: "15px",
      marginBottom: "5px",
      padding: "8px"
    },
    iconText: {
      marginRight: "5px"
    }
  })
);

export interface RatingDetailViewProps {
  rating: Rating;
  setDetailRating: (rating: Rating) => void;
}

export default function RatingDetailView(props: RatingDetailViewProps) {
  const classes = useStyles({});
  const { rating, setDetailRating } = props;
  const dispatch = useDispatch();
  const user: User = useSelector((state: any) => state.registerStore.user);

  const reportRating = () => {
    if (user) {
      const ratingReport: RatingReport = {
        id: null,
        reportingUser: user,
        rating,
        reportDate: null,
        solved: false
      };
      dispatch(postRatingReport(ratingReport));
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.rating}>
        <CardContent>
          <IconButton className={classes.iconButton} onClick={() => setDetailRating(null)}>
            <KeyboardArrowLeft />
            <Typography className={classes.iconText} variant="body2" component="p">
              Go back
            </Typography>
          </IconButton>
          <div>
            <Grid container>
              <Grid item xs={1}>
                <Face />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="body2" component="p">
                  {rating.user.email}
                </Typography>
              </Grid>
            </Grid>
            <IconButton onClick={() => reportRating()}>
              <Typography variant="body2" component="p">
                {user ? `Report rating` : `Login to report rating`}
              </Typography>
              <ReportIcon />
            </IconButton>
            <Typography variant="body2">
              General comment: {rating.generalComment}
            </Typography>
            {rating.categorieRatings.map((categorieRating, index) => {
              return (
                <div>
                  <Divider className={classes.divider} />
                  <Typography
                    variant="subtitle2"
                    className={classes.questionText}
                  >
                    {categorieRating.question.text}
                  </Typography>
                  <RadioGroup
                    aria-label="answer"
                    name={`rating-${index}`}
                    value={categorieRating.rating}
                  >
                    {categorieRating.rating === RatingOptions.YES && (
                      <Typography variant="body2">Answer: Yes</Typography>
                    )}
                    {categorieRating.rating === RatingOptions.FALSE && (
                      <Typography variant="body2">Answer: No</Typography>
                    )}
                    {categorieRating.rating === RatingOptions.UNDECIDED && (
                      <Typography variant="body2">Answer: Undecided</Typography>
                    )}
                  </RadioGroup>
                  {categorieRating.tag.length > 0 && (
                    <div>
                      Tags:
                      {categorieRating.tag.map((tag, index) => {
                        return (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            className={classes.chip}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
