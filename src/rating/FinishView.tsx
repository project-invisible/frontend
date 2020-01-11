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
        Thank you!
        </Typography>
        <Typography variant="body2" component="div">
        Thank you!
        Thank you very much for your time and thank you for helping us making the world a place of equal chances and equal opportunities!  We really appreciate it!
        Not happy? Give us feedback on this survey so that we can improve day by day.
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Give feedback</Button>
        <Button> Save rating</Button>
      </CardActions>
    </Card>);
}