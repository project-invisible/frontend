
import searchStore, { TOGGLE_ENTRY_SEARCH_LOADING, TOGGLE_RESET, GET_POIS, GET_ENTRIES, SEARCH_ENTRY, SEARCH_POI } from './../SearchReducer';
import {RESET_SEARCH} from '../SearchReducer';

describe('search reducer', () => {
  
it('should return the initial state', () => {
    expect(searchStore(undefined, {})).toMatchSnapshot();
  });

  it('reset search', () => {
      const expectedState = {
        searchResults: [],
        searchEntryResults: [],
        finishedEntrySearchLoading: false,
        finishedSearchLoading: false,
        resetSearch: true
      };
    expect(searchStore({}, {
      type: RESET_SEARCH,
    })).toEqual(expectedState);
  });

  it('toggle entry search loading', () => {
    const expectedState = {
        finishedEntrySearchLoading: true,
    };
  expect(searchStore({}, {
    type: TOGGLE_ENTRY_SEARCH_LOADING,
    toggleLoading: true
  })).toEqual(expectedState);
});


it('toggle reset', () => {
    const expectedState = {
        resetSearch: true
    };
  expect(searchStore({}, {
    type: TOGGLE_RESET,
    toggleReset: true
  })).toEqual(expectedState);
});

it('get pois', () => {
    const expectedState = {
        allPois:[1,2],
        finishedFirstLoading: 1
    };
  expect(searchStore({finishedFirstLoading: 0}, {
    type: GET_POIS,
    pois: [1,2]
  })).toEqual(expectedState);
});

it('get entries', () => {
    const expectedState = {
        finishedEntryLoading: true,
        allEntries: [1,2]
    };
  expect(searchStore({}, {
    type: GET_ENTRIES,
    entries: [1,2]
  })).toEqual(expectedState);
});

it('search entries', () => {
    const expectedState = {
        searchEntryResults: [1,2],
        finishedEntrySearchLoading: true
    };
  expect(searchStore({}, {
    type: SEARCH_ENTRY,
    searchEntriesResults: [1,2]
  })).toEqual(expectedState);
});

it('search poi', () => {
    const expectedState = {
        searchResults: [1,2],
        finishedSearchLoading: true
    };
  expect(searchStore({}, {
    type: SEARCH_POI,
    searchResults: [1,2]
  })).toEqual(expectedState);
});


});

