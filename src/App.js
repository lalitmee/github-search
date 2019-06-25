import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RepoDetail from 'components/RepoDetail/RepoDetail';
import SearchResult from 'components/SearchResult/SearchResult';
import MainPage from 'containers/MainPage/MainPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={MainPage} />
          <Route path="/search_result/:query" component={SearchResult} />
          <Route path="/info/:name" component={RepoDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
