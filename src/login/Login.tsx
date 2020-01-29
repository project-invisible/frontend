import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { loginUser, getUser } from './../register/registerStore';

const useStyles = makeStyles({
  root: {
    margin: "10px",
    padding: "5px"
  },
  container: {
    margin: "5px"
  },
  textField: {
    margin: "5px",
    width: "90%"
  },
  formContainer: {
    margin: "0 auto",
    width: " 90%"
  },
  submitButton: {
    width: "30%"
  },
  usernameContainer: {
    display: "flex",
    alignItems: "center"
  }
});

function Register() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const classes = useStyles({});
  const dispatch = useDispatch();
  let history = useHistory();

  const token: string = useSelector((state: any) => state.registerStore.token);
  const id: number = useSelector((state: any) => state.registerStore.id);
  const error: string = useSelector((state: any) => state.registerStore.error);

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (token !== "" && token !== null && id) {
      history.push("");
      dispatch(getUser(id));
    }
  });

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Log in to IN_VISIBLE
      </Typography>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={event => submitLogin(event)}
      >
        <Grid container spacing={3} className={classes.formContainer}>
          <Grid item xs={12}>
            <TextField
              required
              id="standard-required"
              label="Please enter e-Mail or Username"
              className={classes.textField}
              margin="normal"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              className={classes.textField}
              margin="normal"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitButton}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default Register;
