import { moviesConstants } from '../_constants/movies.actions';
import { movieService } from '../BL/movie.utils';

export const movieActions = {
    getMovies,
    addMovie,
    editMovie,
    stopEditMovie,
    deleteMovie,
    updateMovie
}

function editMovie(obj) {
    let movie = {id: obj.id, title: obj.title};
    return {type: moviesConstants.EDIT_MOVIE, movie: movie};
}

function stopEditMovie() {
    return {type: moviesConstants.EDIT_MOVIE, action: null}
}

function getMovies() {
    return dispatch => {
        dispatch(request({  }));
        movieService.getMovies()
            .then(
                movies => { 
                    if (!movies.error) {
                        dispatch(success(movies));
                    } else {
                        dispatch(failure(movies));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(movies) { return { type: moviesConstants.MOVIES_REQUEST, movies: movies } }
    function success(movies) { return { type: moviesConstants.MOVIES_SUCCESS, movies } }
    function failure(error) { return { type: moviesConstants.MOVIES_FAILURE, error } }
}

function addMovie(movie) {
    return dispatch => {
        dispatch(request(movie));
        movieService.addMovie(movie)
            .then(
                movies => { 
                    if (!movies.error) {
                        dispatch(success(movies));
                    } else {
                        dispatch(failure(movies));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(movie) { return { type: moviesConstants.ADD_MOVIE_REQUEST, movie: movie } }
    function success(movies) { return { type: moviesConstants.ADD_MOVIE_SUCCESS, movies } }
    function failure(error) { return { type: moviesConstants.ADD_MOVIE_FAILURE, error } }
}

function deleteMovie(id, subscriptionsCallback) {
    return dispatch => {
        dispatch(request(id));
        movieService.deleteMovie(id)
            .then(
                movies => { 
                    if (!movies.error) {
                        dispatch(success(movies));
                        // refresh subscriptions
                        subscriptionsCallback()
                    } else {
                        dispatch(failure(movies));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: moviesConstants.DELETE_MOVIE_REQUEST, id: id } }
    function success(movies) { return { type: moviesConstants.DELETE_MOVIE_SUCCESS, movies } }
    function failure(error) { return { type: moviesConstants.DELETE_MOVIE_FAILURE, error } }
}


function updateMovie(movie) {
    return dispatch => {
        dispatch(request(movie));
        movieService.updateMovie(movie)
            .then(
                movies => { 
                    if (!movies.error) {
                        dispatch(success(movies));
                    } else {
                        dispatch(failure(movies));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(movie) { return { type: moviesConstants.UPDATE_MOVIE_REQUEST, movie: movie } }
    function success(movies) { return { type: moviesConstants.UPDATE_MOVIE_SUCCESS, movies: movies } }
    function failure(error) { return { type: moviesConstants.UPDATE_MOVIE_FAILURE, error } }
}