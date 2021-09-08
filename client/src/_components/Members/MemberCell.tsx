import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Movie } from "../../BL/movie.utils";
import { MovieSubscription } from "../../BL/member.utils";
import { Link } from "react-router-dom";
import SubscriptionForm from "./MemberCellSubscriptionForm";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CellBottomButtonsComp from "../CellBottomButtons";
import { User, canCreateSubscription, canViewMovie, canDeleteSubscription, canUpdateSubscription} from '../../_domains/user'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexGrow: 1,
			overflow: "hidden",
			padding: theme.spacing(0, 1),
			listStyle: "none",
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		button: {
			marginBottom: theme.spacing(2),
			marginLeft: theme.spacing(1)
		},
		memberCell: {
			backgroundColor: "#CCC",
			borderRadius: 10,
			margin: `${theme.spacing(2)}px auto`,
			padding: theme.spacing(2),
		},
		listItem: {
			padding: 0,
			color: "#E38902",
			paddingLeft: "5px",
		},
		link: {
			textDecoration: "none",
			color: "#FF6C03",
		},
	})
);

const MemberCellComp = (props: any) => {
	const classes = useStyles();
	const member = props.member;
	const [displaySelectionBox, setDisplaySelectionBox] = useState(false);
	const allMovies = useSelector((state: any) => state.moviesReducer.movies);
	const user: User = props.user;

	// Remove movies the user has already subscribed to.
	const movies =
		allMovies !== undefined
			? allMovies.filter((movie: Movie) => {
					const subMovies = member.movies.map((subMovie: any) => subMovie.id);
					return !subMovies.includes(movie.id);
			  })
			: [];

	const dateString = (movie: MovieSubscription) => {
		return new Date(movie.date).toLocaleDateString("en-gb", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
	};

	return (
		<Container className={classes.root} maxWidth="sm">
			<Grid container className={classes.memberCell} justify="center">
				<Grid item style={{ width: "100%" }}>
					<Typography variant="h5" gutterBottom>
						<strong>{member.name}</strong>
					</Typography>
				</Grid>
				<Grid item style={{ width: "100%" }}>
					<Typography variant="subtitle1">
						<strong>Email:</strong> {member.email}
					</Typography>
				</Grid>
				<Grid item style={{ width: "100%" }}>
					<Typography variant="subtitle1">
						<strong>City:</strong> {member.city}
					</Typography>
				</Grid>
				<Grid
					item
					style={{
						width: "100%",
						backgroundColor: "#BBB",
					}}
				>
					<Typography
						style={{
							paddingLeft: "5px",
							margin: "5px",
						}}
						variant="subtitle1"
					>
						<strong>
							{member.movies.length > 0
								? "Movies Watched"
								: "[Haven't watched any movie yet]"}
						</strong>
					</Typography>
					{canCreateSubscription(user) && (
						<Button
							className={classes.button}
							color="primary"
							variant="contained"
							type="submit"
							name="subscribe"
							onClick={() => setDisplaySelectionBox(!displaySelectionBox)}
						>
							Subscribe to a movie
						</Button>
					)}
					{displaySelectionBox && <SubscriptionForm member={member} />}
					{member.movies.length > 0 && (
						<List
							style={{
								overflow: "auto",
								maxHeight: "120px",
								backgroundColor: "#DDD",
							}}
						>
							{member.movies.map((movie: any, index: number) => (
								<ListItem key={index} className={classes.listItem}>
									{canViewMovie(user) ? (
										<Link className={classes.link} to={`/movies/${movie.id}`}>
											<ListItemText style={{ paddingRight: "5px" }}>
												{movie && movie.title}
											</ListItemText>
										</Link>
									) : (
										<ListItemText style={{ paddingRight: "5px" }}>
											{movie && movie.title}
										</ListItemText>
									)}{" "}
									{movie && dateString(movie)}
								</ListItem>
							))}
						</List>
					)}
				</Grid>
				<Grid item style={{ width: "100%", marginTop: "10px" }}>
					<CellBottomButtonsComp
						canEdit={canUpdateSubscription(user)}
						canDelete={canDeleteSubscription(user)}
						edit={() => props.edit({ ...member })}
						delete={() => props.delete(member.id)}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default MemberCellComp;
