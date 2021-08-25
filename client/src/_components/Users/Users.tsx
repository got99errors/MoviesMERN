import { useState, useEffect } from "react";
import { userActions } from "../../_actions/user.actions";
import { useDispatch } from "react-redux";
import UserCellComp from "./UserCell";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UsersComp = (props: any) => {
	const users = props.users
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [deleted, setDeleted] = useState(false);

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
			setDeleted(false)
		}
	},[users,deleted])

	const editUser = (user: any) => {
		dispatch(userActions.editUser(user))
	};

	const deleteUser = (id: string) => {
		setDeleted(true)
		dispatch(userActions.deleteUser(id));
	};

	return (
		<div>
			{users?.map((user: any) => (
				<UserCellComp
					key={user.id}
					user={user}
					edit={editUser}
					delete={deleteUser}
				/>
			))}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					Deleted user successfully!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default UsersComp;
