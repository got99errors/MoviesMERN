import { menuConstants } from "../_constants/menu.constants";

const initialState = { selected: '' };


export function menuReducer(state = initialState, action) {
	switch (action.type) {
		case menuConstants.MOVIES:
			return {
				selected: menuConstants.MOVIES
			};
			case menuConstants.SUBSCRIPTIONS:
			return {
				selected: menuConstants.SUBSCRIPTIONS
			};
			case menuConstants.USERS:
			return {
				selected: menuConstants.USERS
			};
			case menuConstants.NON:
			return {
				selected: ''
			};
		default:
			return state;
	}
}

export default menuReducer;
