import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	Container,
	Header,
	Card,
	Image,
	Button,
	Icon,
	Grid,
	Form,
	Segment
} from "semantic-ui-react";

class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			forksI: true,
			starsI: true,
			watchersI: true,
			usernameI: true
		};
		this.onClickForks = this.onClickForks.bind(this);
		this.onClickWatchers = this.onClickWatchers.bind(this);
		this.onClickStars = this.onClickStars.bind(this);
		this.onClickUsername = this.onClickUsername.bind(this);
	}

	sortByKeyI(array, key) {
		return array.sort(function(a, b) {
			if (b == "login") {
				var x = a.owner[key];
				var y = b.owner[key];
			} else {
				var x = a[key];
				var y = b[key];
			}
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}

	sortByKeyD(array, key) {
		return array.sort(function(a, b) {
			if (b == "login") {
				var x = a.owner[key];
				var y = b.owner[key];
			} else {
				var x = a[key];
				var y = b[key];
			}
			return x > y ? -1 : x < y ? 1 : 0;
		});
	}

	onClickForks = () => {
		if (this.state.forksI) {
			this.setState({
				forksI: !this.state.forksI
			});
			var sortedArray = this.sortByKeyI(
				this.props.search_result,
				"forks_count"
			);
		} else {
			this.setState({
				forksI: !this.state.forksI
			});

			var sortedArray = this.sortByKeyD(
				this.props.search_result,
				"forks_count"
			);
		}
	};

	onClickStars = () => {
		if (this.state.starsI) {
			this.setState({
				starsI: !this.state.starsI
			});
			var sortedArray = this.sortByKeyI(
				this.props.search_result,
				"stargazers_count"
			);
		} else {
			this.setState({
				starsI: !this.state.starsI
			});

			var sortedArray = this.sortByKeyD(
				this.props.search_result,
				"stargazers_count"
			);
		}
	};

	onClickWatchers = () => {
		if (this.state.watchersI) {
			this.setState({
				watchersI: !this.state.watchersI
			});
			var sortedArray = this.sortByKeyI(
				this.props.search_result,
				"watchers_count"
			);
		} else {
			this.setState({
				watchersI: !this.state.watchersI
			});
			var sortedArray = this.sortByKeyD(
				this.props.search_result,
				"watchers_count"
			);
		}
	};

	onClickUsername = () => {
		if (this.state.usernameI) {
			this.setState({
				usernameI: !this.state.usernameI
			});
			var sortedArray = this.sortByKeyI(
				this.props.search_result,
				"login"
			);
		} else {
			this.setState({
				usernameI: !this.state.starsI
			});

			var sortedArray = this.sortByKeyD(
				this.props.search_result,
				"login"
			);
		}
	};

	onClickRepoName = () => {
		if (this.state.reponame) {
			this.setState({
				reponame: !this.state.reponame
			});
			var sortedArray = this.sortByKeyI(this.props.search_result, "name");
		} else {
			this.setState({
				reponame: !this.state.reponame
			});

			var sortedArray = this.sortByKeyD(this.props.search_result, "name");
		}
	};

	render() {
		const { params } = this.props.match;

		const { forksI, starsI, watchersI, usernameI, reponame } = this.state;

		if (this.props.isFetching && !this.props.search_result.length) {
			return (
				<Container textAlign="center">
					<Header as="h1" style={{ padding: "20px" }}>
						Fetching the Results
					</Header>
					<Image
						style={{ display: "block", margin: "0 auto" }}
						src="https://media2.giphy.com/media/y1ZBcOGOOtlpC/200.gif"
					/>
				</Container>
			);
		} else {
			return (
				<Container>
					<Header as="h1" style={{ padding: "20px" }}>
						Search Result For {params.word}
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
								<label style={{ fontSize: "25px" }}>
									Sorting: &nbsp;
								</label>
								<Form.Button
									color="orange"
									onClick={this.onClickForks}
								>
									Forks({this.state.forksI ? "Dec" : "Inc"})
								</Form.Button>
								<Form.Button
									color="yellow"
									onClick={this.onClickWatchers}
								>
									Watchers({this.state.watchersI
										? "Dec"
										: "Inc"})
								</Form.Button>
								<Form.Button
									color="green"
									onClick={this.onClickStars}
								>
									Stars({this.state.starsI ? "Dec" : "Inc"})
								</Form.Button>
								<Form.Button
									color="teal"
									onClick={this.onClickUsername}
								>
									Username({this.state.usernameI
										? "Dec"
										: "Inc"})
								</Form.Button>

								<Form.Button
									color="teal"
									onClick={this.onClickRepoName}
								>
									Repo Name({this.state.reponame
										? "Dec"
										: "Inc"})
								</Form.Button>
							</Form.Group>
						</Form>
					</Segment>
					<Card.Group stackable doubling itemsPerRow={3}>
						{this.props.search_result.length != 0 &&
							this.props.search_result.map(repo => (
								<Card color="green" key={repo.id}>
									{/*	<Image src={repo.owner.avatar_url} /> */}
									<Card.Content>
										<Card.Header>
											<Link
												to={{
													pathname: `/info/${
														repo.name
													}`,
													state: {
														repoDetail: repo
													}
												}}
											>
												{repo.name}
											</Link>
										</Card.Header>
										<Card.Meta>
											<span className="date">
												<strong>
													Created On: &nbsp;
												</strong>{" "}
												{repo.created_at}
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
													<a>
														<Icon name="eye" />
														{repo.watchers_count}
													</a>
												</Grid.Column>
												<Grid.Column>
													<a>
														<Icon name="star" />
														{repo.stargazers_count}
													</a>
												</Grid.Column>
												<Grid.Column>
													<a>
														<Icon name="fork" />
														{repo.forks_count}
													</a>
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
}

function mapStateToProps(state) {
	console.log(state);
	if (state.dataReducer.length > 0) {
		var count = state.dataReducer.length;
		if (state.dataReducer[count - 1].isFetching == false) {
			return {
				search_result: state.dataReducer[count - 1].data.items,
				isFetching: state.dataReducer[count - 1].isFetching
			};
		} else {
			return {
				search_result: [],
				isFetching: state.dataReducer[count - 1].isFetching
			};
		}
	} else {
		return {
			search_result: [],
			isFetching: true
		};
	}
}

export default connect(mapStateToProps)(SearchResult);
