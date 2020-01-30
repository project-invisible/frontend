import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Link
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { createBrowserHistory } from "history";
import { Role } from "../types/User";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  profileButton: {
    marginLeft: "auto"
  },
  title: {
    flexGrow: 1
  },
  tagline: {
    flexGrow: 1,
    marginLeft: "32px",
    fontStyle: "oblique"
  },
  buttonColor: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: 500,
    lineHeight: 1.75
  },
  header: {
    background: "linear-gradient(-90deg, #FF66c4, #509CFE)"
  }
}));

function Navigationbar() {
  const classes = useStyles({});
  const history = useHistory();
  const role: Role = useSelector((state: any) => state.registerStore.userGroup);
  const email: string = useSelector((state: any) => state.registerStore.email);
  const id: number = useSelector((state: any) => state.registerStore.id);

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          <Button
            color="primary"
            onClick={() => history.push("/about")}
            className={classes.buttonColor}
          >
            IN_VISIBLE
          </Button>
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
        <Button color="inherit" onClick={() => history.push("/feedback")}>
          Feedback
        </Button>
        {(role === Role.ADMIN || role === Role.MODERATOR) && (
          <Button color="inherit" onClick={() => history.push("/admin")}>
            Admin
          </Button>
        )}
        {id && (
          <IconButton
            className={classes.profileButton}
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            onClick={() => {
              history.push({
                pathname: "/user",
                state: {
                  userId: id
                }
              });
            }}
          >
            <AccountCircle />
          </IconButton>
        )}
        {email && email !== "" ? (
          <Typography variant="body2">{email}</Typography>
        ) : (
          <Button color="inherit" onClick={() => history.push("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
      <Typography variant="subtitle1" className={classes.tagline}>
        Mapping tool for trans*-, intersex and non-binary people
        <Link variant="subtitle1" onClick={() => history.push("/about")}>
        &nbsp; Learn more
        </Link>
      </Typography>
    </AppBar>
  );
}
export default Navigationbar;
