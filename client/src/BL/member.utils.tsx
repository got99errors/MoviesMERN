import { handleResponse } from './utils'
import { Member } from '../_domains/member'
import { NewSubscription } from '../_domains/subscription';

const baseURL = process.env.REACT_APP_BASE_URL;


export const memberService = {
	getMembers,
	addMember,
	deleteMember,
	updateMember,
	subscribeToMovie,
};

function getMembers() {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};
	
	return fetch(`${baseURL}/members`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

function addMember(member: Member) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ member }),
	};

	return fetch(`${baseURL}/members/add_member`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

function deleteMember(id: string) {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	return fetch(`${baseURL}/members/delete/${id}`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

function updateMember(member: Member) {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ member }),
	};

	return fetch(`${baseURL}/members/update_member`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}

function subscribeToMovie(movieSubscription: NewSubscription) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ movieSubscription }),
	};
	return fetch(`${baseURL}/members/subscribeToMovie`, requestOptions)
		.then(handleResponse)
		.then((members) => {
			return members;
		});
}
