
interface MemberMovie {
	id: string;
	title: string;
	date: string;
}

export type Member = {
	id: string;
	name: string;
	email: string;
	city: string;
	movies: MemberMovie[];
}

export type NewMember = Exclude<Member, "id">;