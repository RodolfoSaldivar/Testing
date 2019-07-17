// import axios from 'axios';
import * as types from '../types/schedulesTypes';

//================================================

export const changeInputFields = (action, value) => (dispatch) => {
	dispatch({
		type: action,
		payload: value
	});
};

//================================================

export const changeFormMissing = (value) => (dispatch) => {
	dispatch({
		type: types.FORM_MISSING,
		payload: value
	});
};

//================================================

// export const create = () => (dispatch, getState) => {
// 	const { save_form } = getState().groupsReducer;
// 	const formData = new FormData();

// 	//================================================
// 	//----> validate if there is everything we need
// 	//================================================

// 	formData.append('name', save_form.name);
// 	formData.append('image', save_form.image);

// 	const config = { headers: { 'content-type': 'multipart/form-data' } };
// 	axios
// 		.post('/api/groups', formData, config)
// 		.then((response) => {
// 			console.log('response: ', response);
// 			alert('The file is successfully uploaded');
// 		})
// 		.catch((error) => console.log('Create group: ', error.response));
// };
