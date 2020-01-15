import React,  { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Result from './SearchResult';
import { DomEvent } from 'leaflet'
import { useDispatch, useSelector } from 'react-redux';
import DetailView from "./DetailView";
import { closeDetailView } from "./DetailsReducer";
import { searchPOI } from './SearchReducer';
import TextField from '@material-ui/core/TextField';
import { PointOfInterest } from '../types/PointOfInterest';
import { TablePagination } from '@material-ui/core';

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
      overflowY: 'scroll',
      width: 400,
      height: 'calc(100vh - 20vh)',
    },
  }),
);

export default function SearchBar() {
  const classes = useStyles({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [paginationStart, setPaginationStart] = useState<number>(0);
  const [paginationEnd, setPaginationEnd] = useState<number>(4);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);


  const nextPage = () => {
    setPaginationEnd( paginationEnd + rowsPerPage );
    setPaginationStart( paginationStart + rowsPerPage );
  }
  const lastPage = () => {
    setPaginationEnd( paginationEnd - rowsPerPage );
    setPaginationStart( paginationStart - rowsPerPage );
  }
  const resetPage = (end: number) => {
    setPaginationStart( 0 );
    setPaginationEnd( end - 1 );
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    if ( newPage > page) {
      nextPage();
    } else {
      lastPage();
    }
    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    resetPage(parseInt(event.target.value, 10));
  };

  const dispatch = useDispatch();

  const showDetails: boolean = useSelector(
    (state: any) => state.detailsStore.showDetails
  );
  
  const searchResults: Array<PointOfInterest> = useSelector((state: any) => state.searchStore.searchResults);

  const refContainer = (element) => {
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

  const search = (
    <Paper ref={refContainer}>
      <form onSubmit={handleClick} className={classes.root}>
          <TextField
              className={classes.input}
              placeholder="Search IN_VISIBLE"
              value={searchQuery}
              inputProps={{ 'aria-label': 'search invisible' }}
              onChange={ event => setSearchQuery(event.target.value)}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
          </IconButton>
        </form>
        {
          searchResults.length > 0 && (
            <div className={classes.result}>
              {
                searchResults.slice(paginationStart, paginationEnd).map( (result, i) => {
                    return (<Result key={i} result={result} />)
                })
              }
              <TablePagination
                component="div"
                count={searchResults.length}
                rowsPerPageOptions={[5, 10, 25]}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
              />
            </div>
          )
        }
        {showDetails && <DetailView />}
    </Paper>);

  return search;
}
