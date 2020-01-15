import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { PointOfInterest } from "../types/PointOfInterest";
import { useDispatch } from "react-redux";
import { getDetails } from "./DetailsReducer";

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
  const dispatch = useDispatch();
  const { result } = props;

  const handleShowDetails = () => {
    dispatch(getDetails(true, result.id));
  };

  return (
    <>
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
            <Rating name="disabled" value={result.overallRating} disabled />
            <Typography className={classes.rating}>
              {result.overallRating}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleShowDetails()}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
