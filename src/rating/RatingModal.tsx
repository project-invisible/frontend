import React,  { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Rating } from '../types/Rating';
import RatingView from './RatingView';
import { MobileStepper, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Card, CardContent, Typography } from '@material-ui/core';
import FinishView from './FinishView';
import IntroductionView from './IntroductionView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
        width: '30em',
    },
    startContainer: {
        justifyContent: 'flex-end',
    }
  }),
);

const ratingDummy: Rating = {
    id: 1,
    pointOfInterest: {
        id: 2,
        city: 'Test',
        coordinates: {
            x: 2342,
            y: 234,
        },
        street: '213fdsf',
        description: 'sdff',
        email: '',
        name: '',
        overallRating: 2,
        postal: 123,
        website: '',
    },
    overallRating: 1,
    criteriaRatings: [
        {
            id: 1,
            name: 'Seite 1',
            overallRating: 3,
            criteriaRatings: [{
                criteriaRating: null,
                criteriaText: 'Test',
                name: 'Erstes Rating'
            },
            {
                criteriaRating: null,
                criteriaText: 'Test',
                name: 'Zweites Rating'
            }
        ]
        },
        {
            id: 1,
            name: 'Seite 2',
            overallRating: 3,
            criteriaRatings: [{
                criteriaRating: null,
                criteriaText: 'Test',
                name: 'Name'
            },
            {
                criteriaRating: null,
                criteriaText: 'Test',
                name: 'Name'
            }
        ]
        },
    ], 
}

export default function RatingModal() {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState<Rating>(ratingDummy);
  const [pageCount, setPageCount] = React.useState<number>(-1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setPageRating = (criteriaRating: number, index: number) => {
        // deep copy of state object
        let oldRating: Rating = JSON.parse(JSON.stringify(rating));
        oldRating.criteriaRatings[pageCount].criteriaRatings[index].criteriaRating = criteriaRating;
        setRating(oldRating);
    }

    const setPageRatingText = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        let oldRating: Rating = JSON.parse(JSON.stringify(rating));
        oldRating.criteriaRatings[pageCount].criteriaRatings[index].criteriaText = event.target.value;
        setRating(oldRating);
      };

    const handleNext = () => {
        setPageCount(pageCount => pageCount + 1);
      };
    
      const handleBack = () => {
        setPageCount(pageCount => pageCount - 1);
      };

      const maxPages = rating.criteriaRatings.length + 1;

  return (
    <div>
      <CardActions>
        <Button size="small" onClick={handleOpen}>Rate</Button>
      </CardActions>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <Card className={classes.modalContent}>
                <CardContent>
                {
                    pageCount === -1 ? (
                        <IntroductionView currentUniversity={rating.pointOfInterest} />
                    ) :
                    (pageCount < (maxPages - 1)) ? (<RatingView
                        currentPage={rating.criteriaRatings[pageCount]}
                        setPageRating={setPageRating}
                        setPageText={setPageRatingText}
                         />) : (<FinishView/>)
                }
                </CardContent>
                {
                    pageCount === -1 ? (
                        <CardActions className={classes.startContainer}>
                            <Button onClick={handleNext}>Start survey</Button>
                        </CardActions>
                        ) : (<MobileStepper
                                steps={maxPages}
                                position="static"
                                variant="text"
                                activeStep={pageCount}
                                nextButton={
                                <Button size="small" onClick={handleNext} disabled={pageCount === maxPages - 1}>
                                    <Typography variant="body2" component="p">Next</Typography>
                                    <KeyboardArrowRight />
                                </Button>
                                }
                                backButton={
                                <Button size="small" onClick={handleBack} disabled={pageCount === 0}>
                                    <KeyboardArrowLeft />
                                    <Typography variant="body2" component="p">Back</Typography>
                                </Button>
                                }
                />)}
            </Card>
            </Fade>
      </Modal>
    </div>
  );
}