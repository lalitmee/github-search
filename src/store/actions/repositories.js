import axios from 'axios';
import * as actionTypes from './types';

const REPOSITORIES_BASE_URL = 'https://api.github.com/search/repositories';

export const requestingRepositoriesStart = () => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_START,
  };
};

export const setRepositoriesSearchDataSuccess = data => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_SUCCESS,
    data: data.items,
    totalRecords: data.total_count,
  };
};

export const requestingRepositoriesFailed = () => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_FAILED,
  };
};

export const getRepositoriesResult = (query, page) => {
  return dispatch => {
    dispatch(requestingRepositoriesStart());
    axios
      .get(
        `${REPOSITORIES_BASE_URL}?q=${query}&order=asc&page=${page}&per_page=20`,
      )
      .then(res => {
        dispatch(setRepositoriesSearchDataSuccess(res.data));
      })
      .catch(err => {
        dispatch(requestingRepositoriesFailed(err));
      });
  };
};
