import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PointOfInterest } from "../types/PointOfInterest";
import { getRatingsForPoi } from "./RatingReducer";
import { Rating } from "./../types/Rating";
import Face from "@material-ui/icons/Face";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions
} from "@material-ui/core";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton  from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowY: "auto"
    },
    rating: {
      marginTop: "0.5em"
    }
  })
);

export interface RatingShortViewProps {
  setDetailRating: (rating: Rating) => void;
  poi: PointOfInterest;
}

export default function RatingShortView(props: RatingShortViewProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { setDetailRating, poi } = props;
  const detail: PointOfInterest = useSelector(
    (state: any) => state.detailsStore.detailPOI
  );
  const ratingsForPoi: Rating[] = useSelector(
    (state: any) => state.ratingStore.ratingsForPoi
  );

  useEffect(() => {
    dispatch(getRatingsForPoi(detail.id));
  }, []);

  useEffect( () => {
    dispatch(getRatingsForPoi(detail.id));
  }, [poi])

  return (
    <div className={classes.root}>
      {ratingsForPoi.map((rating, index) => {
        return (
          <Card key={`ratingPoi-${index}`} className={classes.rating}>
            <CardContent>
              <div>
                <Grid container>
                  <Grid item xs={1}>
                    <Face />
                  </Grid>
                  <Grid item xs={11}>
                    <Typography variant="body2" component="p">
                      {rating.userId}
                    </Typography>
                  </Grid>
                </Grid>
                <div>{rating.generalComment}</div>
              </div>
            </CardContent>
            <CardActions>
              <div>
                <IconButton onClick={() => setDetailRating(rating)}>
                  <Typography variant="body2" component="p">
                       View more 
                  </Typography>
                    <KeyboardArrowRight />
                </IconButton>
              </div>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
