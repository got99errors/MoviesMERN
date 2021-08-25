import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "../../_actions/movies.actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	TextField,
	Button,
	Grid,
	Container,
	CircularProgress,
	Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import "date-fns";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			display: "flex",
			flexGrow: 1,
			overflow: "hidden",
			padding: theme.spacing(0, 1),
		},
		grid: {
			backgroundColor: "#CCC",
			borderRadius: 10,
			margin: `${theme.spacing(2)}px auto`,
			padding: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
		},
		gridItem: {
			marginTop: `${theme.spacing(2)}px`,
			width: "100%",
		},
		bottomButton: {
			width: "100%",
		},
		buttonGridItem: {
			width: "45%"
		}
	})
);

function formatDate(date) {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	return [year, month, day].join("-");
}

const AddMovieComp = (props) => {
	const dispatch = useDispatch();
	const movies = props.movies;
	const [redirect, setRedirect] = useState(false);
	const classes = useStyles();
	let movie = {
		title: "",
		genres: "",
		image: "",
		year: undefined,
	};

	if (props.editedMovie) {
		let targetMovie = movies.find(
			(aMovie) => aMovie.id === props.editedMovie.id
		);

		if (targetMovie) {
			console.log(
				"AddMovie targetMovie year type: " +
					typeof targetMovie.year +
					" value: " +
					targetMovie.year
			);
			movie = {
				title: targetMovie.title,
				genres: targetMovie.genres.toString(),
				image: targetMovie.image,
				year: formatDate(new Date(targetMovie.year)),
			};
		}
	}

	const formik = useFormik({
		initialValues: movie,
		enableReinitialize: true,
		validationSchema: Yup.object({
			title: Yup.string()
				.max(50, "Must be 50 characters or less")
				.required("Required"),
			genres: Yup.string()
				.max(100, "Must be 100 characters or less")
				.required("Required"),
			image: Yup.string().url("Invalid url"),
			year: Yup.date().max(new Date(), "Only past dates").required("Required"),
		}),
		onSubmit: (values) => {
			setRedirect(true);
			const obj = {
				title: formik.values.title,
				genres: formik.values.genres.split(","),
				image: formik.values.image,
				year: formik.values.year.toString(),
			};
			if (props.editedMovie !== undefined) {
				obj.id = props.editedMovie.id;
				dispatch(movieActions.updateMovie(obj));
			} else {
				dispatch(movieActions.addMovie(obj));
			}
		},
	});

	// after a movie add/edit, store refreshes 'movies' in state
	useEffect(() => {
		if (redirect) {
			props.addedSuccessfully();
			setRedirect(false);
		}
	}, [props, redirect]);

	return (
		<Container
			className={classes.root}
			maxWidth="sm"
			style={{ marginTop: "10px" }}
		>
			<Grid
				container
				direction="row"
				className={classes.grid}
				justify="center"
			>
				<Typography variant="h6">
					{props.editedMember
						? `Edit Movie: "${props.editedMovie.title}"`
						: `Add a Movie`}
				</Typography>
				<form
					onSubmit={formik.handleSubmit}
					style={{ width: "100%" }}
					noValidate
				>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={formik.touched.title && formik.errors.title ? true : null}
							id="title"
							name="title"
							label="Title"
							variant="outlined"
							helperText={
								formik.touched.title && formik.errors.title
									? formik.errors.title
									: null
							}
							{...formik.getFieldProps("title")}
						/>
					</Grid>
					<Grid item>
						<TextField
							className={classes.gridItem}
							error={
								formik.touched.genres && formik.errors.genres ? true : null
							}
							id="genres"
							name="genres"
							label="Genres"
							placeholder="Drama, Comedy, ..."
							variant="outlined"
							helperText={
								formik.touched.genres && formik.errors.genres
									? formik.errors.genres
									: null
							}
							{...formik.getFieldProps("genres")}
						/>
					</Grid>
					<Grid item>
						<TextField
							className={classes.gridItem}
							error={formik.touched.image && formik.errors.image ? true : null}
							id="image"
							name="image"
							label="Image"
							variant="outlined"
							helperText={
								formik.touched.image && formik.errors.image
									? formik.errors.image
									: null
							}
							{...formik.getFieldProps("image")}
						/>
					</Grid>
					<Grid item>
						<TextField
							className={classes.gridItem}
							error={formik.touched.year && formik.errors.year ? true : null}
							id="year"
							name="year"
							label="Premiered"
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
							helperText={
								formik.touched.year && formik.errors.year
									? formik.errors.year
									: null
							}
							{...formik.getFieldProps("year")}
						/>
					</Grid>
					<Grid item className={classes.gridItem}>
						<Grid container justify="space-evenly">
							<Grid item className={classes.buttonGridItem}>
								<Button
									color="primary"
									variant="contained"
									type="submit"
									className={classes.bottomButton}
								>
									Save
								</Button>
							</Grid>

							<Grid item className={classes.buttonGridItem}>
								<Button
									color="secondary"
									variant="contained"
									onClick={() => props.addedSuccessfully()}
									className={classes.bottomButton}
								>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<br />
					{redirect && <CircularProgress />}
				</form>
			</Grid>
		</Container>
	);
};

export default AddMovieComp;
