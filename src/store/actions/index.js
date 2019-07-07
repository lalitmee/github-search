import axios from 'axios';
import * as actionTypes from './types';

const BASE_URL = 'https://api.github.com/search/repositories';

export const setSearchDataStart = () => {
  return {
    type: actionTypes.FETCH_DATA_START,
  };
};

export const setSearchDataSuccess = data => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    data: data.items,
  };
};

export const getSearchDataFailed = () => {
  return {
    type: actionTypes.FETCH_DATA_FAILED,
  };
};

export const getResult = query => {
  return dispatch => {
    dispatch(setSearchDataStart());
    axios
      .get(`${BASE_URL}?q=${query}&order=asc`)
      .then(res => {
        dispatch(setSearchDataSuccess(res.data));
      })
      .catch(err => {
        dispatch(getSearchDataFailed(err));
      });
  };
};
