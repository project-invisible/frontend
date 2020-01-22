import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { PointOfInterest } from "../types/PointOfInterest";
import RatingModal from "../rating/RatingModal";
import RatingShortView from "./../rating/RatingShortView";
import { Rating } from "./../types/Rating";
import RatingDetailView from "../rating/RatingDetailView";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400
    },
  })
);


export default function DetailView() {
  const [detailRating, setDetailRating] = useState<Rating>(null);
  const classes = useStyles({});
  const detail: PointOfInterest = useSelector(
    (state: any) => state.detailsStore.detailPOI
  );

  useEffect(() => {
    setDetailRating(null);
  }, [detail]);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {detail.name}
          </Typography>
          {detail.street && (
            <Typography color="textSecondary">{detail.street}</Typography>
          )}
          {detail.postal && detail.city && (
            <Typography variant="body2" component="p">
              {`${detail.postal} ${detail.city}`}
            </Typography>
          )}
          {detail.website && (
            <Typography variant="body2" component="p">
              {detail.website}
            </Typography>
          )}
        </CardContent>
        <RatingModal ratedPoi={detail} />
      </Card>
      {detailRating === null ? (
        <RatingShortView setDetailRating={setDetailRating} poi={detail} />
      ) : (
        <RatingDetailView
          setDetailRating={setDetailRating}
          rating={detailRating}
        />
      )}
    </>
  );
}
