import * as actionTypes from '../actions/types';

const initialState = {
  searchResult: [],
  totalRecords: 0,
  loading: false,
};

const commits = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMITS_START:
      return { ...state, searchResult: [], loading: true };
    case actionTypes.FETCH_COMMITS_SUCCESS:
      return {
        ...state,
        searchResult: action.data,
        totalRecords: action.totalRecords,
        loading: false,
      };
    case actionTypes.FETCH_COMMITS_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default commits;
