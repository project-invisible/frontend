import React,  { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import { Criteria } from '../types/Rating';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      ratingContent: {
          height: '100%',
      }
  }),
);

type ResultProps = {
    currentPage: Criteria,
    setPageRating: (criteriaRating: number, index: number) => void,
    setPageText: (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void,
}

export default function RatingView(props: ResultProps) {
  const classes = useStyles({});
  const { currentPage, setPageRating, setPageText } = props;

  return (<Card className={classes.ratingContent}>
      <CardContent>
        <Typography variant="h4" component="h2">
          {currentPage.name}
        </Typography>
        {
            currentPage.criteriaRatings.map( (rating, index) => {
                return (
                    <div key={`${index}-rating`}>
                        <Typography variant="h5" component="h2">
                            {rating.name}
                        </Typography>
                        <div>
                            <Rating
                                name={`simple-controlled-${index}`}
                                key={`${index}-rating-button`}
                                value={rating.criteriaRating}
                                onChange={(event, newValue) => {
                                    setPageRating(newValue, index);
                                }}
                            />
                        </div>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Enter the rating for this category" 
                            onChange={event => setPageText(event, index)}
                        />
                    </div>
                )
            })
        }
      </CardContent>
    </Card>);
}