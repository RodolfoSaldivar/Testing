import * as types from '../types/groupsTypes';

const INITIAL_STATE = {
	groups: {},
	groups_id: [],
	save_form: {
		name: '',
		img_preview: '',
		image: { name: '' }
	},
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_ALL:
			return {
				...state,
				groups: action.payload.entities.groups,
				groups_id: action.payload.result,
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

		case types.FORM_IMAGE:
			return {
				...state,
				save_form: { ...state.save_form, image: action.payload }
			};

		case types.FORM_IMG_PREVIEW:
			return {
				...state,
				save_form: { ...state.save_form, img_preview: action.payload }
			};

		default:
			return state;
	}
};
