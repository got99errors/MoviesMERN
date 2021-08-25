import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexGrow: 1,
			padding: theme.spacing(0, 1)
		},
		listItem: {
			padding: "0px",
			color: "#E38902",
			textAlign: "center",
			paddingLeft: "10px"
		},
		link: {
			textDecoration: "none",
			color: "#FF6C03"
		}
	})
);

const SubscriptionListComp = (props: any) => {
	const classes = useStyles();


	const getSubscriptionDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-gb", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
	};
	return (
		<List style={{overflow: "auto", maxHeight: "120px"}}>
									{props.subscriptions.map((sub: any, index: number) => (
										<ListItem key={index} alignItems="center"
										className={classes.listItem}>
											{props.canViewSubscription ? (
												<Link className={classes.link} to={`/subscriptions/${sub.MemberId}`}>
													<ListItemText>{sub.Name}</ListItemText>
												</Link>
											) : (
												<ListItemText>{sub.Name}</ListItemText>
											)}
											<ListItemText>{" "+getSubscriptionDate(sub.WatchDate)}</ListItemText>
										</ListItem>
									))}
								</List>
	);
}

export default SubscriptionListComp;
