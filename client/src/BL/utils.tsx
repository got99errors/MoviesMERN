const baseURL = "http://localhost:3001/api";

//////////////////////////////
// Users
//////////////////////////////

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
	updateUser,
	// createAccount
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
				localStorage.setItem("session_timeout", String(new Date().getTime() + user.details.session_timeout*60*1000))
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
			// localStorage.setItem('user', JSON.stringify(user));
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

//////////////////////////////
// Movies
//////////////////////////////

export interface Movie {
	id: string;
	title: string;
	year: string;
	genres: string[];
	image: string;
}

export const movieService = {
	getMovies,
	addMovie,
	deleteMovie,
	updateMovie,
};

function getMovies() {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	return fetch(`${baseURL}/movies`, requestOptions)
		.then(handleResponse)
		.then((movies) => {
			return movies;
		});
}

function addMovie(movie: Movie) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ movie }),
	};

	return fetch(`${baseURL}/movies/add_movie`, requestOptions)
		.then(handleResponse)
		.then((movies) => {
			return movies;
		});
}

function deleteMovie(id: string) {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	return fetch(`${baseURL}/movies/delete/${id}`, requestOptions)
		.then(handleResponse)
		.then((movies) => {
			return movies;
		});
}

function updateMovie(movie: Movie) {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ movie }),
	};

	return fetch(`${baseURL}/movies/update_movie`, requestOptions)
		.then(handleResponse)
		.then((movies) => {
			return movies;
		});
	// return updateItem(movie, "/movies/update_movie")
}

//////////////////////////////
// Members
//////////////////////////////

interface MemberMovie {
	id: string;
	title: string;
	date: string;
}

interface Member {
	id: string;
	name: string;
	email: string;
	city: string;
	movies: MemberMovie[];
}

export const memberService = {
	getMembers,
	addMember,
	deleteMember,
	updateMember,
	subscribeToMovie,
};

function getMembers() {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	return fetch(`${baseURL}/members`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

function addMember(member: Member) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ member }),
	};

	return fetch(`${baseURL}/members/add_member`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

function deleteMember(id: string) {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	return fetch(`${baseURL}/members/delete/${id}`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

function updateMember(member: Member) {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ member }),
	};

	return fetch(`${baseURL}/members/update_member`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

export interface MovieSubscription {
	subId: string;
	movieId: string;
	date: string;
}

function subscribeToMovie(movieSubscription: MovieSubscription) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ movieSubscription }),
	};
	return fetch(`${baseURL}/members/subscribeToMovie`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

function handleResponse(response: any) {
	return response.text().then((text: any) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				// location.reload(true);
			}
			const error =
				(data && data.message && !data.error) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
