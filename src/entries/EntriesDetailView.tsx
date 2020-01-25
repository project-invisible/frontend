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
import { CultureEntry } from "./../types/CultureEntry";
import Face from "@material-ui/icons/Face";
import { useHistory } from 'react-router-dom';


export default function EntriesDetailView() {
  const detail: CultureEntry = useSelector(
    (state: any) => state.entryDetailsStore.detailEntry
  );
  const history = useHistory();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {detail.name}
        </Typography>
        {detail.description && (
          <Typography color="textSecondary">{detail.description}</Typography>
        )}
        <Grid container onClick={() => {
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
