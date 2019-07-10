import axios from 'axios';
import { GET_ALL, LOADING, ERROR } from '../types/usersTypes';

export const getAll = () => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		const res = await axios.get('/api/users');
		dispatch({
			type: GET_ALL,
			payload: res.data.data
		});
	} catch (err) {
		console.log('Users getAll: ', err.message);
		dispatch({
			type: ERROR,
			payload: 'Users info not available.'
		});
	}
};
