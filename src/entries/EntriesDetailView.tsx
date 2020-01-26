import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { CultureEntry } from "./../types/CultureEntry";
import Face from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconButton from "@material-ui/core/IconButton";
import { toggleEntryDetailView } from "./EntryDetailsReducer";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaContent: {
      height: "auto",
      width: "40vh"
    },
    iconButton: {
      borderRadius: "15px",
      marginBottom: "5px",
      padding: "8px"
    },
    iconText: {
      marginRight: "5px"
    },
    account: {
      "&:hover": {
        cursor: "pointer"
      }
    }
  })
);

export default function EntriesDetailView() {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState<boolean>(false);
  const detail: CultureEntry = useSelector(
    (state: any) => state.entryDetailsStore.detailEntry
  );
  const history = useHistory();

  return (
    <Card>
      <CardContent>
        <IconButton
          className={classes.iconButton}
          onClick={() => dispatch(toggleEntryDetailView(false))}
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
        {(detail.image && !imageError) && (
          <div>
            <img
              onError={() => setImageError(true)}
              className={classes.mediaContent}
              src={`data:image/jpeg;base64,${detail.image.data}`}
            />
          </div>
        )}
        <Typography variant="h5" component="h2">
          {detail.name}
        </Typography>
        {detail.description && (
          <Typography color="textSecondary">{detail.description}</Typography>
        )}
        <Grid container className={classes.account} onClick={() => {
              history.push({
                pathname: "/user",
                state: {
                  userId: detail.user.id
                }
              });
            }}>
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
