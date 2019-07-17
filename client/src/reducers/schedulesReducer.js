import * as types from '../types/schedulesTypes';

const INITIAL_STATE = {
	schedules: {},
	schedules_id: [],
	save_form: {
		cicle: 'D',
		points: 1,
		group_id: '',
		week_days: [],
		missing: false,
		month_days: [],
		description: ''
	},
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_ALL:
			return {
				...state,
				schedules: action.payload.entities.schedules,
				schedules_id: action.payload.result,
				loading: false,
				error: ''
			};

		case types.LOADING:
			return { ...state, loading: true };

		case types.ERROR:
			return { ...state, error: action.payload, loading: false };

		case types.FORM_CICLE:
			return {
				...state,
				save_form: { ...state.save_form, cicle: action.payload }
			};

		case types.FORM_POINTS:
			return {
				...state,
				save_form: { ...state.save_form, points: action.payload }
			};

		case types.FORM_MISSING:
			return {
				...state,
				save_form: { ...state.save_form, missing: action.payload }
			};

		case types.FORM_GROUP_ID:
			return {
				...state,
				save_form: { ...state.save_form, group_id: action.payload }
			};

		case types.FORM_WEEK_DAYS:
			return {
				...state,
				save_form: { ...state.save_form, week_days: action.payload }
			};

		case types.FORM_MONTH_DAYS:
			return {
				...state,
				save_form: { ...state.save_form, month_days: action.payload }
			};

		case types.FORM_DESCRIPTION:
			return {
				...state,
				save_form: { ...state.save_form, description: action.payload }
			};

		default:
			return state;
	}
};
