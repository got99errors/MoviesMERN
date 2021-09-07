import { handleResponse } from './utils'

const baseURL = process.env.REACT_APP_BASE_URL;

interface MemberMovie {
	id: string;
	title: string;
	date: string;
}

interface Member {
	id: string;
	name: string;
	email: string;
	city: string;
	movies: MemberMovie[];
}

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
	console.log(`url: ${baseURL}/members`);
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

export interface MovieSubscription {
	subId: string;
	movieId: string;
	date: string;
}

function subscribeToMovie(movieSubscription: MovieSubscription) {
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
