import { permissionConstants } from "../_constants/permissions.constants";

export type User = {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	created_date: Date | null;
	session_timeout: number;
	permissions: string[];
};

export const isAdmin = (user: User) => {
    return user.username === "admin"
}

export const canViewMovie = (user: User) => {
	return hasPermission(user, permissionConstants.VIEW_MOVIE);
};

export const canCreateMovie = (user: User) => {
    return hasPermission(user, permissionConstants.CREATE_MOVIE);
}

export const canUpdateMovie = (user: User) => {
	return hasPermission(user, permissionConstants.UPDATE_MOVIE);
};

export const canDeleteMovie = (user: User) => {
	return hasPermission(user, permissionConstants.DELETE_MOVIE);
};

export const canViewSubscription = (user: User) => {
	return hasPermission(user, permissionConstants.VIEW_SUB);
};

export const canCreateSubscription = (user: User) => {
    return hasPermission(user, permissionConstants.CREATE_SUB);
}

export const canUpdateSubscription = (user: User) => {
	return hasPermission(user, permissionConstants.UPDATE_SUB);
};

export const canDeleteSubscription = (user: User) => {
    return hasPermission(user, permissionConstants.DELETE_SUB)
}

const hasPermission = (user: User, permissionTitle: string) => {
	return user.permissions.includes(permissionTitle);
};
