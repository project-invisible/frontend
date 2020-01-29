import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  CardActions
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { PointOfInterest } from "../types/PointOfInterest";
import RatingModal from "../rating/RatingModal";
import RatingShortView from "./../rating/RatingShortView";
import { Rating } from "./../types/Rating";
import RatingDetailView from "../rating/RatingDetailView";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { closeDetailView } from "./DetailsReducer";
import { User } from "./../types/User";
import { useHistory } from "react-router-dom";
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400
    },
    iconButton: {
      borderRadius: "15px",
      marginBottom: "5px",
      padding: "8px"
    },
    iconText: {
      marginRight: "5px"
    }
  })
);

export default function DetailView() {
  const [detailRating, setDetailRating] = useState<Rating>(null);
  const classes = useStyles({});
  const dispatch = useDispatch();
  const history = useHistory();
  const user: User = useSelector((state: any) => state.registerStore.user);
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
          <IconButton
            className={classes.iconButton}
            onClick={() => dispatch(closeDetailView(false))}
          >
            <KeyboardArrowLeft />
            <Typography
              className={classes.iconText}
              variant="body2"
              component="p"
            >
              Go back
            </Typography>
          </IconButton>
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
        {user ? (
          <RatingModal ratedPoi={detail} />
        ) : (
          <CardActions>
            <IconButton
              className={classes.iconButton}
              onClick={() => history.push("/login")}
            >
              <Typography
                className={classes.iconText}
                variant="body2"
                component="p"
              >
                Login to assess your needs
              </Typography>
              <KeyboardArrowRight />
            </IconButton>
          </CardActions>
        )}
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
