import { membersConstants } from '../_constants/members.actions';
import { memberService } from '../BL/utils';

export const memberActions = {
    getMembers,
    addMember,
    editMember,
    stopEditMember,
    deleteMember,
    updateMember,
    subscribeToMovie
}

function subscribeToMovie(subscription, moviesCallback) {
    return dispatch => {
        dispatch(request({ subscription }));
        memberService.subscribeToMovie(subscription)
            .then(
                members => { 
                    if (!members.error) {
                        dispatch(success(members));
                        // refresh movies to show latest subscriptons
                        moviesCallback();
                    } else {
                        dispatch(failure(members));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(subscription) { return { type: membersConstants.SUBSCRIPTION_REQUEST, subscription } }
    function success(members) { return { type: membersConstants.SUBSCRIPTION_SUCCESS, members } }
    function failure(error) { return { type: membersConstants.SUBSCRIPTION_FAILURE, error } }
}

function editMember(obj) {
    let member = {id: obj.id, title: obj.title};
    return {type: membersConstants.EDIT_MEMBER, member: member};
}

function stopEditMember() {
    return {type: membersConstants.EDIT_MEMBER, action: null}
}

function getMembers() {
    return dispatch => {
        dispatch(request({  }));
        memberService.getMembers()
            .then(
                members => { 
                    if (!members.error) {
                        dispatch(success(members));
                    } else {
                        dispatch(failure(members));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(members) { return { type: membersConstants.MEMBERS_REQUEST, members: members } }
    function success(members) { return { type: membersConstants.MEMBERS_SUCCESS, members } }
    function failure(error) { return { type: membersConstants.MEMBERS_FAILURE, error } }
}

function addMember(member) {
    return dispatch => {
        dispatch(request(member));
        memberService.addMember(member)
            .then(
                members => { 
                    if (!members.error) {
                        dispatch(success(members));
                    } else {
                        dispatch(failure(members));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(member) { return { type: membersConstants.ADD_MEMBER_REQUEST, member: member } }
    function success(members) { return { type: membersConstants.ADD_MEMBER_SUCCESS, members } }
    function failure(error) { return { type: membersConstants.ADD_MEMBER_FAILURE, error } }
}

function deleteMember(id, moviesCallback) {
    return dispatch => {
        dispatch(request(id));
        memberService.deleteMember(id)
            .then(
                members => { 
                    if (!members.error) {
                        dispatch(success(members));
                        // refresh movies to show latest subscriptons
                        moviesCallback()
                    } else {
                        dispatch(failure(members));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: membersConstants.DELETE_MEMBER_REQUEST, id: id } }
    function success(members) { return { type: membersConstants.DELETE_MEMBER_SUCCESS, members } }
    function failure(error) { return { type: membersConstants.DELETE_MEMBER_FAILURE, error } }
}


function updateMember(member) {
    return dispatch => {
        dispatch(request(member));
        memberService.updateMember(member)
            .then(
                members => { 
                    if (!members.error) {
                        dispatch(success(members));
                    } else {
                        dispatch(failure(members));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(member) { return { type: membersConstants.UPDATE_MEMBER_REQUEST, member: member } }
    function success(members) { return { type: membersConstants.UPDATE_MEMBER_SUCCESS, members: members } }
    function failure(error) { return { type: membersConstants.UPDATE_MEMBER_FAILURE, error } }
}