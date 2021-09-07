import { handleResponse } from './utils'

const baseURL = process.env.REACT_APP_BASE_URL;

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
			console.log('movies',movies);
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
}