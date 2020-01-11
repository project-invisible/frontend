import React,  { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    finishContent: {
        height: '100%',
    }
  }),
);

export default function FinishView() {
  const classes = useStyles({});

  return (<Card className={classes.finishContent}>
      <CardContent>
        <Typography variant="h4" component="h2">
          Congratulations! You have finished the rating!
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Give feedback</Button>
        <Button> Save rating</Button>
      </CardActions>
    </Card>);
}