import axios from 'axios';
import * as actionTypes from './types';

const USERS_BASE_URL = 'https://api.github.com/search/users';

export const requestingUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  };
};

export const setUsersSearchData = data => {
  console.log('data: users', data);
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    data: data.items,
    totalRecords: data.total_count,
  };
};

export const requestingUsersFailed = () => {
  return {
    type: actionTypes.FETCH_USERS_FAILED,
  };
};

export const getUsersResult = (query, page) => {
  return dispatch => {
    dispatch(requestingUsersStart());
    axios
      .get(`${USERS_BASE_URL}?q=${query}&order=asc&page=${page}&per_page=20`)
      .then(res => {
        dispatch(setUsersSearchData(res.data));
      })
      .catch(err => {
        dispatch(requestingUsersFailed(err));
      });
  };
};
