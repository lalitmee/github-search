import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepoDetail from './pages/RepoDetail';
import SearchResult from './pages/SearchResult';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={HomePage} />
          <Route path="/search_result/:query" component={SearchResult} />
          <Route path="/info/:name" component={RepoDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
