import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions/user.actions";
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container} from "@material-ui/core";
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
}));

const LoginComp = (props: any) => {
	const [inputs, setInputs] = useState({
		username: "",
		password: "current-password",
	});
	const { username, password } = inputs;
	const dispatch = useDispatch();
	const location = useLocation();
	const error = useSelector((state: any) => state.authReducer.error);
	const [errorMessage, setErrorMessage] = useState(error);
	const classes = useStyles();

	const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	};

	// reset login status
	useEffect(() => {
		if (localStorage.getItem("user") != null) {
			dispatch(userActions.logout());
		}
	}, [dispatch]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Check input
		if (!username) {
			setErrorMessage("Enter username");
		} else if (!password) {
			setErrorMessage("Enter password");
		} else {
			// Submit login details
			setErrorMessage("");

			// get return url from location state or default to home page
			const { from } = location.state || { from: { pathname: "/" } };
			dispatch(userActions.login(username, password, from));
		}
	};
	return (
		<div>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate onSubmit={onSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
							onChange={onChangeHandle}
							helperText={error}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={onChangeHandle}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container alignItems="center" justify="center">
							<Grid item>
								<Typography align="center" style={{ color: "red" }}>
									<Link href="/create_account" variant="body2">
										First time? Create an account
									</Link>
								</Typography>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	);
};

export default LoginComp;
