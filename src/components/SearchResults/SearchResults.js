import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Dimmer,
  Header,
  Loader,
  Pagination,
  Segment,
} from 'semantic-ui-react';
import * as actions from 'store/actions';
import SearchResult from './SearchResult/SearchResult';
import styles from './SearchResults.module.css';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      match: { params },
      getRepositories,
      getIssues,
      getUsers,
    } = this.props;
    getRepositories(params.query, params.page_number);
    getUsers(params.query, params.page_number);
    getIssues(params.query, params.page_number);
  }

  pageChangeHandler = (event, data) => {
    const {
      match: { params },
      getRepositories,
    } = this.props;
    const { history } = this.props;
    history.push(`/search_result/${params.query}/${data.activePage}`);
    getRepositories(params.query, data.activePage);
  };

  render() {
    const {
      match: { params },
      loading,
      repositories,
      totalRecords,
    } = this.props;

    let searchResultData = (
      <Container className={styles.loader}>
        <Segment className={styles.loaderSegment}>
          <Dimmer active inverted>
            <Loader inverted size="massive" inline="centered">
              Getting Results for {params.query}
            </Loader>
          </Dimmer>
        </Segment>
      </Container>
    );

    if (!loading) {
      searchResultData = (
        <div>
          {repositories.length ? (
            <SearchResult name="repositories" searchResult={repositories} />
          ) : null}
        </div>
      );
    }

    return (
      <div>
        <Container>
          <Header as="h1" className={styles.header}>
            Search Result For {params.query}
            <br />
            <Link to="/">
              <Button inverted color="orange" size="small">
                <p>Search Another</p>
              </Button>
            </Link>
          </Header>
        </Container>
        <Container>{searchResultData}</Container>
        {totalRecords > 20 ? (
          <Segment className={styles.paginatorSegment}>
            <Pagination
              className={styles.paginator}
              defaultActivePage={params.page_number}
              siblingRange={7}
              onPageChange={(event, data) =>
                this.pageChangeHandler(event, data)
              }
              totalPages={1000 / 20}
            />
          </Segment>
        ) : null}
      </div>
    );
  }
}

SearchResults.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      created_at: PropTypes.string,
    }),
  ).isRequired,
  history: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }),
  }),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  totalRecords: PropTypes.number.isRequired,
  getRepositories: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  history: null,
};

const mapStateToProps = state => {
  return {
    repositories: state.repositories.searchResult,
    totalRecords: state.repositories.totalRecords,
    loading: state.repositories.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRepositories: (query, page) =>
      dispatch(actions.getRepositoriesResult(query, page)),
    getIssues: (query, page) => dispatch(actions.getIssuesResult(query, page)),
    getUsers: (query, page) => dispatch(actions.getUsersResult(query, page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);
