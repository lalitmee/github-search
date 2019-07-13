import axios from 'axios';
import * as actionTypes from './types';

const COMMITS_BASE_URL = 'https://api.github.com/search/commits';

export const requestingCommitsStart = () => {
  return {
    type: actionTypes.FETCH_COMMITS_START,
  };
};

export const setCommitsSearchData = data => {
  console.log('data: commits', data);
  return {
    type: actionTypes.FETCH_COMMITS_SUCCESS,
    data: data.items,
    totalRecords: data.total_count,
  };
};

export const requestingCommitsFailed = () => {
  return {
    type: actionTypes.FETCH_COMMITS_FAILED,
  };
};

export const getCommitsResult = (query, page) => {
  return dispatch => {
    dispatch(requestingCommitsStart());
    axios
      .get(`${COMMITS_BASE_URL}?q=${query}&order=asc&page=${page}&per_page=20`)
      .then(res => {
        dispatch(setCommitsSearchData(res.data));
      })
      .catch(err => {
        dispatch(requestingCommitsFailed(err));
      });
  };
};
