import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { memberActions } from "../../_actions/members.actions";
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
			padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
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

// todo: don't submit w/o minimum 1 permission
const AddMemberComp = (props) => {
	const dispatch = useDispatch();
	const members = props.members;
	const [redirect, setRedirect] = useState(false);
	const classes = useStyles();
	let member = {
		name: "",
		email: "",
		city: "",
	};

	if (props.editedMember) {
		let targetMember = members.find(
			(aMember) => aMember.id === props.editedMember.id
		);

		if (targetMember) {
			member = {
				name: targetMember.name,
				email: targetMember.email,
				city: targetMember.city,
			};
		}
	}

	const formik = useFormik({
		initialValues: member,
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string()
				.max(50, "Must be 50 characters or less")
				.required("Required"),
			city: Yup.string()
				.max(50, "Must be 50 characters or less")
				.required("Required"),
			email: Yup.string().email("Invalid email address").required("Required"),
		}),
		onSubmit: (values) => {
			setRedirect(true);
			const obj = {
				name: formik.values.name,
				email: formik.values.email,
				city: formik.values.city,
			};
			if (props.editedMember !== undefined) {
				obj.id = props.editedMember.id;
				dispatch(memberActions.updateMember(obj));
			} else {
				dispatch(memberActions.addMember(obj));
			}
		},
	});

	// after a member add/edit, store refreshes 'members' in state
	useEffect(() => {
		if (redirect) {
			props.addedSuccessfully();
			setRedirect(false);
		}
	}, [props, dispatch, redirect]);

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
						? `Edit Member "${formik.values["name"]}"`
						: `Add a member`}{" "}
				</Typography>
				<form
					onSubmit={formik.handleSubmit}
					style={{ width: "100%" }}
					noValidate
				>
					<Grid item className={classes.gridItem}>
						<TextField
							className={classes.gridItem}
							error={formik.touched.name && formik.errors.name ? true : null}
							id="name"
							name="name"
							label="Name"
							variant="outlined"
							helperText={
								formik.touched.name && formik.errors.name
									? formik.errors.name
									: null
							}
							{...formik.getFieldProps("name")}
						/>
					</Grid>
					<Grid item>
						<TextField
							className={classes.gridItem}
							error={formik.touched.email && formik.errors.email ? true : null}
							id="email"
							name="email"
							label="Email"
							placeholder="John@Doe.com"
							variant="outlined"
							helperText={
								formik.touched.email && formik.errors.email
									? formik.errors.email
									: null
							}
							{...formik.getFieldProps("email")}
						/>
					</Grid>
					<Grid item>
						<TextField
							className={classes.gridItem}
							error={formik.touched.city && formik.errors.city ? true : null}
							id="city"
							name="city"
							label="City"
							variant="outlined"
							helperText={
								formik.touched.city && formik.errors.city
									? formik.errors.city
									: null
							}
							{...formik.getFieldProps("city")}
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

export default AddMemberComp;
