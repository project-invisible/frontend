import React,  { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Menu, MenuItem } from '@material-ui/core';
import { SearchResult } from './../types/SearchResult';
import Result from './SearchResult.tsx';
import { DomEvent } from 'leaflet'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      zIndex: 5000,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    result: {
      overflowY: 'scroll',
      height: 'calc(100vh - 10vh)',
    },
  }),
);

const dummySearchResults: Array<SearchResult> = [
  {
    name: "First result",
    rating: 4.7,
    street: "Resultstreet",
    postal: 12334,
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466,
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466,
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466,
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466,
  },
  {
    name: "Second result",
    rating: 2.3,
    street: "Another street 21",
    postal: 25466,
  }
]

export default function SearchBar() {
  const classes = useStyles({});
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);
  let container = null;

  const open = Boolean(anchorEl);
  const inputEl = useRef(null);

  const refContainer = (element) => {
    container = element;
    if (element) {
      DomEvent
        .disableClickPropagation(element)
        .disableScrollPropagation(element);
    }
  }

  const handleClick = event => {
    event.preventDefault();
    setSearchResults(dummySearchResults);
  };

  const handleClose = () => {
  };

  const search = (
    <Paper ref={refContainer}>
      <form onSubmit={handleClick} className={classes.root}>
          <IconButton
            className={classes.iconButton}
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleClick}>
              <MenuIcon />
          </IconButton>
          <Menu
              id="simple-menu"
              keepMounted
              open={menuOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
          >
              <MenuItem onClick={handleClick}>Profile</MenuItem>
              <MenuItem onClick={handleClick}>My account</MenuItem>
              <MenuItem onClick={handleClick}>Logout</MenuItem>
          </Menu>
          <InputBase
              className={classes.input}
              placeholder="Search IN_VISIBLE"
              inputProps={{ 'aria-label': 'search invisible' }}
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
    </Paper>);

  return search;
}