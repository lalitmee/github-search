import loadingIcon from 'images/loading.gif';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';
import * as actions from 'store/actions/index';
import styles from './SearchResult.module.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forksI: true,
      starsI: true,
      watchersI: true,
      usernameI: true,
    };
  }

  componentDidMount() {
    const {
      match: { params },
      getSearchResult,
    } = this.props;
    getSearchResult(params.query);
  }

  /**
   * * For Sorting according to number of Forks
   */
  onClickForks = () => {
    const { searchResult } = this.props;
    const { forksI } = this.state;
    if (forksI) {
      this.setState({
        forksI: !forksI,
      });
      this.sortByKeyI(searchResult, 'forks_count');
    } else {
      this.setState({
        forksI: !forksI,
      });

      this.sortByKeyD(searchResult, 'forks_count');
    }
  };

  /**
   * * For Sorting according to number of Stars
   */
  onClickStars = () => {
    const { searchResult } = this.props;
    const { starsI } = this.state;
    if (starsI) {
      this.setState({
        starsI: !starsI,
      });
      this.sortByKeyI(searchResult, 'stargazers_count');
    } else {
      this.setState({
        starsI: !starsI,
      });

      this.sortByKeyD(searchResult, 'stargazers_count');
    }
  };

  /**
   * * For Sorting according to number of watchers
   */
  onClickWatchers = () => {
    const { searchResult } = this.props;
    const { watchersI } = this.state;
    if (watchersI) {
      this.setState({
        watchersI: !watchersI,
      });
      this.sortByKeyI(searchResult, 'watchers_count');
    } else {
      this.setState({
        watchersI: !watchersI,
      });
      this.sortByKeyD(searchResult, 'watchers_count');
    }
  };

  /**
   * * sorting according to usernames
   */
  onClickUsername = () => {
    const { searchResult } = this.props;
    const { usernameI, starsI } = this.state;
    if (usernameI) {
      this.setState({
        usernameI: !usernameI,
      });
      this.sortByKeyI(searchResult, 'login');
    } else {
      this.setState({
        usernameI: !starsI,
      });

      this.sortByKeyD(searchResult, 'login');
    }
  };

  /**
   * * sorting according to repository names
   */
  onClickRepoName = () => {
    const { searchResult } = this.props;
    const { reponame } = this.state;
    if (reponame) {
      this.setState({
        reponame: !reponame,
      });
      this.sortByKeyI(searchResult, 'name');
    } else {
      this.setState({
        reponame: !reponame,
      });

      this.sortByKeyD(searchResult, 'name');
    }
  };

  /**
   * * sorting order as increasing
   */
  sortByKeyI = (array, key) =>
    array.sort((a, b) => {
      let x;
      let y;
      if (b === 'login') {
        x = a.owner[key];
        y = b.owner[key];
      } else {
        x = a[key];
        y = b[key];
      }
      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

  /**
   * * sorting order as decreasing
   */
  sortByKeyD = (array, key) =>
    array.sort((a, b) => {
      let x;
      let y;
      if (b === 'login') {
        x = a.owner[key];
        y = b.owner[key];
      } else {
        x = a[key];
        y = b[key];
      }
      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

  render() {
    const {
      match: { params },
      loading,
      searchResult,
    } = this.props;

    const { forksI, watchersI, starsI, reponame, usernameI } = this.state;

    if (loading) {
      return (
        <Container textAlign="center">
          <Header as="h1" className={styles.header}>
            Fetching the Results
          </Header>
          <Image className={styles.image} src={loadingIcon} />
        </Container>
      );
    }
    return (
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
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <div className={styles.font25}>Sorting: &nbsp;</div>
              <Form.Button color="orange" onClick={this.onClickForks}>
                Forks({forksI ? 'Dec' : 'Inc'})
              </Form.Button>
              <Form.Button color="yellow" onClick={this.onClickWatchers}>
                Watchers({watchersI ? 'Dec' : 'Inc'})
              </Form.Button>
              <Form.Button color="green" onClick={this.onClickStars}>
                Stars({starsI ? 'Dec' : 'Inc'})
              </Form.Button>
              <Form.Button color="teal" onClick={this.onClickUsername}>
                Username({usernameI ? 'Dec' : 'Inc'})
              </Form.Button>

              <Form.Button color="teal" onClick={this.onClickRepoName}>
                Repo Name({reponame ? 'Dec' : 'Inc'})
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>
        <Card.Group stackable doubling itemsPerRow={3}>
          {searchResult &&
            searchResult.map(repo => (
              <Card color="green" key={repo.id}>
                <Card.Content>
                  <Card.Header>
                    <Link
                      to={{
                        pathname: `/info/${repo.name}`,
                        state: {
                          repoDetail: repo,
                        },
                      }}
                    >
                      {repo.name}
                    </Link>
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">
                      <strong>Created On: &nbsp;</strong> {repo.created_at}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    <strong>User Name: &nbsp;</strong>
                    {repo.owner.login}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Grid columns={3}>
                    <Grid.Row>
                      <Grid.Column>
                        <Icon name="eye" />
                        {repo.watchers_count}
                      </Grid.Column>
                      <Grid.Column>
                        <Icon name="star" />
                        {repo.stargazers_count}
                      </Grid.Column>
                      <Grid.Column>
                        <Icon name="fork" />
                        {repo.forks_count}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Container>
    );
  }
}

SearchResult.propTypes = {
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      created_at: PropTypes.string,
    }),
  ).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  getSearchResult: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    searchResult: state.searchResult,
    loading: state.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSearchResult: query => dispatch(actions.getResult(query)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResult);
