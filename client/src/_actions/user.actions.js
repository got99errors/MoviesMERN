import { userConstants } from "../_constants/users.actions";
import { userService } from "../BL/user.utils";

export const userActions = {
	login,
	signup,
	logout,
	getUsers,
	addUser,
	editUser,
	stopEditUser,
	deleteUser,
	updateUser,
};

function login(username, password, from) {
	return (dispatch) => {
		dispatch(request({ username }));

		userService.login(username, password).then(
			(user) => {
				if (!user.error) {
					dispatch(success(user));
				} else {
					dispatch(failure(user.error));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(user) {
		return { type: userConstants.LOGIN_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}

function signup(username, password, from) {
	return (dispatch) => {
		dispatch(request({ username }));

		userService.signup(username, password).then(
			(user) => {
				if (!user.error) {
					dispatch(success());
				} else {
					dispatch(failure(user.error));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(user) {
		return { type: userConstants.SIGNUP_REQUEST, user };
	}
	function success() {
		return { type: userConstants.SIGNUP_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.SIGNUP_FAILURE, error };
	}
}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}

function getUsers() {
	return (dispatch) => {
		dispatch(request({}));
		userService.getUsers().then(
			(users) => {
				if (!users.error) {
					dispatch(success(users));
				} else {
					dispatch(failure(users));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(users) {
		return { type: userConstants.USERS_REQUEST, users: users };
	}
	function success(users) {
		return { type: userConstants.USERS_SUCCESS, users };
	}
	function failure(error) {
		return { type: userConstants.USERS_FAILURE, error };
	}
}

function addUser(user) {
	return (dispatch) => {
		dispatch(request(user));
		userService.addUser(user).then(
			(users) => {
				if (!users.error) {
					dispatch(success(users));
				} else {
					dispatch(failure(users));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(user) {
		return { type: userConstants.ADD_USER_REQUEST, user: user };
	}
	function success(users) {
		return { type: userConstants.ADD_USER_SUCCESS, users };
	}
	function failure(error) {
		return { type: userConstants.ADD_USER_FAILURE, error };
	}
}

function deleteUser(id) {
	return (dispatch) => {
		dispatch(request(id));
		userService.deleteUser(id).then(
			(users) => {
				if (!users.error) {
					dispatch(success(users));
				} else {
					dispatch(failure(users));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(id) {
		return { type: userConstants.DELETE_USER_REQUEST, id: id };
	}
	function success(users) {
		return { type: userConstants.DELETE_USER_SUCCESS, users };
	}
	function failure(error) {
		return { type: userConstants.DELETE_USER_FAILURE, error };
	}
}

function updateUser(user) {
	return (dispatch) => {
		dispatch(request(user));
		userService.updateUser(user).then(
			(users) => {
				if (!users.error) {
					dispatch(success(users));
				} else {
					dispatch(failure(users));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(user) {
		return { type: userConstants.UPDATE_USER_REQUEST, user: user };
	}
	function success(users) {
		return { type: userConstants.UPDATE_USER_SUCCESS, users };
	}
	function failure(error) {
		return { type: userConstants.UPDATE_USER_FAILURE, error };
	}
}

function editUser(obj) {
	let user = {
		id: obj.id,
		first_name: obj.first_name,
		last_name: obj.last_name,
	};
	return { type: userConstants.EDIT_USER, user };
}

function stopEditUser() {
	return { type: userConstants.EDIT_USER, action: null };
}
