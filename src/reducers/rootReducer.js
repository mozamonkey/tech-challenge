import { combineReducers } from 'redux';

import {userReducer} from './userReducer';

// this will be "state" in the mapStateToProps methods
export default combineReducers({
  user: userReducer
})