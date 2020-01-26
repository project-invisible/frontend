import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { User, Role } from "./../types/User";
import { getCurrentUser, sendFeedback } from "./UserReducer";
import { useHistory } from "react-router-dom";
import { Feedback } from "./../types/Reports";
import { makeStyles } from "@material-ui/core/styles";
import { getUser } from "../register/registerStore";

const useStyles = makeStyles({
  feedbackField: {
    width: "80%"
  }
});

function FeedbackView() {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [feedback, setFeedback] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const id: number = useSelector((state: any) => state.registerStore.id);
  const user: User = useSelector((state: any) => state.registerStore.user);

  const submitFeedback = event => {
    event.preventDefault();
    const postFeedback: Feedback = {
      user,
      message: feedback,
      solved: false,
      editor: null,
      id: null
    };
    dispatch(sendFeedback(postFeedback));
    setSuccessMessage("Feedback sent!");
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Leave Feedback
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={event => submitFeedback(event)}
          >
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  className={classes.feedbackField}
                  required
                  id="standard-required"
                  label="Please enter your feedback here"
                  margin="normal"
                  value={feedback}
                  multiline
                  variant="outlined"
                  rows="4"
                  onChange={event => {
                    setFeedback(event.target.value);
                    setSuccessMessage("");
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                {user ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                  >
                    Submit Feedback
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    onClick={() => history.push("/login")}
                  >
                    Login to leave feedback
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
          <Grid item xs={12}>
            <Typography variant="body2" color="secondary">
              {successMessage}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
export default FeedbackView;
