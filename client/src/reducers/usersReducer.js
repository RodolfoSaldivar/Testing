import { GET_ALL, LOADING, ERROR } from '../types/usersTypes';

const INITIAL_STATE = {
	users: {},
	users_id: [],
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ALL:
			return {
				...state,
				users: action.payload.entities.users,
				users_id: action.payload.result,
				loading: false,
				error: ''
			};

		case LOADING:
			return { ...state, loading: true };

		case ERROR:
			return { ...state, error: action.payload, loading: false };

		default:
			return state;
	}
};
