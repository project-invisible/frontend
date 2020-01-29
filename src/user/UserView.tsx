import React, { useEffect } from "react";
import { Container, Typography, Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { User, Role } from "./../types/User";
import { getCurrentUser } from "./UserReducer";
import { useLocation } from "react-router-dom";
import ReportIcon from "@material-ui/icons/Report";
import IconButton from "@material-ui/core/IconButton";
import { UserReport } from "./../types/Reports";
import { postUserReport } from "./../admin/AdminReducer";

function UserView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchedUser: User = useSelector(
    (state: any) => state.userStore.fetchedUser
  );
  const userId = location.state.userId;
  const id: number = useSelector((state: any) => state.registerStore.id);
  const user: User = useSelector((state: any) => state.registerStore.user);
  let currentUser: User = userId && userId !== id ? fetchedUser : user;

  useEffect(() => {
    if (userId && userId !== id) {
      dispatch(getCurrentUser(userId));
    }
  }, []);

  useEffect(() => {
    currentUser = fetchedUser;
  }, [fetchedUser]);

  const handleUserReport = () => {
    const userReport: UserReport = {
      reportingUser: user,
      reportedUser: currentUser,
      id: null,
      reportDate: null,
      solved: false
    };
    dispatch(postUserReport(userReport));
  };

  return (
    <div>
      {currentUser && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Userprofile
            </Typography>
            {currentUser.email && (
              <Typography color="textSecondary">{`Email: ${currentUser.email}`}</Typography>
            )}
            {currentUser.username && (
              <Typography color="textSecondary">{`Username: ${currentUser.username}`}</Typography>
            )}
            {currentUser.contact &&
              currentUser.contact.phone &&
              currentUser.contact.phone !== 0 && (
                <Typography color="textSecondary">
                  {`Phone: ${currentUser.contact.phone}`}
                </Typography>
              )}
            {(id && userId !== id) && (
              <div>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleUserReport()}
                >
                  <ReportIcon />
                  <Typography color="textSecondary" component="p">
                    Report User
                  </Typography>
                </IconButton>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
export default UserView;
