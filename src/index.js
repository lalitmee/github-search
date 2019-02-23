import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import "./index.css";
import rootReducer from "./reducers/index";
import registerServiceWorker from "./registerServiceWorker";

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
