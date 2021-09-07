import { handleResponse } from "./utils";

const baseURL = process.env.REACT_APP_BASE_URL;

interface User {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	created_date: Date;
	session_timeout: Number;
	permissions: string[];
}

export const userService = {
	login,
	signup,
	logout,
	getUsers,
	addUser,
	deleteUser,
	updateUser
};

function login(username: string, password: string) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	};

	return fetch(`${baseURL}/login`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			if (!user.error) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem(
					"session_timeout",
					String(
						new Date().getTime() + user.details.session_timeout * 60 * 1000
					)
				);
			}
			return user;
		});
}

function signup(username: string, password: string) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	};

	return fetch(`${baseURL}/login/signup`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			return user;
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem("user");
}

function getUsers() {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	return fetch(`${baseURL}/users`, requestOptions)
		.then(handleResponse)
		.then((users) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			return users;
		});
}

function addUser(user: User) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ user }),
	};

	return fetch(`${baseURL}/users/add_user`, requestOptions)
		.then(handleResponse)
		.then((users) => {
			return users;
		});
}

function deleteUser(id: string) {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	return fetch(`${baseURL}/users/delete/${id}`, requestOptions)
		.then(handleResponse)
		.then((users) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			// localStorage.setItem('user', JSON.stringify(user));
			return users;
		});
}

function updateUser(user: User) {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ user }),
	};

	return fetch(`${baseURL}/users/update_user`, requestOptions)
		.then(handleResponse)
		.then((users) => {
			return users;
		});
}
