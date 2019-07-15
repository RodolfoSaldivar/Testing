import axios from 'axios';
// import { normalize } from 'normalizr';
// import * as schema from './schema';
// import { GET_ALL, LOADING, ERROR } from '../types/groupsTypes';

// export const getAll = () => async (dispatch) => {
// 	dispatch({
// 		type: LOADING
// 	});

// 	try {
// 		const res = await axios.get('/api/groups');
// 		dispatch({
// 			type: GET_ALL,
// 			payload: normalize(res.data, schema.userArray)
// 		});
// 	} catch (err) {
// 		console.log('Users getAll: ', err.message);
// 		dispatch({
// 			type: ERROR,
// 			payload: 'Users info not available.'
// 		});
// 	}
// };

export const changeInputFields = (action, value) => (dispatch) => {
	dispatch({
		type: action,
		payload: value
	});
};

export const create = () => (dispatch, getState) => {
	const { save_form } = getState().groupsReducer;
	const formData = new FormData();

	formData.append('name', save_form.name);
	formData.append('image', save_form.image);

	const config = { headers: { 'content-type': 'multipart/form-data' } };
	axios
		.post('/api/groups', formData, config)
		.then((response) => {
			console.log('response: ', response);
			alert('The file is successfully uploaded');
		})
		.catch((error) => console.log('Create group: ', error.response));
};
