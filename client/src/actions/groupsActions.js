// import axios from 'axios';
import _ from 'lodash';
// import { normalize } from 'normalizr';
// import * as schema from './schema';
// import { GET_ALL, LOADING, ERROR } from '../types/groupsTypes';
import * as schedulesActions from './schedulesActions';
const { changeFormMissing: scheduleMissing } = schedulesActions;
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

//================================================

export const changeInputFields = (action, value) => (dispatch) => {
	dispatch({
		type: action,
		payload: value
	});
};

//================================================

export const createWithSchedule = () => async (dispatch, getState) => {
	const { groupsReducer: gR, schedulesReducer: sR } = getState();
	// const { save_form: gF } = gR;
	const { save_form: sF } = sR;

	await dispatch(scheduleMissing(false));

	if (!sF.points || !sF.description) {
		return dispatch(scheduleMissing(true));
	}
	if (sF.cicle === 'W' && _.isEmpty(sF.week_days)) {
		return dispatch(scheduleMissing(true));
	}
	if (sF.cicle === 'M' && _.isEmpty(sF.month_days)) {
		return dispatch(scheduleMissing(true));
	}

	const formData = new FormData();
	formData.append('name', gR.save_form.name);
	formData.append('image', gR.save_form.image);

	// const config = { headers: { 'content-type': 'multipart/form-data' } };
	// axios
	// 	.post('/api/groups', formData, config)
	// 	.then((response) => {
	// 		console.log('response: ', response);
	// 		alert('The file is successfully uploaded');
	// 	})
	// 	.catch((error) => console.log('Create group: ', error.response));
};
