import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { userActions } from "../_actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import {
	Link,
	Grid,
	Typography,
	Container,
	TextField,
	CssBaseline,
	Button,
	Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(2),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		color: "red",
	},
}));

export default function SignupComp() {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const dispatch = useDispatch();
	let history = useHistory();
	const location = useLocation();
	const error = useSelector((state: any) => state.authReducer.error);
	const signedUp = useSelector((state: any) => state.authReducer.signedUp);
	const [errorMessage, setErrorMessage] = useState(error);
	console.error("SignupComp error: %j", error);
	const classes = useStyles();

	const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { username, password } = inputs;

		// Check input
		if (!username) {
			setErrorMessage("Enter username");
		} else if (!password) {
			setErrorMessage("Enter password");
		} else {
			// Submit login details
			setErrorMessage("");

			// get return url from location state or default to home page
			const { from } = location.state || { from: { pathname: "/login" } };
			dispatch(userActions.signup(username, password, from));
		}
	};

	useEffect(() => {
		if (signedUp === true) {
			history.push("/login");
		}
	}, [signedUp, history]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item className={classes.error}>
							{error}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="off"
								onFocus={(event) => {
									event.target.setAttribute("autocomplete", "off");
								}}
								onChange={onChangeHandle}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								helperText={errorMessage}
								onChange={onChangeHandle}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container alignItems="center" justify="center">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
