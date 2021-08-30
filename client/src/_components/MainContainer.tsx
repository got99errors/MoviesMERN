import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginComp from "./Login";
import LogoutComp from "./Logout";
import IndexComp from "./Index";
import { PrivateRoute } from "../_components/PrivateRoute";
import UserContainerComp from "./Users/UsersContainer";
import MoviesComp from "./Movies/MoviesContainer";
import MembersComp from "./Members/MembersContainer";
import { userActions } from "../_actions/user.actions";
import { movieActions } from "../_actions/movies.actions";
import { memberActions } from "../_actions/members.actions";
import SignupComp from "./Signup";
import HeaderComp from "./Header";
import {
	makeStyles,
	Theme,
} from "@material-ui/core/styles";
import theme from "../theme";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: "transparent",
	},
}));

const MainContainerComp = () => {
	const classes = useStyles(theme);
	const dispatch = useDispatch();
	let user = useSelector((state: any) => state.authReducer.user);

	useEffect(() => {
		if (user) {
			// setup logout timer
			const millisecondsLeft =
				new Date().setTime(Number(localStorage.getItem("session_timeout"))) -
				new Date().getTime();
			let timeoutID = setTimeout(() => {
				dispatch(userActions.logout());
			}, millisecondsLeft);
			return () => {
				clearTimeout(timeoutID);
			};
		}
	}, [user, dispatch]);

	useEffect(() => {
		dispatch(userActions.getUsers());
		dispatch(movieActions.getMovies());
		dispatch(memberActions.getMembers());
	}, [dispatch]);
	
	const hasUser = localStorage.getItem("user") != null;

	return (
		<div className={classes.root}>
			<HeaderComp />

			<Switch>
				<PrivateRoute exact path="/" component={IndexComp} />
				<PrivateRoute exact path="/index" component={IndexComp} />
				{!hasUser && <Route path="/create_account" component={SignupComp} />}
				{!hasUser && <Route path="/login" component={LoginComp} />}
				<PrivateRoute exact path="/movies" component={MoviesComp} />
				<PrivateRoute path="/movies/:movieId" component={MoviesComp} />
				<PrivateRoute exact path="/subscriptions" component={MembersComp} />
				<PrivateRoute path="/subscriptions/:memberId" component={MembersComp} />
				{user && user.username === "admin" && (
					<PrivateRoute path="/users" component={UserContainerComp} />
				)}
				<Route path="/logout" component={LogoutComp} />
			</Switch>
			{/* </Router> */}
		</div>
	);
};

export default MainContainerComp;
