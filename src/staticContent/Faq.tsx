import React from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";

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
function Faq() {
  const classes = useStyles({});
  return (
    <Paper className={classes.textFrame}>
      <Typography variant="h4" className={classes.headline}>
        FAQ
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        This is the section where we gathered the most common questions that
        arouse during the usage of the tool.
      </Typography>
      <Typography variant="h5" className={classes.headline}>
        How can I assess my needs at a higher education institution?
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        Simply click on the marker of the higher education institution you want
        to add you data to in the map. If you cannot find it just search for it
        in the search bar. Then you will click on "learn more". This brings you
        to the detail view of the institution. There is the button "Login to
        assess your needs".
        <br />
        As the button says you need to be logged in in order to enter the data.
        After that ypu will be asked some questions that you can answer and you
        can also leave an overall comment about your experiences at the
        institution for example.
        <br />
        Thanks for collaborating!
      </Typography>
      <Typography variant="h5" className={classes.headline}>
        What should I do when I feel mistreated by other users?
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        We do not tolerate any mistreading on this platform but also not in
        anything that is part of the IN_VISIBLE project such as mistreatment at
        mapathon events.
        <br />
        Please send any concerns to us over the feedback section that is located
        right next to the FAQ section. We are doing our best to keep the
        platform a safe space.
        <br />
        If you are unsure if you should report something the code of conduct
        will probably help with the decision.
      </Typography>
      <Typography variant="h5" className={classes.headline}>
        What is the intention of the layer "gender diverse cultures"?
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        The layer "gender diverse cultures" is there to show gender diverse
        cultures from all over the world to inform about them and to make them
        visible. The content for this layer is completely user generated. So if
        you know any gender diverse cultures feel free to add them to the map.
        You can add the name a picture and a description to every entry.
      </Typography>
    </Paper>
  );
}
export default Faq;
