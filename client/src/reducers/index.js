import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import groupsReducer from './groupsReducer';

export default combineReducers({
	usersReducer,
	groupsReducer
});
