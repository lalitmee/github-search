import React, { Component } from "react";
import { Header, Form, Dropdown } from "semantic-ui-react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResult from "./pages/SearchResult";
import RepoDetail from "./pages/RepoDetail";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={HomePage} />
          <Route path="/search_result/:word" component={SearchResult} />
          <Route path="/info/:name" component={RepoDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
