import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import Result from "./SearchResult";
import { DomEvent } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import DetailView from "./DetailView";
import { closeDetailView } from "./DetailsReducer";
import { searchPOI, searchEntries, resetSearch } from "./SearchReducer";
import TextField from "@material-ui/core/TextField";
import { PointOfInterest } from "../types/PointOfInterest";
import { TablePagination } from "@material-ui/core";
import EntriesDetailView from "./../entries/EntriesDetailView";
import { CultureEntry } from "./../types/CultureEntry";
import EntrySearchResults from "./../entries/EntrySearchResults";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      width: 400,
      zIndex: 5000
    },
    paperRoot: {
      padding: "0.5em"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    result: {
      overflowY: "auto",
      width: 400,
      maxHeight: "calc( 100vh - 20vh)"
    }
  })
);

export default function SearchBar() {
  const classes = useStyles({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [paginationStart, setPaginationStart] = useState<number>(0);
  const [paginationEnd, setPaginationEnd] = useState<number>(4);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const dispatch = useDispatch();

  const poiChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.poiChecked
  );
  const entryChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.entryChecked
  );
  const showDetails: boolean = useSelector(
    (state: any) => state.detailsStore.showDetails
  );
  const showEntryDetails: boolean = useSelector(
    (state: any) => state.entryDetailsStore.showEntryDetails
  );
  const searchResults: Array<PointOfInterest> = useSelector(
    (state: any) => state.searchStore.searchResults
  );
  const searchEntryResults: Array<CultureEntry> = useSelector(
    (state: any) => state.searchStore.searchEntryResults
  );

  const nextPage = () => {
    setPaginationEnd(paginationEnd + rowsPerPage);
    setPaginationStart(paginationStart + rowsPerPage);
  };
  const lastPage = () => {
    setPaginationEnd(paginationEnd - rowsPerPage);
    setPaginationStart(paginationStart - rowsPerPage);
  };
  const resetPage = (end: number) => {
    setPaginationStart(0);
    setPaginationEnd(end - 1);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage > page) {
      nextPage();
    } else {
      lastPage();
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    resetPage(parseInt(event.target.value, 10));
  };

  const refContainer = element => {
    if (element) {
      DomEvent.disableClickPropagation(element).disableScrollPropagation(
        element
      );
    }
  };

  const handleClick = event => {
    event.preventDefault();
    if (poiChecked && entryChecked) {
      setErrorMessage("Please only select one category if you want to search!");
    } else if (searchQuery !== "") {
      if (poiChecked) {
        dispatch(searchPOI(searchQuery));
      }
      if (entryChecked) {
        dispatch(searchEntries(searchQuery));
      }
      dispatch(closeDetailView(false));
    }
  };

  const displayResults = (searchResults: PointOfInterest[]) => {
    return searchResults && searchResults.length > 0 && !showDetails ? (
      <div className={classes.result}>
        {searchResults
          .slice(paginationStart, paginationEnd + 1)
          .map((result, i) => {
            return <Result key={i} result={result} />;
          })}
        <TablePagination
          component="div"
          count={searchResults.length}
          rowsPerPageOptions={[5, 10, 25]}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true
          }}
        />
      </div>
    ) : (
      <div />
    );
  };

  const displayEntryResults = (searchResults: CultureEntry[]) => {
    return searchResults && searchResults.length > 0 && !showEntryDetails ? (
      <div className={classes.result}>
        {searchResults
          .slice(paginationStart, paginationEnd + 1)
          .map((result, i) => {
            return <EntrySearchResults key={i} result={result} />;
          })}
        <TablePagination
          component="div"
          count={searchResults.length}
          rowsPerPageOptions={[5, 10, 25]}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true
          }}
        />
      </div>
    ) : (
      <div />
    );
  };

  const handleOnChange = event => {
    setSearchQuery(event.target.value);
  };

  const resetSearchOnClick = () => {
    dispatch(resetSearch());
    setSearchQuery("");
  };

  const search = (
    <Paper ref={refContainer} className={classes.paperRoot}>
      <form onSubmit={handleClick} className={classes.root}>
        <TextField
          className={classes.input}
          placeholder="Search IN_VISIBLE"
          value={searchQuery}
          inputProps={{ "aria-label": "search invisible" }}
          onChange={event => {
            setErrorMessage("");
            setSearchQuery(event.target.value);
          }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        {(searchResults.length > 0 || searchEntryResults.length > 0) && (
          <IconButton
            onClick={() => resetSearchOnClick()}
            className={classes.iconButton}
            aria-label="search"
          >
            <Close />
          </IconButton>
        )}
      </form>
      {errorMessage !== "" && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
      {poiChecked && displayResults(searchResults)}
      {entryChecked && displayEntryResults(searchEntryResults)}
      {showDetails && <DetailView />}
      {showEntryDetails && <EntriesDetailView />}
    </Paper>
  );

  return search;
}
