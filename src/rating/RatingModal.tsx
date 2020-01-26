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
import { openModal, addRating, getQuestions } from "./RatingReducer";
import { Status, Role } from "../types/User";
import { PointOfInterest } from "./../types/PointOfInterest";
import Result from "./../map/SearchResult";
import { useHistory } from "react-router-dom";
import { Question } from "./../types/Rating";

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
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200
      }
    }
  })
);

type ResultProps = {
  ratedPoi: PointOfInterest;
};

export default function RatingModal(props: ResultProps) {
  const classes = useStyles({});
  const { ratedPoi } = props;
  const [rating, setRating] = React.useState<Rating>(null);
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = React.useState<number>(-1);
  const [followUpQuestions, setFollowUpQuestions] = useState<Array<number>>([]);
  const [skipNextQuestion, setSkipNextQuestion] = React.useState<boolean>(
    false
  );
  const [maxPages, setMaxPages] = useState<number>(0);
  const history = useHistory();
  const token: string = useSelector((state: any) => state.registerStore.token);
  const userId: number = useSelector((state: any) => state.registerStore.id);
  const toggleModal: boolean = useSelector(
    (state: any) => state.ratingStore.modalOpen
  );
  const questions: Question[] = useSelector(
    (state: any) => state.ratingStore.questions
  );

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  const generateRating = () => {
    let categorieRatings: CategoryRating[] = [];
    questions.forEach(question => {
      const categorieRating: CategoryRating = {
        comment: "",
        id: null,
        rating: RatingOptions.YES,
        tag: [],
        questionId: question.id
      };
      categorieRatings.push(categorieRating);
    });
    const generatedRating: Rating = {
      categorieRatings,
      generalComment: "",
      id: null,
      userId,
      poiId: ratedPoi.id
    };
    setMaxPages(categorieRatings.length + 1);
    setRating(generatedRating);
  };

  useEffect(() => {
    if (toggleModal) {
      generateRating();
      setPageCount(-1);
      setSkipNextQuestion(false);
    }
  }, [toggleModal]);

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
    const filteredTags = oldRating.categorieRatings[pageCount].tag.filter(
      e => e !== tag
    );
    oldRating.categorieRatings[pageCount].tag = filteredTags;
    setRating(oldRating);
  };

  const checkFollowUpQuestions = (increment: number, direction: number) => {
    if (
      followUpQuestions.includes(
        rating.categorieRatings[pageCount + increment].questionId
      )
    ) {
      checkFollowUpQuestions(increment + direction, direction);
    } else {
      setPageCount(pageCount + increment);
    }
  };

  const handleFollowUpQuestions = (selectedRating: RatingOptions) => {
    const question = questions.find(question => question.id === rating.categorieRatings[pageCount].questionId);
    if (!(selectedRating === RatingOptions.YES)) {
      if (question.followUpQuestion) {
        question.followUpQuestion.forEach(
          followUpId => {
            setFollowUpQuestions(oldArray => [...oldArray, followUpId]);
          }
        );
      }
    }
  };

  const handleNext = () => {
    checkFollowUpQuestions(1, 1);
  };

  const handleBack = () => {
    checkFollowUpQuestions(-1, -1);
  };

  const checkLoginOpenModal = () => {
    if (token && token !== "") {
      dispatch(openModal(true));
    } else {
      history.push("/login");
    }
  };

  return (
    <div className={classes.root}>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            checkLoginOpenModal();
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
                rating ? (
                  <IntroductionView currentUniversity={ratedPoi} />
                ) : (
                  <div />
                )
              ) : pageCount < maxPages - 1 ? (
                <RatingView
                  currentPage={rating.categorieRatings[pageCount]}
                  setPageRating={setPageRating}
                  setPageText={setPageRatingText}
                  addTag={addTag}
                  removeTag={removeTag}
                  handleFollowUp={handleFollowUpQuestions}
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
                            setPageCount(pageCount + 1);
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
