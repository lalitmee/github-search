import { FETCH_DATA } from "../actions/types";

const dataReducer = (state = [{ isFetching: true }], action) => {
	switch (action.type) {
		case "FETCH_DATA":
			return [...state, { data: action.payload.data, isFetching: false }]; // Es6 Syntax
		//return action.payload.data;
		case "REQUEST_DATA":
			return [...state, { isFetching: true }];
		default:
			return state;
	}
};

export default dataReducer;
