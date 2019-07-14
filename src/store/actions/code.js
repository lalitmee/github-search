import axios from 'axios';
import * as actionTypes from './types';

const CODE_BASE_URL = 'https://api.github.com/search/code';

export const requestingCodeStart = () => {
  return {
    type: actionTypes.FETCH_CODES_START,
  };
};

export const setCodesSearchDataSuccess = data => {
  console.log('data: codes', data);
  return {
    type: actionTypes.FETCH_CODES_SUCCESS,
    data: data.items,
    totalRecords: data.total_count,
  };
};

export const requestingCodesFailed = () => {
  return {
    type: actionTypes.FETCH_CODES_FAILED,
  };
};

export const getCodesResult = (query, page) => {
  return dispatch => {
    dispatch(requestingCodeStart());
    axios
      .get(`${CODE_BASE_URL}?q=${query}&order=asc&page=${page}&per_page=20`)
      .then(res => {
        dispatch(setCodesSearchDataSuccess(res.data));
      })
      .catch(err => {
        dispatch(requestingCodesFailed(err));
      });
  };
};
