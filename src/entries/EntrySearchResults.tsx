import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch } from 'react-redux';
import { CultureEntry } from './../types/CultureEntry';
import { getEntryDetails } from './EntryDetailsReducer';
import { useLeaflet } from 'react-leaflet';

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
  result: CultureEntry;
};

export default function EntrySearchResults(props: ResultProps) {
  const classes = useStyles({});
  const { result } = props;
  const dispatch = useDispatch();
  
  const { map } = useLeaflet();
  const handleShowDetails = () => {
    dispatch(getEntryDetails(true, result.id));
    map.flyTo([result.coords.y, result.coords.x], 12);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {result.name}
        </Typography>
        <Typography color="textSecondary">{result.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleShowDetails()}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
