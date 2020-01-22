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
import { createBrowserHistory } from "history";
import { Role } from "../types/User";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  profileButton: {
    marginLeft: "auto"
  },
  title: {
    flexGrow: 1
  }
}));

const history = createBrowserHistory({ forceRefresh: true });

function Navigationbar() {
  const classes = useStyles({});
  const role: Role = useSelector((state: any) => state.registerStore.userGroup);
  const email: string = useSelector((state: any) => state.registerStore.email);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          IN_VISIBLE
        </Typography>
        <Button color="inherit" onClick={() => history.push("/")}>
          Map
        </Button>
        <Button color="inherit">Forum</Button>
        <Button color="inherit" onClick={() => history.push("/events")}>
          Events
        </Button>
        <Button color="inherit" onClick={() => history.push("/codeofconduct")}>
          Code of Conduct
        </Button>
        <Button color="inherit" onClick={() => history.push("/faq")}>
          FAQ
        </Button>
        <Button color="inherit">Feedback</Button>
        {(role === Role.ADMIN || role === Role.MODERATOR) && (
          <Button color="inherit">Admin</Button>
        )}
        <IconButton
          className={classes.profileButton}
          color="inherit"
          aria-label="account of current user"
          aria-controls="menu-appbar"
        >
          <AccountCircle />
          <Typography variant="body2">{email}</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default Navigationbar;
