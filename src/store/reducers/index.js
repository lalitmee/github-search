import { combineReducers } from 'redux';
import codes from './codes';
import commits from './commits';
import issues from './issues';
import labels from './labels';
import repositories from './repositories';
import topics from './topics';
import users from './users';

const reducer = combineReducers({
  repositories,
  codes,
  commits,
  issues,
  labels,
  users,
  topics,
});

export default reducer;
