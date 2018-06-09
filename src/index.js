import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import rootReducer from "./reducers/index";

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(promise))
);

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById("root")
);
registerServiceWorker();
