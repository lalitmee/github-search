import axios from 'axios';
import * as actionTypes from './types';

const ISSUES_BASE_URL = 'https://api.github.com/search/issues';

export const requestingIssuesStart = () => {
  return {
    type: actionTypes.FETCH_ISSUES_START,
  };
};

export const setIssuesSearchData = data => {
  console.log('data: issues', data);
  return {
    type: actionTypes.FETCH_ISSUES_SUCCESS,
    data: data.items,
    totalRecords: data.total_count,
  };
};

export const requestingIssuesFailed = () => {
  return {
    type: actionTypes.FETCH_ISSUES_FAILED,
  };
};

export const getIssuesResult = (query, page) => {
  return dispatch => {
    dispatch(requestingIssuesStart());
    axios
      .get(`${ISSUES_BASE_URL}?q=${query}&order=asc&page=${page}&per_page=20`)
      .then(res => {
        dispatch(setIssuesSearchData(res.data));
      })
      .catch(err => {
        dispatch(requestingIssuesFailed(err));
      });
  };
};
