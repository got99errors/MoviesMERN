import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {memo} from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%", 
			marginTop: "10px"
		},
		gridItem: {
			width: "45%"
		},
		bottomButton: {
			width: "100%",
		},
	})
);

const CellBottomButtonsComp = memo((props: any) => {
	const classes = useStyles();

	return (
		<Grid
			container
			justify="space-evenly"
			className={classes.root}
		>
			<Grid item className={classes.gridItem}>
			{props.canEdit && (<Button
					color="primary"
					variant="contained"
					type="submit"
					name="edit"
					fullWidth
					onClick={()=>props.edit()}
					startIcon={<EditIcon />}
					className={classes.bottomButton}
				>
					Edit
				</Button>
			)}
			</Grid>
			<Grid item className={classes.gridItem}>
				{props.canDelete && (
					<Button
						color="secondary"
						variant="contained"
						type="submit"
						name="delete"
						fullWidth
						onClick={() => props.delete()}
						startIcon={<DeleteIcon />}
						className={classes.bottomButton}
					>
						Delete
					</Button>
				)}
			</Grid>
		</Grid>
	);
});

export default CellBottomButtonsComp;
