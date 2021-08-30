import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../_actions/user.actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { permissionConstants } from "../../_constants/permissions.constants";
import {
	TextField,
	Button,
	Grid,
	Container,
	CircularProgress,
	Typography,
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

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
			padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
		},
		gridItem: {
			marginTop: `${theme.spacing(1)}px`,
			width: "100%",
		},

		checkboxItem: {
			marginTop: `${theme.spacing(1)}px`,
			width: "50%",
		},
		bottomButton: {
			width: "100%",
		},
		buttonGridItem: {
			width: "45%"
		}
	})
);

// todo: don't submit w/o minimum 1 permission
const AddUserComp = (props) => {
	const dispatch = useDispatch();
	const users = props.users;
	const [redirect, setRedirect] = useState(false);
	const classes = useStyles();
	let user = {
		fn: "",
		ln: "",
		username: "",
		timeout: 0,
		created_date: null,
		viewsub: false,
		createsub: false,
		updatesub: false,
		deletesub: false,
		viewmovie: false,
		createmovie: false,
		updatemovie: false,
		deletemovie: false,
	};

	if (props.editedUser) {
		let targetUser = users.find((aUser) => aUser.id === props.editedUser.id);

		if (targetUser) {
			user = {
				fn: targetUser.first_name,
				ln: targetUser.last_name,
				username: targetUser.username,
				timeout: targetUser.session_timeout,
				viewsub: targetUser.permissions.includes(permissionConstants.VIEW_SUB),
				created_date: targetUser.created_date
					? new Date(targetUser.created_date).toLocaleDateString("en-gb", {
							year: "numeric",
							month: "numeric",
							day: "numeric",
					  })
					: null,
				createsub: targetUser.permissions.includes(
					permissionConstants.CREATE_SUB
				),
				updatesub: targetUser.permissions.includes(
					permissionConstants.UPDATE_SUB
				),
				deletesub: targetUser.permissions.includes(
					permissionConstants.DELETE_SUB
				),
				viewmovie: targetUser.permissions.includes(
					permissionConstants.VIEW_MOVIE
				),
				createmovie: targetUser.permissions.includes(
					permissionConstants.CREATE_MOVIE
				),
				updatemovie: targetUser.permissions.includes(
					permissionConstants.UPDATE_MOVIE
				),
				deletemovie: targetUser.permissions.includes(
					permissionConstants.DELETE_MOVIE
				),
			};
		}
	}

	const formik = useFormik({
		initialValues: user,
		enableReinitialize: true,
		validationSchema: Yup.object({
			fn: Yup.string()
				.max(50, "Must be 50 characters or less")
				.required("Required"),
			ln: Yup.string()
				.max(50, "Must be 50 characters or less")
				.required("Required"),
			username: Yup.string()
				.min(4, "Must be at least 4 charaters long")
				.max(20, "Must be 20 characters or less")
				.required("Required"),
			timeout: Yup.number()
				.integer("Must be an integer")
				.positive("Session timeout should be a positive number")
				.required("Required"),
		}),
		onSubmit: (values) => {
			if (hasSomePermission()) {
				setRedirect(true);
				const obj = {
					first_name: formik.values.fn,
					last_name: formik.values.ln,
					username: formik.values.username,
					session_timeout: formik.values.timeout,
					permissions: collectPermissions(),
				};
				if (props.editedUser !== undefined) {
					obj.id = props.editedUser.id;
					dispatch(userActions.updateUser(obj));
				} else {
					dispatch(userActions.addUser(obj));
				}
			}
		},
	});

	const hasSomePermission = () => {
		return (
			formik.values.viewsub ||
			formik.values.createsub ||
			formik.values.updatesub ||
			formik.values.deletesub ||
			formik.values.viewmovie ||
			formik.values.createmovie ||
			formik.values.updatemovie ||
			formik.values.deletemovie
		);
	};

	const collectPermissions = () => {
		let perms = [];
		if (formik.values.viewsub) {
			perms.push(permissionConstants.VIEW_SUB);
		}
		if (formik.values.createsub) {
			perms.push(permissionConstants.CREATE_SUB);
		}
		if (formik.values.updatesub) {
			perms.push(permissionConstants.UPDATE_SUB);
		}
		if (formik.values.deletesub) {
			perms.push(permissionConstants.DELETE_SUB);
		}
		if (formik.values.viewmovie) {
			perms.push(permissionConstants.VIEW_MOVIE);
		}
		if (formik.values.createmovie) {
			perms.push(permissionConstants.CREATE_MOVIE);
		}
		if (formik.values.updatemovie) {
			perms.push(permissionConstants.UPDATE_MOVIE);
		}
		if (formik.values.deletemovie) {
			perms.push(permissionConstants.DELETE_MOVIE);
		}
		return perms;
	};

	const checkCheckbox = (e) => {
		const eName = e.target.name;
		const eValue = e.target.value;

		if (eValue === "false") {
			if (["createsub", "deletesub", "updatesub"].includes(eName)) {
				formik.setValues({ ...formik.values, viewsub: true }).then(() => {
				});
			} else if (
				["createmovie", "deletemovie", "updatemovie"].includes(eName)
			) {
				formik.setValues({ ...formik.values, viewmovie: true }).then(() => {
				});
			}
		}
	};

	// after a user add/edit, store refreshes 'users' in state
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
			<form
				onSubmit={formik.handleSubmit}
				className={classes.root}
				style={{ width: "100%" }}
				noValidate
			>
				<Grid
					container
					// direction="row"
					className={classes.grid}
					justify="center"
				>
					<Grid item className={classes.gridItem}>
						<Typography variant="h6" align="center">
							{props.editedUser
								? `Edit User: ${props.editedUser.first_name} ${props.editedUser.last_name}`
								: "Add a User"}{" "}
						</Typography>
					</Grid>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={formik.touched.fn && formik.errors.fn ? true : null}
							id="fn"
							name="fn"
							label="First Name"
							variant="outlined"
							helperText={
								formik.touched.fn && formik.errors.fn ? formik.errors.fn : null
							}
							{...formik.getFieldProps("fn")}
						/>
					</Grid>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={formik.touched.ln && formik.errors.ln ? true : null}
							id="ln"
							name="ln"
							label="Last Name"
							variant="outlined"
							helperText={
								formik.touched.ln && formik.errors.ln ? formik.errors.ln : null
							}
							{...formik.getFieldProps("ln")}
						/>
					</Grid>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={
								formik.touched.username && formik.errors.username ? true : null
							}
							id="username"
							name="username"
							label="Username"
							variant="outlined"
							helperText={
								formik.touched.username && formik.errors.username
									? formik.errors.username
									: null
							}
							{...formik.getFieldProps("username")}
						/>
					</Grid>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={
								formik.touched.timeout && formik.errors.timeout ? true : null
							}
							id="timeout"
							name="timeout"
							label="Session Timeout"
							variant="outlined"
							helperText={
								formik.touched.timeout && formik.errors.timeout
									? formik.errors.timeout
									: null
							}
							{...formik.getFieldProps("timeout")}
						/>
					</Grid>

					{user.created_date && (
						<Grid item className={classes.gridItem}>
							Created on: {user.created_date}
						</Grid>
					)}
					<Grid item className={classes.gridItem}>
						<Grid container className={classes.gridItem}>
						<Grid item className={classes.gridItem}>
						<Typography variant="body1" gutterBottom>
							<strong>Select Permissions:</strong>
						</Typography>
						</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											checked={formik.values.viewsub === true ? true : false}
											onClick={(e) => checkCheckbox(e)}
											name="viewsub"
											id="viewsub"
											color="secondary"
											{...formik.getFieldProps("viewsub")}
										/>
									}
									label="View Subscriptions"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											checked={formik.values.viewmovie === true ? true : false}
											onClick={(e) => checkCheckbox(e)}
											name="viewmovie"
											id="viewmovie"
											color="secondary"
											{...formik.getFieldProps("viewmovie")}
										/>
									}
									label="View Movies"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											checked={formik.values.createsub === true ? true : false}
											onClick={(e) => checkCheckbox(e)}
											name="createsub"
											id="createsub"
											color="secondary"
											{...formik.getFieldProps("createsub")}
										/>
									}
									label="Create Subscriptions"
								/>
							</Grid>

							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											checked={
												formik.values.createmovie === true ? true : false
											}
											onClick={(e) => checkCheckbox(e)}
											name="createmovie"
											id="createmovie"
											color="secondary"
											{...formik.getFieldProps("createmovie")}
										/>
									}
									label="Create Movies"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											checked={formik.values.updatesub === true ? true : false}
											onClick={(e) => checkCheckbox(e)}
											name="updatesub"
											id="updatesub"
											color="secondary"
											{...formik.getFieldProps("updatesub")}
										/>
									}
									label="Update Subscriptions"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											checked={
												formik.values.updatemovie === true ? true : false
											}
											onClick={(e) => checkCheckbox(e)}
											name="updatemovie"
											id="updatemovie"
											color="secondary"
											{...formik.getFieldProps("updatemovie")}
										/>
									}
									label="Update Movies"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											checked={formik.values.deletesub === true ? true : false}
											onClick={(e) => checkCheckbox(e)}
											name="deletesub"
											id="deletesub"
											color="secondary"
											{...formik.getFieldProps("deletesub")}
										/>
									}
									label="Delete Subscriptions"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											checked={
												formik.values.deletemovie === true ? true : false
											}
											onClick={(e) => checkCheckbox(e)}
											name="deletemovie"
											id="deletemovie"
											color="secondary"
											{...formik.getFieldProps("deletemovie")}
										/>
									}
									label="Delete Movies"
								/>
							</Grid>
						</Grid>
						</Grid>	
					<Grid item className={classes.gridItem}>
						<Grid container justify="space-evenly">
							<Grid item className={classes.buttonGridItem}>
								<Button
									className={classes.bottomButton}
									color="primary"
									variant="contained"
									type="submit"
								>
									Save
								</Button>
							</Grid>
							<Grid item className={classes.buttonGridItem}>
								<Button
									className={classes.bottomButton}
									color="secondary"
									variant="contained"
									onClick={() => props.addedSuccessfully()}
								>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</Grid>

					{redirect && (
						<Grid item>
							<CircularProgress />
						</Grid>
					)}
				</Grid>
			</form>
		</Container>
	);
};

export default AddUserComp;
