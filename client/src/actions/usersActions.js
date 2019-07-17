import axios from 'axios';
import { normalize } from 'normalizr';
import * as schema from './schema';
import { GET_ALL, LOADING, ERROR } from '../types/usersTypes';

//================================================

export const getAll = () => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		const res = await axios.get('/api/users');
		dispatch({
			type: GET_ALL,
			payload: normalize(res.data, schema.userArray)
		});
	} catch (err) {
		console.log('Users getAll: ', err.message);
		dispatch({
			type: ERROR,
			payload: 'Users info not available.'
		});
	}
};

//================================================

export const changeInputFields = (action, value) => (dispatch) => {
	dispatch({
		type: action,
		payload: value
	});
};
