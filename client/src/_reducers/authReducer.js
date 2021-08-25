import { userConstants } from "../_constants/users.actions";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: false, user, session_timeout: null } : {};

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				user: null,
				error: null,
			};
		case userConstants.LOGIN_SUCCESS:
			let timeout = null;
			if (action.user.username !== "admin") {
				timeout = (new Date()).setTime(new Date().getTime() + (action.user.details.session_timeout * 60 * 1000));
			}
			
			return {
				session_timeout: timeout,
				loggedIn: true,
				user: action.user,
				error: null,
			};
		case userConstants.LOGIN_FAILURE:
			return {
				error: action.error,
			};
		case userConstants.SIGNUP_REQUEST:
			return {
				loggingIn: true,
				user: null,
				error: null,
			};
		case userConstants.SIGNUP_SUCCESS:
			return {
				signedUp: true,
				// user: action.user,
				error: null,
			};
		case userConstants.SIGNUP_FAILURE:
			return {
				error: action.error,
			};
		case userConstants.CHECK_SESSION_TIMEOUT:
			if (new Date().getTime() < state.session_timeout) {
				return state;
			}
			return {};
		case userConstants.LOGOUT:
			return {};
		default:
			return state;
	}
}

export default authReducer;
