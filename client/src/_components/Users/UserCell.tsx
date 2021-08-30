import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Container, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import CellBottomButtonsComp from "../CellBottomButtons";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexGrow: 1,
			overflow: "hidden",
			padding: theme.spacing(0, 1),
		},
		memberCell: {
			backgroundColor: "#CCC",
			borderRadius: 10,
			margin: `${theme.spacing(2)}px auto`,
			padding: theme.spacing(2),
		},
		chip: {
			margin: theme.spacing(0.5),
			backgroundColor: `${theme.palette.primary}`,
		},
		gridItem: {
			width: "100%"
		}
	})
);

const UserCellComp = (props: any) => {
	const classes = useStyles();
	const user = props.user;

	const dateString = () => {
		return new Date(user.created_date).toLocaleDateString("en-gb", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
	};
	return (
		<Container className={classes.root} maxWidth="sm">
			<Grid container className={classes.memberCell}>
				<Grid item className={classes.gridItem}>
					<Typography variant="subtitle1">
						<b>Name:</b> {user.first_name} {user.last_name}
					</Typography>
				</Grid>
				<Grid item className={classes.gridItem}>
					<Typography variant="subtitle1">
						<b>User Name:</b> {user.username}
					</Typography>
				</Grid>
				<Grid item className={classes.gridItem}>
					<Typography variant="subtitle1">
						<b>Session time out:</b> {user.session_timeout} minutes
					</Typography>
				</Grid>
				{user.username !== "admin" && (
					<Grid item className={classes.gridItem}>
						<Typography variant="subtitle1">
							<b>Created data: </b>
							{dateString()}
						</Typography>
					</Grid>
				)}
				<Grid item className={classes.gridItem}>
					<Typography variant="subtitle1">
						<b>Permissions:</b>{" "}
						{user.permissions.split(",").map((perm: string, index: number) => (
							<Chip
								size="small"
								className={classes.chip}
								key={index}
								label={perm}
							/>
						))}
					</Typography>
				</Grid>
				<Grid item className={classes.gridItem}>
					<CellBottomButtonsComp
						canDelete={user.username !== "admin"}
						canEdit
						edit={() => props.edit({ ...user })}
						delete={() => props.delete(user.id)}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default UserCellComp;
