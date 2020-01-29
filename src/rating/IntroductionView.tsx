import React,  { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { PointOfInterest } from '../types/PointOfInterest';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    introductionContent: {
        height: '100%',
    }
  }),
);

type IntroductionProps = {
  currentUniversity: PointOfInterest,
}

export default function IntroductionView(props: IntroductionProps) {
  const classes = useStyles({});
  const { currentUniversity } = props;

  return (<Card className={classes.introductionContent}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Introduction
          </Typography>
        <Typography variant="body2" component="div">
        In the following survey you can share your personal experiences with {currentUniversity.name}. The rating is divided into four sections: Guidelines and diversity management, Architecture, Organization of work, study and teaching. 
It’s important to us that you have the freedom what to rate and how so if you don’t want to rate certain sections you can just skip them. In the beginning you can decide if you want to leave a general comment or participate in a more detailed survey.
In any case, we want to be treated respectfully and should treat others with respect as well. 
If you are unsure about the content you want to post we kindly recommend to read our code of conduct that you can find here. 
Thank you for your participation, it means a lot to us!
        </Typography>
      </CardContent>
    </Card>);
}