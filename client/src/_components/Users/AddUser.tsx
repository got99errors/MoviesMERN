import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../_actions/user.actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { permissionConstants } from "../../_constants/permissions.constants";
import * as UserDomain from "../../_domains/user";
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
			width: "45%",
		},
	})
);

type FormUserType = {
	fn: string;
	ln: string;
	username: string;
	timeout: number;
	created_date: string | null;
	viewsub: boolean;
	createsub: boolean;
	updatesub: boolean;
	deletesub: boolean;
	viewmovie: boolean;
	createmovie: boolean;
	updatemovie: boolean;
	deletemovie: boolean;
};

// todo: don't submit w/o minimum 1 permission
const AddUserComp = (props: any) => {
	const dispatch = useDispatch();
	const users = props.users;
	const [redirect, setRedirect] = useState(false);
	const classes = useStyles();
	let user: FormUserType = {
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
		let targetUser: UserDomain.User = users.find(
			(aUser: UserDomain.User) => aUser.id === props.editedUser.id
		);

		if (targetUser) {
			user = {
				fn: targetUser.first_name,
				ln: targetUser.last_name,
				username: targetUser.username,
				timeout: targetUser.session_timeout,
				created_date: targetUser.created_date
					? new Date(targetUser.created_date).toLocaleDateString("en-gb", {
							year: "numeric",
							month: "numeric",
							day: "numeric",
					  })
					: null,
				viewsub: UserDomain.canViewSubscription(targetUser),
				createsub: UserDomain.canCreateSubscription(targetUser),
				updatesub: UserDomain.canUpdateSubscription(targetUser),
				deletesub: UserDomain.canDeleteSubscription(targetUser),
				viewmovie: UserDomain.canViewMovie(targetUser),
				createmovie: UserDomain.canCreateMovie(targetUser),
				updatemovie: UserDomain.canUpdateMovie(targetUser),
				deletemovie: UserDomain.canDeleteMovie(targetUser),
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
					id: undefined,
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

	interface CheckBoxTarget extends EventTarget {
		name: string;
		value: string;
	}
	const checkCheckbox:
		| ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
		| undefined = (e) => {
		const fieldId = e.target.name;
		let updates = { [e.target.id]: e.target.checked };

		if (e.target.checked) {
			if (["createsub", "deletesub", "updatesub"].includes(fieldId)) {
				updates = { ...updates, viewsub: true };
			} else if (
				["createmovie", "deletemovie", "updatemovie"].includes(fieldId)
			) {
				updates = { ...updates, viewmovie: true };
			}
		}
		formik.setValues({ ...formik.values, ...updates });
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
							error={formik.touched.fn && formik.errors.fn ? true : undefined}
							id="fn"
							label="First Name"
							variant="outlined"
							helperText={
								formik.touched.fn && formik.errors.fn ? formik.errors.fn : null
							}
							{...formik.getFieldProps("fn")}
							name="fn"
						/>
					</Grid>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={formik.touched.ln && formik.errors.ln ? true : undefined}
							id="ln"
							label="Last Name"
							variant="outlined"
							helperText={
								formik.touched.ln && formik.errors.ln ? formik.errors.ln : null
							}
							{...formik.getFieldProps("ln")}
							name="ln"
						/>
					</Grid>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={
								formik.touched.username && formik.errors.username
									? true
									: undefined
							}
							id="username"
							label="Username"
							variant="outlined"
							helperText={
								formik.touched.username && formik.errors.username
									? formik.errors.username
									: null
							}
							{...formik.getFieldProps("username")}
							name="username"
						/>
					</Grid>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={
								formik.touched.timeout && formik.errors.timeout
									? true
									: undefined
							}
							id="timeout"
							label="Session Timeout"
							variant="outlined"
							helperText={
								formik.touched.timeout && formik.errors.timeout
									? formik.errors.timeout
									: null
							}
							{...formik.getFieldProps("timeout")}
							name="timeout"
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
											{...formik.getFieldProps("viewsub")}
											name="viewsub"
											onChange={checkCheckbox}
											checked={formik.values.viewsub}
											id="viewsub"
											color="secondary"
										/>
									}
									label="View Subscriptions"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											{...formik.getFieldProps("viewmovie")}
											checked={formik.values.viewmovie}
											id="viewmovie"
											color="secondary"
											name="viewmovie"
											onChange={checkCheckbox}
										/>
									}
									label="View Movies"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											{...formik.getFieldProps("createsub")}
											checked={formik.values.createsub}
											id="createsub"
											color="secondary"
											name="createsub"
											onChange={checkCheckbox}
										/>
									}
									label="Create Subscriptions"
								/>
							</Grid>

							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											{...formik.getFieldProps("createmovie")}
											checked={formik.values.createmovie}
											id="createmovie"
											color="secondary"
											name="createmovie"
											onChange={checkCheckbox}
										/>
									}
									label="Create Movies"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											{...formik.getFieldProps("updatesub")}
											checked={formik.values.updatesub}
											id="updatesub"
											color="secondary"
											name="updatesub"
											onChange={checkCheckbox}
										/>
									}
									label="Update Subscriptions"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											{...formik.getFieldProps("updatemovie")}
											checked={formik.values.updatemovie}
											id="updatemovie"
											color="secondary"
											name="updatemovie"
											onChange={checkCheckbox}
										/>
									}
									label="Update Movies"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											{...formik.getFieldProps("deletesub")}
											checked={formik.values.deletesub}
											id="deletesub"
											color="secondary"
											name="deletesub"
											onChange={checkCheckbox}
										/>
									}
									label="Delete Subscriptions"
								/>
							</Grid>
							<Grid item className={classes.checkboxItem}>
								<FormControlLabel
									control={
										<Checkbox
											{...formik.getFieldProps("deletemovie")}
											checked={formik.values.deletemovie}
											id="deletemovie"
											color="secondary"
											name="deletemovie"
											onChange={checkCheckbox}
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
