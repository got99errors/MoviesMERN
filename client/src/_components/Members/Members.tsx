import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { memberActions } from "../../_actions/members.actions";
import { movieActions } from "../../_actions/movies.actions";
import { useDispatch, useSelector } from "react-redux";
import MemberCellComp from "./MemberCell";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MembersComp = (props: any) => {
	const members = props.members;
	let filteredMembers = members;
	const dispatch = useDispatch();
	let { memberId } = useParams<{ memberId: string }>();
	const [open, setOpen] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const user = useSelector((state: any) => state.authReducer.user);

	// display selected member if there is any
	if (
		memberId !== undefined &&
		props.members !== undefined &&
		props.members.length > 0
	) {
		filteredMembers = props.members.filter(
			(member: any) => member.id === memberId
		);
	}

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		if (deleted) {
			handleClick();
			setDeleted(false);
		}
	}, [filteredMembers, deleted]);

	const editMember = (member: any) => {
		dispatch(memberActions.editMember(member));
	};

	const deleteMember = (id: string) => {
		setDeleted(true);
		dispatch(
			memberActions.deleteMember(id, () => dispatch(movieActions.getMovies()))
		);
	};

	return (
		<>
			{filteredMembers?.map((member: any, index: number) => (
				<MemberCellComp
					key={index}
					member={member}
					user={user}
					edit={editMember}
					delete={deleteMember}
				/>
			))}

			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					Deleted member successfully!
				</Alert>
			</Snackbar>
		</>
	);
};

export default MembersComp;
