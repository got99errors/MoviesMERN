import { userService } from "./user.utils";

export function handleResponse(response: Response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				userService.logout();
				// location.reload(true);
			}
			const error =
				(data && data.message && !data.error) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}