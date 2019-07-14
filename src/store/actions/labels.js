import axios from 'axios';
import * as actionTypes from './types';

const LABELS_BASE_URL = 'https://api.github.com/search/labels';

export const requestingLabelsStart = () => {
  return {
    type: actionTypes.FETCH_LABELS_START,
  };
};

export const setLabelsSearchData = data => {
  console.log('data: labels', data);
  return {
    type: actionTypes.FETCH_LABELS_SUCCESS,
    data: data.items,
    totalRecords: data.total_count,
  };
};

export const requestingLabelsFailed = () => {
  return {
    type: actionTypes.FETCH_LABELS_FAILED,
  };
};

export const getLabelsResult = (query, page) => {
  return dispatch => {
    dispatch(requestingLabelsStart());
    axios
      .get(`${LABELS_BASE_URL}?q=${query}&order=asc&page=${page}&per_page=20`)
      .then(res => {
        dispatch(setLabelsSearchData(res.data));
      })
      .catch(err => {
        dispatch(requestingLabelsFailed(err));
      });
  };
};
