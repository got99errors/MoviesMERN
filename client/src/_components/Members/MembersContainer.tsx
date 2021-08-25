import { useEffect, useState } from "react";
import MembersComp from "./Members";
import AddMemberComp from "./AddMember";
import { Tab, Tabs, AppBar, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { memberActions } from "../../_actions/members.actions";
import { menuActions } from '../../_actions/menu.actions'
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import {permissionConstants} from '../../_constants/permissions.constants'

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
			{value === index && <div>{children}</div>}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const MemberContainerComp = (props: any) => {
	const [value, setValue] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const dispatch = useDispatch();
	const editedMember = useSelector(
		(state: any) => state.membersReducer.editedMember
	);
	const members = useSelector((state: any) => state.membersReducer.members);
	const user = useSelector((state: any) => state.authReducer.user)
	const canCreateMember = user.permissions.includes(permissionConstants.CREATE_SUB);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const addedSuccessfully = () => {
		dispatch(memberActions.stopEditMember());
		setValue(0);
	};

	useEffect(() => {
		dispatch(menuActions.selectedSubscriptions())
	}, [dispatch]);

	useEffect(() => {
		addedSuccessfully();
		console.log("MembersCont useEff[props]");
		
	}, [props]);

	return (
		<div>
			{(editedMember === null || editedMember === undefined) && (
				<Box>
					<AppBar position="static">
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="simple tabs example"
							centered
						>
							<Tab label="All Members" {...a11yProps(0)} />
							{canCreateMember && <Tab label="Add Member" {...a11yProps(1)} />}
						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0}>
						<MembersComp members={members} search={searchValue} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<AddMemberComp
							members={members}
							addedSuccessfully={addedSuccessfully}
						/>
					</TabPanel>
				</Box>
			)}
			{editedMember !== null && editedMember !== undefined && (
				<AddMemberComp
					members={members}
					editedMember={{ ...editedMember }}
					addedSuccessfully={addedSuccessfully}
				/>
			)}
		</div>
	);
};
export default MemberContainerComp;
