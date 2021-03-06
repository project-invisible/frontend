import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { PointOfInterest } from "./../types/PointOfInterest";
import { getDetails } from "./DetailsReducer";
import { useDispatch } from "react-redux";
import { useLeaflet } from "react-leaflet";
import { marker } from "leaflet";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ratingContainer: {
      display: "flex",
      alignItems: "center"
    },
    rating: {
      display: "inline-block",
      marginLeft: "5px"
    }
  })
);

type ResultProps = {
  result: PointOfInterest;
};

export default function Result(props: ResultProps) {
  const classes = useStyles({});
  const { result } = props;
  const dispatch = useDispatch();

  const { map } = useLeaflet();

  const handleShowDetails = () => {
    dispatch(getDetails(true, result.id));
    map.flyTo([result.coordinates.y, result.coordinates.x], 12);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {result.name}
        </Typography>
        <Typography color="textSecondary">{result.street}</Typography>
        <Typography variant="body2" component="p">
          {result.postal}
        </Typography>
        <div className={classes.ratingContainer}>
          {result.overallRatingPerQuestion ? (
            result.overallRatingPerQuestion.map((question, index) => {
              return (
                <div>
                  <div>
                    <div>{question.question.text}</div>
                    <ThumbUp />
                    <p>{`${question.rating *
                      100}% agree with this question.`}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div />
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleShowDetails()}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
