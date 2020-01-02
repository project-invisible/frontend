import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";

export default function DetailView() {

  return (<Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Hochschule fuer Technik und Wirtschaft
        </Typography>
        <Typography color="textSecondary">
          Treskowallee 8
        </Typography>
        <Typography variant="body2" component="p">
          12345 Berlin
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Rate</Button>
      </CardActions>
    </Card>);
}