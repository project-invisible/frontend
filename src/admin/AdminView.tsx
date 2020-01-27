import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  List,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Feedback, UserReport, RatingReport } from "./../types/Reports";
import { useHistory } from "react-router-dom";
import { User, Role } from "./../types/User";
import {
  getReportedUsers,
  getFeedback,
  getReportedRatings
} from "./AdminReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    lists: {
      margin: "1em"
    }
  })
);

function AdminView() {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const history = useHistory();

  const reportedRatings: Array<RatingReport> = useSelector(
    (state: any) => state.adminStore.reportedRatings
  );
  const reportedUsers: Array<UserReport> = useSelector(
    (state: any) => state.adminStore.reportedUsers
  );
  const feedback: Array<Feedback> = useSelector(
    (state: any) => state.adminStore.feedback
  );
  const token: string = useSelector((state: any) => state.registerStore.token);
  const user: User = useSelector((state: any) => state.registerStore.user);

  const checkForAdmin = () => {
    if (!token || token === "") {
      return false;
    } else if (user.role === Role.ADMIN || user.role === Role.MODERATOR) {
      return true;
    } else return false;
  };

  useEffect(() => {
    dispatch(getReportedRatings());
    dispatch(getReportedUsers());
    dispatch(getFeedback());
  }, []);

  return (
    <div className={classes.root}>
      {checkForAdmin() ? (
        <div className={classes.lists}>
          {reportedUsers && reportedUsers.length > 0 && (
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Reported users:</Typography>
              <div>
                <List dense>
                  {reportedUsers &&
                    reportedUsers.map(report => {
                      return (
                        <div>
                          <ListItem>
                            <ListItemText primary="Single-line item">
                              <Typography variant="body2">
                                {report.reportedUser}
                              </Typography>
                            </ListItemText>
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </div>
                      );
                    })}
                </List>
              </div>
            </Grid>
          )}
          {reportedRatings && reportedRatings.length > 0 && (
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Reported ratings:</Typography>
              <div>
                <List dense>
                  {reportedRatings &&
                    reportedRatings.map(rating => {
                      return (
                        <div>
                          <ListItem>
                            <ListItemText primary="Single-line item">
                              <Typography variant="body2">
                                {rating.rating.generalComment}
                              </Typography>
                            </ListItemText>
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </div>
                      );
                    })}
                </List>
              </div>
            </Grid>
          )}
          {feedback && feedback.length > 0 && (
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Feedback:</Typography>
              <div>
                <List dense>
                  {feedback &&
                    feedback.map((feedbackItem, index) => {
                      return (
                        <div>
                          <ListItem key={`feedback-${index}`}>
                            <ListItemText
                              primary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {feedbackItem.message}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </div>
                      );
                    })}
                </List>
              </div>
            </Grid>
          )}
        </div>
      ) : (
        <div>
          You must be logged in as Admin or Moderator to view this page!
        </div>
      )}
    </div>
  );
}
export default AdminView;
