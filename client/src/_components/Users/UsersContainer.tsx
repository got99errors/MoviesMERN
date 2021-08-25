import { useEffect, useState } from "react";
import UsersComp from "./Users";
import AddUserComp from "./AddUser";
import { Tab, Tabs, AppBar, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../_actions/user.actions";
import { menuActions } from '../../_actions/menu.actions'

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<div>{children}</div>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const UserContainerComp = (props: any) => {
	const [value, setValue] = useState(0);
	const dispatch = useDispatch();
	const editedUser = useSelector((state: any) => state.usersReducer.editedUser);
	// console.log("editedUser: %j", editedUser);
	const users = useSelector((state: any) => state.usersReducer.users);
	
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const addedSuccessfully = () => {
		dispatch(userActions.stopEditUser());
		setValue(0);
	};

	useEffect(() => {
		// load users
		// dispatch(userActions.getUsers());
		dispatch(menuActions.selectedUsers())
	},[dispatch]);

	useEffect(() => {
		addedSuccessfully()
	}, [props]);

	return (
		<div>
			{(editedUser === null || editedUser === undefined) && (
				<Box>
					<AppBar position="static">
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="simple tabs example"
							centered
						>
							<Tab label="All Users" {...a11yProps(0)} />
							<Tab label="Add User" {...a11yProps(1)} />
						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0}>
						<UsersComp users={users} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<AddUserComp users={users} addedSuccessfully={addedSuccessfully} />
					</TabPanel>
				</Box>
			)}
			{editedUser !== null && editedUser !== undefined && (
				<AddUserComp
					users={users}
					editedUser={{...editedUser}}
					addedSuccessfully={addedSuccessfully}
				/>
			)}
		</div>
	);
};
export default UserContainerComp;
