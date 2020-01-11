import React,  { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SearchResult } from './../types/SearchResult';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import { PointOfInterest } from '../types/PointOfInterest';
import RatingModal from './../rating/RatingModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    rating: {
        display: 'inline-block',
        marginLeft: '5px',
    }
  }),
);

type ResultProps = {
    result: PointOfInterest,
}

export default function Result(props: ResultProps) {
  const classes = useStyles({});
  const { result } = props;

  return (<Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {result.name}
        </Typography>
        <Typography color="textSecondary">
          {result.street}
        </Typography>
        <Typography variant="body2" component="p">
          {result.postal}
        </Typography>
        <div className={classes.ratingContainer}>
            <Rating name="disabled" value={result.overallRating} disabled />
            <Typography className={classes.rating}>{result.overallRating}</Typography>    
        </div>
        <RatingModal />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>);
}