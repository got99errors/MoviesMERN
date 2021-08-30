import React, { useState, useEffect, useCallback, memo } from "react";
import { movieActions } from "../../_actions/movies.actions";
import { memberActions } from '../../_actions/members.actions'
import { useDispatch } from "react-redux";
import MovieCellComp from "./MovieCell";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import { permissionConstants } from "../../_constants/permissions.constants";

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MoviesComp = (props: any) => {
	const searchVal = props.search.toLowerCase();
	let { movieId } = useParams<{ movieId: string }>();
	const movies = props.movies;
	let filteredMovies = movies;
	let user = useSelector((state: any) => state.authReducer.user)
	const canViewSubscription = user.permissions.includes(
		permissionConstants.VIEW_SUB
	);
	const canDeleteMovie = user.permissions.includes(
		permissionConstants.DELETE_MOVIE
	);
	const canUpdateMovie = user.permissions.includes(
		permissionConstants.UPDATE_MOVIE
	);
	
	if (movies !== undefined) {
		// handle single movie display
		if (movieId !== undefined) {
			filteredMovies = movies.filter((movie: any) => movie.id === movieId)
		}
		else 
		// handle search
		if (searchVal.length > 0) {
			filteredMovies = movies.filter((movie: any) => {
				if (movie.title === undefined) {
					return false;
				}
				return movie.title.toLowerCase().includes(searchVal);
			});
		}
	}

	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const handleClick = useCallback(() => {
		setOpen(true);
	}, [open]);

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		if (deleted) {
			handleClick();
			setDeleted(false);
		}
	}, [movies]);

	const editMovie = (movie: any) => {
		dispatch(movieActions.editMovie(movie));
	};

	const deleteMovie = useCallback((id: string) => {
		setDeleted(true);
		dispatch(movieActions.deleteMovie(id, (() => dispatch(memberActions.getMembers()))));
	}, [deleted]);

	return (
		<>
			{filteredMovies?.map((movie: any, index: number) => (
				<MovieCellComp
					key={index}
					movie={movie}
					edit={editMovie}
					delete={deleteMovie}
					permissions={user.permissions}
					canViewSubscription={canViewSubscription}
					canDeleteMovie={canDeleteMovie}
					canUpdateMovie={canUpdateMovie}
				/>
			))}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					Deleted movie successfully!
				</Alert>
			</Snackbar>
		</>
	);
};

export default memo(MoviesComp);
