import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions/user.actions";
import {
	Avatar,
	Button,
	CssBaseline,
	Link,
	Grid,
	Typography,
	Container,
} from "@material-ui/core";
import LoginTextField from "./LoginTextField";
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

const LoginComp = () => {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const { username, password } = inputs;
	const dispatch = useDispatch();
	const location = useLocation();
	const error = useSelector((state: any) => state.authReducer.error);
	const [loginErrorMessage, setLoginErrorMessage] = useState(error);
	const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
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

	useEffect(() => {
		setLoginErrorMessage(error);
	}, [error]);

	const resetErrorMessages = () => {
		if (usernameErrorMessage) {
			setUsernameErrorMessage("");
		}
		if (passwordErrorMessage) {
			setPasswordErrorMessage("");
		}
		if (loginErrorMessage) {
			setLoginErrorMessage("")
		}
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetErrorMessages();

		// Check input
		if (!username) {
			setUsernameErrorMessage("Enter a username");
		} else if (!password) {
			setPasswordErrorMessage("Enter a password");
		} else {
			// Submit login details
			resetErrorMessages()
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
						<Typography component="div" variant="caption" color="error">
							{error}
						</Typography>
						<LoginTextField 
							id="username"
							onChange={onChangeHandle}
							helperText={usernameErrorMessage}
						/>
						<LoginTextField 
							id="password"
							onChange={onChangeHandle}
							autoComplete="current-password"
							helperText={passwordErrorMessage}
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
