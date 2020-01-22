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
import { PointOfInterest } from './../types/PointOfInterest';
import Result from './../map/SearchResult';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    modalContent: {
      width: "75%"
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
    id: 8,
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
  poi: {
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
    postal: 123,
    website: "",
    overallRatingPerQuestion: [
      {
        question: {
          id: 1,
          category: {
            id: 2,
            name: "Category 1"
          },
          subCategory: {
            id: 3,
            name: "Subcategory 2",
            category: {
              id: 2,
              name: "Category 1"
            },
          },
          followUpQuestions: [],
          hasCheckbox: true,
          text: "Does the university have an equality officer?"
        },
        rating: 0.89
      },
      {
        question: {
          id: 2,
          category: {
            id: 2,
            name: "Category 1"
          },
          subCategory: {
            id: 3,
            name: "Subcategory 2",
            category: {
              id: 2,
              name: "Category 1"
            },
          },
          followUpQuestions: [],
          hasCheckbox: true,
          text: "Do you feel treated well?"
        },
        rating: 0.43
      }
    ]
  },
  categorieRatings: [
    {
      id: 1,
      comment: "",
      tag: ["fb4"],
      rating: RatingOptions.YES,
      question: {
        id: 1245,
        text: "This is the first question. There is some text explaining the question. What do you think?",
        category: {
          id: 1,
          name: "Category 1"
        },
        hasCheckbox: true,
        followUpQuestions: [],
        subCategory: {
          id: 345,
          name: "Subcategory 1",
          category: {
            id: 1,
            name: "Category 1"
          }
        }
      }
    },
    {
      id: 12444,
      comment: "",
      tag: ["fachbereich4", "computer science"],
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
          name: "Subcategory 2",
          category: {
            id: 1,
            name: "Category 1"
          }
        }
      }
    }
  ]
};

type ResultProps = {
  ratedPoi: PointOfInterest,
}

export default function RatingModal(props: ResultProps) {
  const classes = useStyles({});
  const { ratedPoi } = props;
  const [rating, setRating] = React.useState<Rating>(ratingDummy);
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = React.useState<number>(-1);
  const [skipNextQuestion, setSkipNextQuestion] = React.useState<boolean>(false);
  const toggleModal: boolean = useSelector(
    (state: any) => state.ratingStore.modalOpen
  );

  useEffect(() => {
    if ( toggleModal ) {
      let oldRating: Rating = ratingDummy;
      oldRating.poi = ratedPoi;
      setRating(oldRating);
      setPageCount(-1);
      setSkipNextQuestion(false);
    }
 }, [toggleModal]);

 useEffect(() => {
   checkFollowUpQuestions();
}, [rating]);

  const setPageRating = (checkedBox: RatingOptions) => {
    // deep copy of state object
    let oldRating: Rating = JSON.parse(JSON.stringify(rating));
    oldRating.categorieRatings[pageCount].rating = checkedBox;
    setRating(oldRating);
  };

  const setPageRatingText = (text: string) => {
    let oldRating: Rating = JSON.parse(JSON.stringify(rating));
    oldRating.categorieRatings[pageCount].comment = text;
    setRating(oldRating);
  };

  const addTag = (tag: string) => {
    let oldRating: Rating = JSON.parse(JSON.stringify(rating));
    oldRating.categorieRatings[pageCount].tag.push(tag);
    setRating(oldRating);
  };
  
  const removeTag = (tag: string) => {
    let oldRating: Rating = JSON.parse(JSON.stringify(rating));
    const filteredTags = oldRating.categorieRatings[pageCount].tag.filter(e => e !== tag);
    oldRating.categorieRatings[pageCount].tag = filteredTags;
    setRating(oldRating);
  };

  const checkFollowUpQuestions = (incrementor = 1) => {
    if (rating.categorieRatings[pageCount + incrementor] === undefined) {
      setSkipNextQuestion( false );
    } else {
      const followUpQuestions =
        rating.categorieRatings[pageCount + incrementor].question.followUpQuestions;
      let relevantQuestions: CategoryRating[] = [];
      followUpQuestions.forEach(filterId => {
        const matchingRating = rating.categorieRatings.filter(categoryRating => {
          return categoryRating.id === filterId;
        });
        relevantQuestions = matchingRating;
      });
      const skipQuestion = relevantQuestions.some(
        rating => rating.rating === RatingOptions.FALSE
      );
      setSkipNextQuestion( skipQuestion);
    }
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

  const maxPages = rating.categorieRatings.length + 1;

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
                <IntroductionView currentUniversity={rating.poi} />
              ) : pageCount < maxPages - 1 ? (
                <RatingView
                  currentPage={rating.categorieRatings[pageCount]}
                  setPageRating={setPageRating}
                  setPageText={setPageRatingText}
                  addTag={addTag}
                  removeTag={removeTag}
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
                        ? () => {
                          setPageCount( pageCount + 1);
                          dispatch(addRating(rating));
                        }
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
