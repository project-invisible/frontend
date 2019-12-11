import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  profileButton: {
    marginLeft: 'auto'
  },
  title: {
    flexGrow: 1
  }
}));

function Navigationbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6" className={classes.title}>
      IN_VISIBLE
    </Typography>
        <Button color="inherit">Karte</Button>
        <Button color="inherit">Forum</Button>
        <Button color="inherit">Events</Button>
        <Button color="inherit">Code of Conduct</Button>
        <Button color="inherit">FAQ</Button>
        <Button color="inherit">Feedback</Button>
        <Button color="inherit">Admin</Button>
        <IconButton
          className={classes.profileButton}
          color="inherit"
          aria-label="account of current user"
          aria-controls="menu-appbar"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default Navigationbar;