import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Result from "./SearchResult";
import { DomEvent } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import DetailView from "./DetailView";
import { closeDetailView } from "./DetailsReducer";
import { searchPOI } from "./SearchReducer";
import TextField from "@material-ui/core/TextField";
import { PointOfInterest } from "../types/PointOfInterest";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
      zIndex: 5000
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    },
    result: {
      overflowY: "scroll",
      width: 400,
      height: "calc(100vh - 20vh)"
    }
  })
);

export default function SearchBar() {
  const classes = useStyles({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useDispatch();

  const showDetails: boolean = useSelector(
    (state: any) => state.detailsStore.showDetails
  );

  const searchResults: Array<PointOfInterest> = useSelector(
    (state: any) => state.searchStore.searchResults
  );

  const refContainer = element => {
    if (element) {
      DomEvent.disableClickPropagation(element).disableScrollPropagation(
        element
      );
    }
  };

  const handleClick = event => {
    event.preventDefault();
    dispatch(searchPOI(searchQuery));
    dispatch(closeDetailView(false));
  };

  const handleOnChange = event => {
    setSearchQuery(event.target.value);
  };

  const search = (
    <Paper ref={refContainer}>
      <form onSubmit={handleClick} className={classes.root}>
        <TextField
          className={classes.input}
          placeholder="Search IN_VISIBLE"
          value={searchQuery}
          inputProps={{ "aria-label": "search invisible" }}
          onChange={event => handleOnChange(event)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </form>
      {searchResults.length > 0 && !showDetails && (
        <div className={classes.result}>
          {searchResults.map((result, i) => {
            return <Result key={i} result={result} />;
          })}
        </div>
      )}
      {showDetails && <DetailView />}
    </Paper>
  );

  return search;
}
