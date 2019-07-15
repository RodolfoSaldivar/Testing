import * as types from '../types/usersTypes';

const INITIAL_STATE = {
	users: {},
	users_id: [],
	save_form: {
		name: '',
		mail: '',
		image: '',
		lastname: '',
		password: '',
		groups: []
	},
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_ALL:
			return {
				...state,
				users: action.payload.entities.users,
				users_id: action.payload.result,
				loading: false,
				error: ''
			};

		case types.LOADING:
			return { ...state, loading: true };

		case types.ERROR:
			return { ...state, error: action.payload, loading: false };

		case types.FORM_NAME:
			return {
				...state,
				save_form: { ...state.save_form, name: action.payload }
			};

		case types.FORM_LASTNAME:
			return {
				...state,
				save_form: { ...state.save_form, lastname: action.payload }
			};

		case types.FORM_MAIL:
			return {
				...state,
				save_form: { ...state.save_form, mail: action.payload }
			};

		case types.FORM_PASSWORD:
			return {
				...state,
				save_form: { ...state.save_form, password: action.payload }
			};

		case types.FORM_GROUPS:
			return {
				...state,
				save_form: { ...state.save_form, groups: action.payload }
			};

		case types.FORM_IMAGE:
			return {
				...state,
				save_form: { ...state.save_form, image: action.payload }
			};

		default:
			return state;
	}
};
