import { membersConstants } from "../_constants/members.actions";
import { memberService } from "../BL/member.utils";
import { NewSubscription } from '../_domains/subscription'
import { Member, NewMember } from "../_domains/member";

export const memberActions = {
	getMembers,
	addMember,
	editMember,
	stopEditMember,
	deleteMember,
	updateMember,
	subscribeToMovie,
};

type ActionType = {
	type: string;
	id?: string;
	member?: NewMember;
	members?: Member[];
	error?: Error;
    subscription?: NewSubscription
};
type MoviesCallback = () => void;


function subscribeToMovie(subscription: NewSubscription, moviesCallback: MoviesCallback) {
	return (dispatch: DispatchType) => {
		dispatch(request(subscription));
		memberService.subscribeToMovie(subscription).then(
			(members) => {
				if (!members.error) {
					dispatch(success(members));
					// refresh movies to show latest subscriptons
					moviesCallback();
				} else {
					dispatch(failure(members));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(subscription: NewSubscription ): ActionType {
		return { type: membersConstants.SUBSCRIPTION_REQUEST, subscription };
	}
	function success(members: Member[]): ActionType {
		return { type: membersConstants.SUBSCRIPTION_SUCCESS, members };
	}
	function failure(error: Error): ActionType {
		return { type: membersConstants.SUBSCRIPTION_FAILURE, error };
	}
}

function editMember(member: Member) {
	return {
		type: membersConstants.EDIT_MEMBER,
		member: { id: member.id, title: member.name },
	};
}

function stopEditMember() {
	return { type: membersConstants.EDIT_MEMBER, action: null };
}

function getMembers() {
	return (dispatch: DispatchType) => {
		dispatch(request());
		memberService.getMembers().then(
			(members) => {
				if (!members.error) {
					dispatch(success(members));
				} else {
					dispatch(failure(members));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(): ActionType {
		return { type: membersConstants.MEMBERS_REQUEST };
	}
	function success(members: Member[]): ActionType {
		return { type: membersConstants.MEMBERS_SUCCESS, members };
	}
	function failure(error: Error): ActionType {
		return { type: membersConstants.MEMBERS_FAILURE, error };
	}
}

type DispatchType = (action: ActionType) => void;

function addMember(member: NewMember) {
	return (dispatch: DispatchType) => {
		dispatch(request(member));
		memberService.addMember(member).then(
			(members) => {
				if (!members.error) {
					dispatch(success(members));
				} else {
					dispatch(failure(members));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(member: Member): ActionType {
		return { type: membersConstants.ADD_MEMBER_REQUEST, member: member };
	}
	function success(members: Member[]): ActionType {
		return { type: membersConstants.ADD_MEMBER_SUCCESS, members };
	}
	function failure(error: Error): ActionType {
		return { type: membersConstants.ADD_MEMBER_FAILURE, error };
	}
}

function deleteMember(id: string, moviesCallback: MoviesCallback) {
	return (dispatch: DispatchType) => {
		dispatch(request(id));
		memberService.deleteMember(id).then(
			(members) => {
				if (!members.error) {
					dispatch(success(members));
					// refresh movies to show latest subscriptons
					moviesCallback();
				} else {
					dispatch(failure(members));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(id: string): ActionType {
		return { type: membersConstants.DELETE_MEMBER_REQUEST, id: id };
	}
	function success(members: Member[]): ActionType {
		return { type: membersConstants.DELETE_MEMBER_SUCCESS, members };
	}
	function failure(error: Error): ActionType {
		return { type: membersConstants.DELETE_MEMBER_FAILURE, error };
	}
}

function updateMember(member: Member) {
	return (dispatch: DispatchType) => {
		dispatch(request(member));
		memberService.updateMember(member).then(
			(members) => {
				if (!members.error) {
					dispatch(success(members));
				} else {
					dispatch(failure(members));
				}
			},
			(error) => {
				dispatch(failure(error.toString()));
			}
		);
	};

	function request(member: Member): ActionType {
		return { type: membersConstants.UPDATE_MEMBER_REQUEST, member: member };
	}
	function success(members: Member[]): ActionType {
		return { type: membersConstants.UPDATE_MEMBER_SUCCESS, members: members };
	}
	function failure(error: Error): ActionType {
		return { type: membersConstants.UPDATE_MEMBER_FAILURE, error };
	}
}
