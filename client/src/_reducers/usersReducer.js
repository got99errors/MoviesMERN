import { userConstants } from "../_constants/users.actions";

const initialState = { users: [] , editedUser: null};

export function usersReducer(state = initialState, action) {
	switch (action.type) {
		case userConstants.USERS_REQUEST:
			return {
				fetchingUsers: true,
			};
		case userConstants.USERS_SUCCESS:
			return {
				fetchingUsers: false,
				users: action.users,
			};
		case userConstants.USERS_FAILURE:
			return {
				fetchingUsers: false,
			};
		case userConstants.ADD_USER_REQUEST:
			return {
				...state,
				fetchingUsers: true,
			};
		case userConstants.ADD_USER_SUCCESS:
			return {
				...state,
				fetchingUsers: false,
				users: action.users,
			};
		case userConstants.ADD_USER_FAILURE:
			return {
				...state,
				fetchingUsers: false,
			};
		case userConstants.DELETE_USER_REQUEST:
			return {
				...state,
				id: action.id,
				fetchingUsers: true,
			};
		case userConstants.DELETE_USER_SUCCESS:
			return {
				...state,
				fetchingUsers: false,
				users: action.users,
			};
		case userConstants.DELETE_USER_FAILURE:
			return {
				...state,
				fetchingUsers: false,
			};
		case userConstants.UPDATE_USER_REQUEST:
			return {
				...state,
				fetchingUsers: true,
			};
		case userConstants.UPDATE_USER_SUCCESS:
			return {
				...state,
				fetchingUsers: false,
				users: action.users,
			};
		case userConstants.UPDATE_USER_FAILURE:
			return {
				...state,
				fetchingUsers: false,
			};
		case userConstants.EDIT_USER:
			return {
				...state,
				editedUser: action.user
			}
		case userConstants.STOP_EDIT_USER:
			return {
				...state
			};
		default:
			return state;
	}
}

export default usersReducer;
