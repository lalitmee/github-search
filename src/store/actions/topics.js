import axios from 'axios';
import * as actionTypes from './types';

const TOPICS_BASE_URL = 'https://api.github.com/search/topics';

export const requestingTopicsStart = () => {
  return {
    type: actionTypes.FETCH_TOPICS_START,
  };
};

export const setTopicsSearchData = data => {
  console.log('data: topics', data);
  return {
    type: actionTypes.FETCH_TOPICS_SUCCESS,
    data: data.items,
    totalRecords: data.total_count,
  };
};

export const requestingTopicsFailed = () => {
  return {
    type: actionTypes.FETCH_TOPICS_FAILED,
  };
};

export const getTopicsResult = (query, page) => {
  return dispatch => {
    dispatch(requestingTopicsStart());
    axios
      .get(`${TOPICS_BASE_URL}?q=${query}&order=asc&page=${page}&per_page=20`)
      .then(res => {
        dispatch(setTopicsSearchData(res.data));
      })
      .catch(err => {
        dispatch(requestingTopicsFailed(err));
      });
  };
};
