import * as actionTypes from '../actions/types';

const initialState = {
  searchResult: [],
  totalRecords: 0,
  loading: false,
};

const labels = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LABELS_START:
      return { ...state, searchResult: [], loading: true };
    case actionTypes.FETCH_LABELS_SUCCESS:
      return {
        ...state,
        searchResult: action.data,
        totalRecords: action.totalRecords,
        loading: false,
      };
    case actionTypes.FETCH_LABELS_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default labels;
