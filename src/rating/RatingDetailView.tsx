import React, { useEffect } from "react";
import { PointOfInterest } from "../types/PointOfInterest";
import { getRatingsForPoi } from "./RatingReducer";
import { Rating, RatingOptions, Question } from "./../types/Rating";
import Face from "@material-ui/icons/Face";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
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
import { User } from "./../types/User";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "./../user/UserReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowY: "auto",
      width: 400,
      maxHeight: "32rem"
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
    },
    account: {
      "&:hover": {
        cursor: "pointer"
      }
    },
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em"
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey"
      }
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
  const history = useHistory();
  const currentUser: User = useSelector(
    (state: any) => state.userStore.fetchedUser
  );
  const questions: Question[] = useSelector(
    (state: any) => state.ratingStore.questions
  );

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

  useEffect(() => {
    dispatch(getCurrentUser(rating.userId));
  }, []);

  return (
    <div className={classes.root}>
      <Card className={classes.rating}>
        <CardContent>
          <IconButton
            className={classes.iconButton}
            onClick={() => setDetailRating(null)}
          >
            <KeyboardArrowLeft />
            <Typography
              className={classes.iconText}
              variant="body2"
              component="p"
            >
              Go back
            </Typography>
          </IconButton>
          <div>
            <Grid
              container
              className={classes.account}
              onClick={() => {
                history.push({
                  pathname: "/user",
                  state: {
                    userId: rating.userId
                  }
                });
              }}
            >
              <Grid item xs={1}>
                <Face />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="body2" component="p">
                  {currentUser.email}
                </Typography>
              </Grid>
            </Grid>
            {rating.generalComment && (
              <Typography variant="body2">
                General comment: {rating.generalComment}
              </Typography>
            )}
            {rating.categorieRatings.map((categorieRating, index) => {
              const question = questions.find(
                question => question.id === categorieRating.questionId
              );
              return (
                <div>
                  <Divider className={classes.divider} />
                  <Typography
                    variant="subtitle2"
                    className={classes.questionText}
                  >
                    {question.text}
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
                  {categorieRating.comment && (
                    <Typography variant="body2">
                      {`Comment: ${categorieRating.comment}`}
                    </Typography>
                  )}
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
            <IconButton
              className={classes.iconButton}
              onClick={() => reportRating()}
            >
              <Typography
                className={classes.iconText}
                variant="body2"
                component="p"
              >
                {user ? `Report rating` : `Login to report rating`}
              </Typography>
              <ReportIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
