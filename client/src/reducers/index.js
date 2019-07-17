import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import groupsReducer from './groupsReducer';
import schedulesReducer from './schedulesReducer';

export default combineReducers({
	usersReducer,
	groupsReducer,
	schedulesReducer
});
