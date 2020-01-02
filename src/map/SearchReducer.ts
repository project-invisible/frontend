

export const SEARCH_POI = 'SEARCH_POI'

const initialState = {
    searchResults: [],
  };

  /**
   * Reducer
   */
  const searchStore = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_POI:
          state.searchResults = action.searchResults;
        return state;
    }
    return state;
  }
  
  /**
 * Actions
 */
export const searchPOI = (query: string) => async (dispatch, getState) => {
    const body: BodyInit = JSON.stringify({
      query
    });
    try {
      const response = await fetch(`localhost:3000/api/search`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body,
      });
      const searchResults = response.body;
      dispatch({
        type: SEARCH_POI,
        searchResults,
      })
    } catch (error) {
        console.log("throwing Error", error);
        throw error;
    }
  };

  /**
   * Store
   */
  export default searchStore;