import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, Paper, CardMedia, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textFrame: {
    margin: "18px"
  },
  media: {
    margin: "50px 10px 50px 70px",
    width: "370px",
    height: "470px"
  },
  headline: {
    padding: "8px",
    textDecoration: "bold"
  },
  bodyText: {
    padding: "8px"
  }
}));

function About() {
  const classes = useStyles({});

  return (
    <Grid container>
      <Grid item xs={6}>
        <Card>
          <CardMedia
            className={classes.media}
            image={require("../images/sloganPoster.png")}
          />
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.textFrame}>
          <Typography variant="h4" className={classes.headline}>
            About
          </Typography>
          <Typography variant="body1" className={classes.bodyText}>
            IN_VISIBLE is a project founded ba Kamalanetra AJ C Hung with the
            intention to improve inclusion and visibility of trans*, intersex
            and non-binary (TIN) people at public spaces institutions and
            services. The IN_VISIBLE prototype is developed by students of the
            International Media Informatics at the HTW Berlin in close
            cooperation with René_ Rain Hornstein, Kamalanetra AJ C Hung and
            supervised by Prof. Barne Kleinen. With the help of contextual
            design techniques, requirements were identified, which were
            implemented with aReact frontend, leaflet map, a Spring
            Micro-Service (Java) backend and MongoDB as database.
            <br />
            <br />
            The prototype IN_VISIBLE is an interactive visualisation tool, which
            shows the changing landscape of access, inclusion and exclusion from
            academic institutions for transgender communities. The tool offers
            TIN-people the opportunity to share positive and negative
            experiences from public institutions and to evaluate them in terms
            of their TIN-friendliness. The aim of the project is to increase the
            visibility of discriminatory and unfair treatment of TIN people and
            trace it back to the institutions, but also to create a platform for
            exchanging experiences within the TIN community.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default About;
