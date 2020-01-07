import React,  { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Menu, MenuItem } from '@material-ui/core';
import { SearchResult } from './../types/SearchResult';
import Result from './SearchResult';
import { DomEvent } from 'leaflet'
import { useDispatch, useSelector } from 'react-redux';
import DetailView from "./DetailView";
import { closeDetailView } from "./DetailsReducer";
import { searchPOI } from './SearchReducer';
import TextField from '@material-ui/core/TextField';

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

// const dummySearchResults: Array<SearchResult> = [
//   {
//     name: "First result",
//     rating: 4.7,
//     street: "Resultstreet",
//     postal: 12334,
//   },
//   {
//     name: "Second result",
//     rating: 2.3,
//     street: "Another street 21",
//     postal: 25466,
//   },
//   {
//     name: "Second result",
//     rating: 2.3,
//     street: "Another street 21",
//     postal: 25466,
//   },
//   {
//     name: "Second result",
//     rating: 2.3,
//     street: "Another street 21",
//     postal: 25466,
//   },
//   {
//     name: "Second result",
//     rating: 2.3,
//     street: "Another street 21",
//     postal: 25466,
//   },
//   {
//     name: "Second result",
//     rating: 2.3,
//     street: "Another street 21",
//     postal: 25466,
//   }
// ]

export default function SearchBar() {
  const classes = useStyles({});
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState(null);
  let container = null;

  const open = Boolean(anchorEl);
  const inputEl = useRef(null);
  const dispatch = useDispatch();

  const showDetails: boolean = useSelector(
    (state: any) => state.detailsStore.showDetails
  );
  
  const searchResults: Array<SearchResult> = useSelector((state: any) => state.searchStore.searchResults);

  const refContainer = (element) => {
    container = element;
    if (element) {
      DomEvent.disableClickPropagation(element).disableScrollPropagation(
        element
      );
    }
  };

  const handleClick = event => {
    event.preventDefault();
    dispatch(searchPOI(searchQuery));
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
                searchResults.map( result => {
                  return (<Result result={result} />)
                })
              }
            </div>
          )
        }
        {showDetails && <DetailView />}
    </Paper>);

  return search;
}
