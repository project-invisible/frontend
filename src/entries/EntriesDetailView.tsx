import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import RatingModal from "../rating/RatingModal";
import { CultureEntry } from "./../types/CultureEntry";
import Face from "@material-ui/icons/Face";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaContent: {
      height: "auto",
      width: "40vh"
    }
  })
);

export default function EntriesDetailView() {
  const classes = useStyles({});
  const detail: CultureEntry = useSelector(
    (state: any) => state.entryDetailsStore.detailEntry
  );

  return (
    <Card>
      <CardContent>
      {detail.image && (
          <img className={classes.mediaContent} src={`data:image/jpeg;base64,${detail.image.data}`} />
        ) }
        <Typography variant="h5" component="h2">
          {detail.name}
        </Typography>
        {detail.description && (
          <Typography color="textSecondary">{detail.description}</Typography>
        )}
        <Grid container>
          <Grid item xs={1}>
            <Face />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2" component="p">
              {detail.user.email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
