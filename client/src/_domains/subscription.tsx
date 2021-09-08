export interface MovieSubscription {
	subId: string;
	movieId: string;
	date: string;
}
export type NewSubscription = {
	subId: string;
	movieId: string;
    date: Date | undefined
};