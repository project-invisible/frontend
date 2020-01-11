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
          Welcome to rating {currentUniversity.name}! In the following you will rate the university in different categories. You are also allowed to skip some of the categories. Much fun!
        </Typography>
      </CardContent>
    </Card>);
}