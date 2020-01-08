import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { PointOfInterest } from '../types/PointOfInterest';

export default function DetailView() {
 
  const detail: PointOfInterest = useSelector((state:any) => state.detailsStore.detailPOI);

  return (<Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {detail.name}
        </Typography>
        {detail.street && <Typography color="textSecondary">
          {detail.street}
        </Typography>}
        <Typography variant="body2" component="p">
          {`${detail.postal} ${detail.city}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Rate</Button>
      </CardActions>
    </Card>);
}