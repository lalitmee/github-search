import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Container,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import SweetAlert from 'sweetalert2-react';
import getResult from '../actions/index';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      noResult: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
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
    const { getResult, history } = this.props;
    if (query === '' || query === undefined) {
      this.setState({
        noResult: true,
      });
      return;
    }
    getResult(query);
    history.push(`/search_result/${query}`);
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
    const { query, noResult } = this.state;
    if (noResult) {
      return (
        <SweetAlert
          show={noResult}
          type="warning"
          title="Search String Not Found"
          text="Please enter any search string to search"
          onConfirm={() =>
            this.setState({
              noResult: false,
            })
          }
        />
      );
    }
    return (
      <Container>
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
            <Card fluid>
              <Card.Content
                style={{
                  fontSize: '20px',
                  textAlign: 'center',
                }}
              >
                Search Github Repositories by entering any name you can think of
                in the search input
              </Card.Content>
            </Card>
          </Grid.Row>
        </Grid>
        <Grid centered columns={1}>
          <Grid.Column>
            <Segment
              style={{
                width: '600px',
                marginLeft: '23%',
              }}
            >
              <Form onSubmit={this.onSubmit}>
                <Form.Group>
                  <Form.Input
                    width={13}
                    label="Search For Any Name"
                    type="text"
                    id="query"
                    name="query"
                    placeholder="Search for any query"
                    value={query}
                    onChange={this.onInputChange}
                  />
                  <Form.Button
                    primary
                    width={3}
                    type="submit"
                    style={{
                      marginTop: '24px',
                    }}
                  >
                    Search
                  </Form.Button>
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

HomePage.propTypes = {
  getResult: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

HomePage.defaultProps = {
  history: null,
};

export default connect(
  null,
  {
    getResult,
  },
)(HomePage);
