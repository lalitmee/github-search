import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header } from 'semantic-ui-react';
import getResult from '../../actions/index';
import Logo from '../../components/Logo/Logo';
import Search from '../../components/Search/Search';
import './MainPage.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      errors: {},
    };
  }

  /**
   * * taking the input text as query for the search
   */
  onInputChange = e => {
    this.setState({
      query: e.target.value,
    });
  };

  /**
   * * on pressing the enter or clicking the search button
   */
  onSubmit = () => {
    const { query } = this.state;
    const { history } = this.props;
    const errors = this.validate(query);
    this.setState({ errors });
    if (!errors.query) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.getResult(query);
      history.push(`/search_result/${query}`);
    }
  };

  validate = query => {
    const errors = {};
    errors.query = !query ? 'Query can not be empty' : null;
    return errors;
  };

  /**
   * * getting the search input for searching the repositories
   */
  onChange = (e, data) => {
    const repoName = data.value;
    const { history } = this.props;
    this.setState({
      query: repoName,
    });
    history.push(`/repo/${repoName}`);
  };

  render() {
    const { query, errors } = this.state;
    return (
      <Container>
        <Logo />
        <Header
          as="h1"
          textAlign="center"
          style={{
            padding: '20px',
          }}
        >
          GitHub Search
        </Header>
        <Grid>
          <Grid.Row>
            <Header
              as="h3"
              textAlign="center"
              style={{
                margin: '0 auto',
                padding: '20px',
              }}
            >
              Search Github Repositories by entering any name you can think of
              in the search input
            </Header>
          </Grid.Row>
        </Grid>
        <Grid centered columns={1}>
          <Grid.Column>
            <Search
              onSubmit={this.onSubmit}
              onInputChange={this.onInputChange}
              query={query}
              errors={errors}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

MainPage.propTypes = {
  getResult: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

MainPage.defaultProps = {
  history: null,
};

export default connect(
  null,
  {
    getResult,
  },
)(MainPage);
