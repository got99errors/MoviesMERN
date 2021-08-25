import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Chip, Grid, Typography, Container } from "@material-ui/core";
import SubscriptionListComp from "./SubscriptionList";
import CellBottomButtonsComp from "../CellBottomButtons";
import { useCallback } from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexGrow: 1,
			padding: theme.spacing(0, 1),
		},
		chip: {
			margin: theme.spacing(0.5),
			backgroundColor: "orange",
		},
		movieCell: {
			backgroundColor: "#CCC",
			borderRadius: 10,
			margin: `${theme.spacing(2)}px auto`,
			padding: theme.spacing(2),
		},
		gridItem: {
			padding: theme.spacing(3, 0),
		},
		image: {
			textAlign: "center",
			display: "block",
			justifyContent: "right",
			alignItems: "right",
			margin: "auto",
			borderRadius: 5,
			height: "150px",
			// width: "auto",
			align: "right",
		},
		movieDetails: {
			justifyContent: "left",
			alignItems: "left",
			borderRadius: 5,
		},
	})
);

const MovieCellComp = (props: any) => {
	const classes = useStyles();
	const movie = props.movie;

	const onEdit = useCallback(() => props.edit({ ...movie }), [props]);
	const onDelete = useCallback(() => props.delete(movie.id), [props]);

	return (
		<Container className={classes.root} maxWidth="sm">
			<Grid container className={classes.movieCell} justify="center">
				<Grid item style={{ width: "100%" }}>
					<Typography align="center" variant="h5" gutterBottom>
						<strong>{movie.title}</strong> ({movie.year?.substring(0, 4)})
					</Typography>
				</Grid>
				<Grid item>
					{movie.genres.map((genre: string, index: number) => (
						<Chip
							size="small"
							className={classes.chip}
							key={index}
							label={genre}
						/>
					))}
				</Grid>
				<Grid item style={{ width: "100%" }} className={classes.gridItem}>
					<Grid container direction="row" justify="center" spacing={1}>
					{movie.image && <Grid item xs={3}>
							<img src={movie.image} alt="Loading..." className={classes.image} />
						</Grid>}
						<Grid
							item
							xs={7}
							style={{
								backgroundColor: "#CBA",
								overflow: "auto",
								padding: "5px 0",
								borderRadius: 5,
							}}
						>
							<Typography align="center" variant="subtitle1">
								<strong>Subscription Watched</strong>
								<Chip
									size="small"
									className={classes.chip}
									label={movie.subscriptions.length}
								/>
							</Typography>

							{movie.subscriptions.length === 0 && (
								<Typography
									align="center"
									variant="subtitle1"
									style={{ color: "grey" }}
								>
									[No subscribers yet]
								</Typography>
							)}
							<SubscriptionListComp
								subscriptions={movie.subscriptions}
								canViewSubscription={props.canViewSubscription}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item style={{ width: "100%" }}>
					<CellBottomButtonsComp
						canEdit={props.canUpdateMovie}
						canDelete={props.canDeleteMovie}
						edit={onEdit}
						delete={onDelete}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default MovieCellComp;
