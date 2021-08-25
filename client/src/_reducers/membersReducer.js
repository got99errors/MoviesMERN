import { membersConstants } from "../_constants/members.actions";

const initialState = { members: [], editedMember: null };

export function membersReducer(state = initialState, action) {
	switch (action.type) {
		case membersConstants.MEMBERS_REQUEST:
			return {
				fetchingMembers: true,
			};
		case membersConstants.MEMBERS_SUCCESS:
			return {
				fetchingMembers: false,
				members: action.members,
			};
		case membersConstants.MEMBERS_FAILURE:
			return {
				fetchingMembers: false,
			};
		case membersConstants.ADD_MEMBER_REQUEST:
			return {
				...state,
				fetchingMembers: true,
			};
		case membersConstants.ADD_MEMBER_SUCCESS:
			return {
				...state,
				fetchingMembers: false,
				members: action.members,
			};
		case membersConstants.ADD_MEMBER_FAILURE:
			return {
				...state,
				fetchingMembers: false,
			};
		case membersConstants.DELETE_MEMBER_REQUEST:
			return {
				...state,
				id: action.id,
				fetchingMembers: true,
			};
		case membersConstants.DELETE_MEMBER_SUCCESS:
			return {
				...state,
				fetchingMembers: false,
				members: action.members,
			};
		case membersConstants.DELETE_MEMBER_FAILURE:
			return {
				...state,
				fetchingMembers: false,
			};
		case membersConstants.UPDATE_MEMBER_REQUEST:
			return {
				...state,
				fetchingMembers: true,
			};
		case membersConstants.UPDATE_MEMBER_SUCCESS:
			return {
				...state,
				fetchingMembers: false,
				members: action.members,
			};
		case membersConstants.UPDATE_MEMBER_FAILURE:
			return {
				...state,
				fetchingMembers: false,
			};
		case membersConstants.EDIT_MEMBER:
			return {
				...state,
				editedMember: action.member,
			};
		case membersConstants.STOP_EDIT_MEMBER:
			return {
				...state,
			};
		case membersConstants.SUBSCRIPTION_REQUEST:
			return {
				...state,
				subscription: action.subscription,
			};
		case membersConstants.SUBSCRIPTION_SUCCESS:
			return {
				...state,
				members: action.members
			};
		case membersConstants.SUBSCRIPTION_FAILURE:
			return {
				...state
			};
		default:
			return state;
	}
}

export default membersReducer;
