import * as actionTypes from '../actions/types';

const initialState = {
  searchResult: [],
  totalRecords: 0,
  loading: false,
};

const repositories = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REPOSITORIES_START:
      return { ...state, searchResult: [], loading: true };
    case actionTypes.FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        searchResult: action.data,
        totalRecords: action.totalRecords,
        loading: false,
      };
    case actionTypes.FETCH_REPOSITORIES_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default repositories;
