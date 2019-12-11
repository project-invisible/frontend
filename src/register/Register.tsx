import React,  { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
// @ts-ignore
import { postRegistration } from './registerStore.tsx';
import { Grid, Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '10px',
    padding: '5px',
  },
  container: {
      margin: '5px',
  },
  textField: {
      margin: '5px',
      width: '90%',
    },
    formContainer: {
        margin: '0 auto',
        width:' 90%',
    },
    submitButton: {
        width: '30%',
    },
    usernameContainer: {
        display: 'flex',
        alignItems: 'center',
    }
});

function Register() {
    const [username, setUsername] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [anonymousChecked, setAnonymousChecked] = useState<boolean>(false);
    const [email, setEmail] = useState<String>('');
    const classes = useStyles({});
    const dispatch = useDispatch();

    const submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(postRegistration(username, email, password));
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
                Register for IN_VISIBLE
            </Typography>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={event => submitRegister(event)}>
                <Grid 
                    container
                    spacing={3}
                    className={classes.formContainer}
                >
                    <Grid item xs={12} className={classes.usernameContainer}>
                        <TextField
                            id="standard-required"
                            label="Username - optional"
                            className={classes.textField}
                            margin="normal"
                            value={username}
                            onChange={ event => setUsername(event.target.value)}
                        />
                          <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={anonymousChecked}
                                    onChange={event => setAnonymousChecked(event.target.checked)}
                                    value="Anonymous"
                                    />
                                }
                                label="Anonymous"
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="standard-required"
                            label="e-Mail"
                            className={classes.textField}
                            margin="normal"
                            value={email}
                            onChange={ event => setEmail(event.target.value)}
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
                            onChange={ event => setPassword(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.submitButton}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default Register;