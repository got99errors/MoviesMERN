import React from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TopNavComp from "./TopNav";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	appBar: {
		backgroundColor: "#343A40",
		height: "50px",
		"& .MuiToolbar-regular": {
			minHeight: "50px",
		},
	},
	subAppBar: {
		backgroundColor: "#143A40",
		height: "50px",
		"& .MuiToolbar-regular": {
			minHeight: "50px",
		},
	},
	name: {
		marginRight: "15px",
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function HeaderComp() {
	let classes = useStyles();
	let user = useSelector((state: any) => state.authReducer.user);

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<strong>Subscriberz</strong>
				</Typography>
				<Typography variant="subtitle2">
					Hello {user && user !== undefined ? user.details.first_name : "Guest"}!
				</Typography>
			</Toolbar>
			<TopNavComp />
		</AppBar>
	);
}
