import React from "react";
import { Typography, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textFrame: {
    margin: "18px"
  },
  headline: {
    padding: "16px",
    textDecoration: "bold"
  },
  bodyText: {
    padding: "16px"
  }
}));

function Mapathon() {
  const classes = useStyles({});

  return (
    <Paper className={classes.textFrame}>
      <Typography variant="h4" className={classes.headline}>
        Mapathon
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        In order to improve the data coverage of our map and to make us visible
        we will organize Mapathons.
        <br />
        Mapathons are usually events that are opened up to the public or a group
        of people in a place at a time. Up to date maps help us to provide
        information and the gathered information can be used to show the
        importance of the topic to people that beklieve in the opposite.
        <br />
        We are planning on organizing the first mapathon in mid february at the
        HTW Berlin. News to that will follow soon.
      </Typography>
    </Paper>
  );
}
export default Mapathon;
