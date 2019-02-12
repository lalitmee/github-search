import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Container,
  Form,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';
import SweetAlert from 'sweetalert2-react';
import { fetchResult } from '../actions/index';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      query: '',
      loading: false,
      noResult: false,
      options: []
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange = e => {
    this.setState({
      word: e.target.value
    });
  };

  onSubmit = () => {
    if (this.state.word == '' || this.state.word == undefined) {
      this.setState({
        noResult: true
      });
      return;
    }
    this.props.fetchResult(this.state.word);
    this.props.history.push(`/search_result/${this.state.word}`);
  };

  // onSearchChange = (e, data) => {
  // 	clearTimeout(this.timer);
  // 	this.setState({
  // 		query: data.searchQuery
  // 	});
  // 	this.timer = setTimeout(this.fetchData, 1000);
  // };

  /**
   * getting the search input for searching the repositories
   */
  onChange = (e, data) => {
    const repoName = data.value;
    this.setState({
      query: repoName
    });
    this.props.history.push(`/repo/${repoName}`);
  };

  // fetchData = () => {
  // 	if (!this.state.query) return;
  // 	this.setState({ loading: true });
  // 	this.props
  // 		.fetchResult(this.state.query)
  // 		.then(response => response.payload.data.items)
  // 		.then(items => {
  // 			// console.log(data);
  // 			const options = [];
  // 			items.forEach(repo => {
  // 				options.push({
  // 					key: repo.id,
  // 					value: repo.name,
  // 					text: repo.name,
  // 					repo_id: repo.id
  // 				});
  // 			});
  // 			this.setState({ loading: false, options });
  // 		});
  // };
  render() {
    const { word } = this.state;
    if (this.state.noResult) {
      return (
        <SweetAlert
          show={this.state.noResult}
          type="warning"
          title="Search String Not Found"
          text="Please enter any search string to search"
          onConfirm={() =>
            this.setState({
              noResult: false
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
            padding: '20px'
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
                  textAlign: 'center'
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
                marginLeft: '23%'
              }}
            >
              <Form onSubmit={this.onSubmit}>
                <Form.Group>
                  <Form.Input
                    width={13}
                    label="Search For Any Name"
                    type="text"
                    id="word"
                    name="word"
                    placeholder="Search for any word"
                    value={word}
                    onChange={this.onInputChange}
                  />
                  <Form.Button
                    primary
                    width={3}
                    type="submit"
                    style={{
                      marginTop: '24px'
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
  fetchResult: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    fetchResult
  }
)(HomePage);
