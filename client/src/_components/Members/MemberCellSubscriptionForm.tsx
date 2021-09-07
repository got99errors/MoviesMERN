import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Select, Grid } from "@material-ui/core";
import { Movie } from "../../BL/movie.utils";
import { MovieSubscription } from "../../BL/member.utils";
import { memberActions } from "../../_actions/members.actions";
import { movieActions } from "../../_actions/movies.actions"
import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexGrow: 1,
			overflow: "hidden",
			listStyle: "none",
			marginRight: "5px",
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		button: {
			marginBottom: theme.spacing(2),
		},
		item: {
			margin: theme.spacing(2, 0, 3),
		},
	})
);

const SubscriptionForm = (props: any) => {
	const classes = useStyles();
	const member = props.member;
	const allMovies = useSelector((state: any) => state.moviesReducer.movies);
	// Remove movies the user has already subscribed to.
	const movies =
		allMovies !== undefined
			? allMovies.filter((movie: Movie) => {
					const subMovies = member.movies.map((subMovie: any) => subMovie.id);
					return !subMovies.includes(movie.id);
			  })
			: [];
	const [movieId, setMovieId] = useState(movies.length > 0 ? movies[0].id : "");
	let subDate: Date;
	const [subError, setSubError] = useState("");
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: { date: undefined },
		enableReinitialize: true,
		validationSchema: Yup.object({
			date: Yup.date()
				.min(new Date(), "Only future dates")
				.required("Required"),
		}),
		onSubmit: (values) => {
			setSubError("");
			dispatch(
				memberActions.subscribeToMovie({
					subId: member.subId,
					movieId: movieId,
					date: values.date,
				}, (() => dispatch(movieActions.getMovies())))
			);
		},
	});

	const handleChange = (
		event: React.ChangeEvent<{
			name?: string | undefined;
			value: string;
		}>
	) => {
		setMovieId(event.target.value);
	};

	const subscribeToMovie = () => {
		if (subDate === undefined) {
			setSubError("Enter a date");
		} else if (subDate !== undefined && subDate < new Date()) {
			setSubError("Enter a future date");
		} else {
			setSubError("");
			dispatch(
				memberActions.subscribeToMovie({
					subId: member.subId,
					movieId: movieId,
				}, (() => dispatch(movieActions.getMovies())))
			);
		}
	};

	useEffect(() => {
		if (movies.length > 0) {
			setMovieId(movies[0].id);
		}
	}, [member]);

	return (
		<Grid
			container
			style={{
				border: "solid 1px lightgrey",
				padding: "10px",
			}}
			justify="center"
		>
			{/* Add a movie <br /> */}
			<form onSubmit={formik.handleSubmit} className={classes.formControl}>
				<Grid item style={{ width: "100%" }}>
					<Select
						native
						value={movieId}
						onChange={(
							event: React.ChangeEvent<{
								name?: string | undefined;
								value: any;
							}>
						) => handleChange(event)}
						inputProps={{
							name: "movieId",
							id: "movieId",
						}}
					>
						{movies.map((movie: Movie) => (
							<option key={movie.id} value={movie.id}>
								{movie.title}
							</option>
						))}
					</Select>
					</Grid>
					<Grid item style={{ width: "100%" }}>
					<TextField
						error={formik.touched.date && formik.errors.date ? true : undefined}
						inputProps={{
							name: "date",
							id: "date",
							label: "date",
						}}
						fullWidth
						type="date"
						className={classes.item}
						InputLabelProps={{
							shrink: true,
						}}
						helperText={
							formik.touched.date && formik.errors.date
								? formik.errors.date
								: null
						}
						{...formik.getFieldProps("date")}
					/>
					
				</Grid>

				<Button
					variant="contained"
					type="submit"
					color="default"
					fullWidth
					onClick={subscribeToMovie}
				>
					Subscribe
				</Button>
			</form>
		</Grid>
	);
};

export default SubscriptionForm;
