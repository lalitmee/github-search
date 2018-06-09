import { combineReducers } from "redux";

import dataReducer from "./dataReducer";

const rootReducer = combineReducers({
	dataReducer: dataReducer
});

export default rootReducer;
