import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CultureEntry } from "./../types/CultureEntry";
import { toggleEntryModal, addCultureEntry } from "./EntryDetailsReducer";
import { ImageUpload } from "./ImageUpload";
import TextField from "@material-ui/core/TextField";
import { getAllEntries } from "../map/SearchReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    modalContent: {
      width: "75%"
    },
    startContainer: {
      justifyContent: "flex-end"
    },
    textFields: {
      margin: "0.5em",
      width: "100%"
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200
      }
    }
  })
);

type ResultProps = {
  culturyEntry: CultureEntry;
  xCoord: number;
  yCoord: number;
};

export default function EntryModal(props: ResultProps) {
  const classes = useStyles({});
  const { culturyEntry, xCoord, yCoord } = props;
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const userId: number = useSelector((state: any) => state.registerStore.id);
  const [fileBinary, setFileBinary] = useState();
  const toggleModal: boolean = useSelector(
    (state: any) => state.entryDetailsStore.toggleEntryModal
  );

  useEffect(() => {
    if (toggleModal) {
    }
  }, [toggleModal]);

  const onSaveEntry = () => {
    dispatch(
      addCultureEntry(name, description, yCoord, xCoord, fileBinary, userId)
    );
    dispatch(toggleEntryModal(false));
    dispatch(getAllEntries());
  };

  return (
    <div className={classes.root}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={toggleModal}
        onClose={() => dispatch(toggleEntryModal(false))}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={toggleModal}>
          <Card className={classes.modalContent}>
            <CardContent>
              <Typography component="h2">Add culture entry</Typography>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    aria-label="empty textarea"
                    placeholder="Enter a name"
                    onChange={event => setName(event.target.value)}
                    value={name}
                    variant="outlined"
                    className={classes.textFields}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    aria-label="empty textarea"
                    placeholder="Enter a description"
                    onChange={event => setDescription(event.target.value)}
                    value={description}
                    multiline
                    rows="4"
                    variant="outlined"
                    className={classes.textFields}
                  />
                </Grid>
                <ImageUpload
                  fileBinary={fileBinary}
                  setFileBinary={setFileBinary}
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onSaveEntry()}>
                Save entry
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
