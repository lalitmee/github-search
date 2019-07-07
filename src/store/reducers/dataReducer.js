import * as actionTypes from '../actions/types';

const initialState = {
  searchResult: [],
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START:
      return { ...state, searchResult: [], loading: true };
    case actionTypes.FETCH_DATA_SUCCESS:
      return { ...state, searchResult: action.data, loading: false };
    case actionTypes.FETCH_DATA_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default dataReducer;
