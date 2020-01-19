import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Rating, RatingOptions, CategoryRating } from "../types/Rating";
import RatingView from "./RatingView";
import { MobileStepper, CardActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { Card, CardContent, Typography } from "@material-ui/core";
import FinishView from "./FinishView";
import IntroductionView from "./IntroductionView";
import { useDispatch, useSelector } from "react-redux";
import { openModal, addRating } from "./RatingReducer";
import { Status, Role } from "../types/User";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    modalContent: {
      width: "30em"
    },
    startContainer: {
      justifyContent: "flex-end"
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  })
);

const ratingDummy: Rating = {
  id: 1,
  generalComment: "Test",
  user: {
    id: 1,
    email: "Test",
    username: "Test",
    anonymous: true,
    role: Role.USER,
    creationDate: new Date("December 17, 1995 03:24:00"),
    password: "test",
    status: Status.ACTIVE,
    contact: {
      email: "test",
      urls: ["test", "test"],
      phone: 1239234
    }
  },
  pointOfInterest: {
    id: 2,
    city: "Test",
    coordinates: {
      x: 2342,
      y: 234
    },
    street: "213fdsf",
    description: "sdff",
    email: "",
    name: "",
    overallRating: 2,
    postal: 123,
    website: ""
  },
  categoryRatings: [
    {
      id: 1,
      comment: "dummy",
      tag: ["tag"],
      rating: RatingOptions.YES,
      question: {
        id: 1245,
        text: "test",
        category: {
          id: 1,
          name: "Category 1"
        },
        hasCheckbox: true,
        followUpQuestions: [],
        subCategory: {
          id: 345,
          name: "ttwerwe",
          category: {
            id: 1,
            name: "Category 1"
          }
        }
      }
    },
    {
      id: 12444,
      comment: "dummy",
      tag: ["tag", "tag2"],
      rating: RatingOptions.YES,
      question: {
        id: 1245,
        text: "Question 2",
        category: {
          id: 1,
          name: "Category 1"
        },
        hasCheckbox: true,
        followUpQuestions: [1],
        subCategory: {
          id: 345,
          name: "ttwerwe",
          category: {
            id: 1,
            name: "Category 1"
          }
        }
      }
    }
  ]
};

export default function RatingModal() {
  const classes = useStyles({});
  const [rating, setRating] = React.useState<Rating>(ratingDummy);
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = React.useState<number>(-1);
  const [skipNextQuestion, setSkipNextQuestion] = React.useState<boolean>(false);
  const toggleModal: boolean = useSelector(
    (state: any) => state.ratingStore.modalOpen
  );

  const setPageRating = (checkedBox: RatingOptions) => {
    // deep copy of state object
    let oldRating: Rating = JSON.parse(JSON.stringify(rating));
    oldRating.categoryRatings[pageCount].rating = checkedBox;
    setRating(oldRating);
  };

  useEffect(() => {
    checkFollowUpQuestions();
 }, [rating]);

  const setPageRatingText = (text: string) => {
    let oldRating: Rating = JSON.parse(JSON.stringify(rating));
    oldRating.categoryRatings[pageCount].comment = text;
    setRating(oldRating);
  };

  const addTag = (tag: string) => {
    let oldRating: Rating = JSON.parse(JSON.stringify(rating));
    oldRating.categoryRatings[pageCount].tag.push(tag);
    setRating(oldRating);
  };

  const checkFollowUpQuestions = (incrementor = 1) => {
    const followUpQuestions =
      rating.categoryRatings[pageCount + incrementor].question.followUpQuestions;
    let relevantQuestions: CategoryRating[] = [];
    followUpQuestions.forEach(filterId => {
      const matchingRating = rating.categoryRatings.filter(categoryRating => {
        return categoryRating.id === filterId;
      });
      relevantQuestions = matchingRating;
    });
    const skipQuestion = relevantQuestions.some(
      rating => rating.rating === RatingOptions.FALSE
    );
    setSkipNextQuestion( skipQuestion);
  };

  const handleNext = () => {
    if (skipNextQuestion) {
      setPageCount(pageCount => pageCount + 2);
    } else {
      setPageCount(pageCount => pageCount + 1);
    }
  };

  const handleBack = () => {
    if (skipNextQuestion) {
      setPageCount(pageCount => pageCount - 2);
    } else {
      setPageCount(pageCount => pageCount - 1);
    }
  };

  const maxPages = rating.categoryRatings.length + 1;

  return (
    <div className={classes.root}>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            dispatch(openModal(true));
          }}
        >
          Rate
        </Button>
      </CardActions>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={toggleModal}
        onClose={() => dispatch(openModal(false))}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={toggleModal}>
          <Card className={classes.modalContent}>
            <CardContent>
              {pageCount === -1 ? (
                <IntroductionView currentUniversity={rating.pointOfInterest} />
              ) : pageCount < maxPages - 1 ? (
                <RatingView
                  currentPage={rating.categoryRatings[pageCount]}
                  setPageRating={setPageRating}
                  setPageText={setPageRatingText}
                  addTag={addTag}
                />
              ) : (
                <FinishView />
              )}
            </CardContent>
            {pageCount === -1 ? (
              <CardActions className={classes.startContainer}>
                <Button onClick={handleNext}>Start survey</Button>
              </CardActions>
            ) : (
              <MobileStepper
                steps={maxPages}
                position="static"
                variant="text"
                activeStep={pageCount}
                nextButton={
                  <Button
                    size="small"
                    onClick={
                      pageCount === maxPages - 2
                        ? () => dispatch(addRating(rating))
                        : handleNext
                    }
                    disabled={pageCount === maxPages - 1}
                  >
                    <Typography variant="body2" component="p">
                      {pageCount === maxPages - 2 ||
                      (skipNextQuestion && pageCount === maxPages - 3) ? (
                        <p>Save Rating</p>
                      ) : (
                        <p>Next</p>
                      )}
                    </Typography>
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={pageCount === 0}
                  >
                    <KeyboardArrowLeft />
                    <Typography variant="body2" component="p">
                      Back
                    </Typography>
                  </Button>
                }
              />
            )}
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
