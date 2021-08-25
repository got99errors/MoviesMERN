import { moviesConstants } from "../_constants/movies.actions";

const initialState = { movies: [] , editedMovie: null, search: ""};

export function moviesReducer(state = initialState, action) {
	switch (action.type) {
		case moviesConstants.MOVIES_REQUEST:
			return {
				fetchingMovies: true,
			};
		case moviesConstants.MOVIES_SUCCESS:
			return {
				fetchingMovies: false,
				movies: action.movies,
			};
		case moviesConstants.MOVIES_FAILURE:
			return {
				fetchingMovies: false,
			};
		case moviesConstants.ADD_MOVIE_REQUEST:
			return {
				...state,
				fetchingMovies: true,
			};
		case moviesConstants.ADD_MOVIE_SUCCESS:
			return {
				...state,
				fetchingMovies: false,
				movies: action.movies,
			};
		case moviesConstants.ADD_MOVIE_FAILURE:
			return {
				...state,
				fetchingMovies: false,
			};
		case moviesConstants.DELETE_MOVIE_REQUEST:
			return {
				...state,
				id: action.id,
				fetchingMovies: true,
			};
		case moviesConstants.DELETE_MOVIE_SUCCESS:
			return {
				...state,
				fetchingMovies: false,
				movies: action.movies,
			};
		case moviesConstants.DELETE_MOVIE_FAILURE:
			return {
				...state,
				fetchingMovies: false,
			};
		case moviesConstants.UPDATE_MOVIE_REQUEST:
			return {
				...state,
				fetchingMovies: true,
			};
		case moviesConstants.UPDATE_MOVIE_SUCCESS:
			return {
				...state,
				fetchingMovies: false,
				movies: action.movies,
			};
		case moviesConstants.UPDATE_MOVIE_FAILURE:
			return {
				...state,
				fetchingMovies: false,
			};
		case moviesConstants.EDIT_MOVIE:
			return {
				...state,
				editedMovie: action.movie
			}
		case moviesConstants.STOP_EDIT_MOVIE:
			return {
				...state
			};
		case moviesConstants.SEARCH_TYPED:
			return {
				...state,
				search: action.text
			}
		default:
			return state;
	}
}

export default moviesReducer;
