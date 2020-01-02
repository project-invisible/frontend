import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { SearchResult } from "./../types/SearchResult";
import Result from "./SearchResult";
import { DomEvent } from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import DetailView from "./DetailView";
import { closeDetailView } from "./DetailsReducer";

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
      height: "calc(100vh - 20vh)"
    }
  })
);

const dummySearchResults: Array<SearchResult> = [
  {
    name: "First result",
    rating: 4.7,
    street: "Resultstreet",
    postal: 12334
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466
  }
];

export default function SearchBar() {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);
  const showDetails: boolean = useSelector(
    (state: any) => state.detailsStore.showDetails
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
    if (searchResults.length === 0 ) {
      setSearchResults(dummySearchResults);
    } else {
      setSearchResults([]);
    }
  };

  const search = (
    <Paper ref={refContainer}>
      <form onSubmit={handleClick} className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search IN_VISIBLE"
          inputProps={{ "aria-label": "search invisible" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={() => dispatch(closeDetailView(true))}
        >
          <SearchIcon />
        </IconButton>
      </form>
      {(searchResults.length > 0 && !showDetails) && (
        <div className={classes.result}>
          {searchResults.map(result => {
            return <Result result={result} />;
          })}
        </div>
      )}
      {showDetails && <DetailView />}
    </Paper>
  );

  return search;
}
