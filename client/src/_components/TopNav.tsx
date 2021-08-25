import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { permissionConstants } from "../_constants/permissions.constants";
import { menuConstants} from "../_constants/menu.constants";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
// import { Box } from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: "#343A40",
			// flexGrow: 1,
			"& > * + *": {
				// marginLeft: theme.spacing(4),
				// marginTop: theme.spacing(8),
		// display: "flex",
		// flexDirection: "row",
		// justifyContent: 'center',
		// align: "center"
		// margin: "auto",
		
			},
			
		},link: {
			textTransform: "unset",
			color: "#a5a5a5",
			margin: "0 20px",
			textDecoration: "unset"
		},
		selectedLink: {
			textTransform: "unset",
			color: "#e5a5a5",
			margin: "0 20px",
			textDecoration: "unset"
		},
		nav: {
			backgroundColor: "#343A40",
			padding: "10px"
		}
	})
);

const TopNavComp = () => {
	let user = useSelector(
		(state: any) => state.authReducer.user
	);
	const menuSelection = useSelector((state: any) => state.menuReducer.selected)
	const classes = useStyles();
	console.log("TopNavComp user: %j",user);
	
	return (
		<nav className={classes.nav}>
			{user != undefined && user.permissions !== undefined && <Grid container justify="center" spacing={3}>
				{user.permissions.includes(permissionConstants.VIEW_MOVIE) && (
					<Grid item><Link className={menuSelection === menuConstants.MOVIES ? classes.selectedLink : classes.link} to="/movies">Movies</Link></Grid>
				)}{" "}
				{user.permissions.includes(permissionConstants.VIEW_SUB) && (
					<Grid item><Link className={menuSelection === menuConstants.SUBSCRIPTIONS ? classes.selectedLink : classes.link} to="/subscriptions">Subscriptions</Link></Grid>
				)}{" "}
				{user.username === "admin" && <Grid item><Link className={menuSelection === menuConstants.USERS ? classes.selectedLink : classes.link} to="/users">Users</Link></Grid>}{" "}
				<Grid item><Link className={classes.link} to="/logout">Logout</Link></Grid>
			</Grid>}
		</nav>
	);
};

export default TopNavComp;
