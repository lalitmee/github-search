import React, { Component } from "react";
import {
	Container,
	Header,
	Segment,
	Grid,
	Card,
	Image,
	Icon
} from "semantic-ui-react";

class RepoDetail extends Component {
	componentWillReceiveProps(newProps) {
		console.log(newProps);
	}
	render() {
		console.log(this.props.location.state);
		const { repoDetail } = this.props.location.state;
		return (
			<Container>
				<Header as="h1" textAlign="center" style={{ padding: "20px" }}>
					Repo Details: &nbsp;{" "}
					<a href={repoDetail.svn_url} target="_blank">
						{repoDetail.name}
					</a>
				</Header>
				<Segment>
					<Grid stackable doubling columns={2}>
						<Grid.Column width={13}>
							<Card.Group stackable doubling itemsPerRow={4}>
								<Card>
									<Card.Content>
										<Icon name="github" />
										<a
											href={repoDetail.svn_url}
											target="_blank"
										>
											{repoDetail.full_name}
										</a>
									</Card.Content>
								</Card>
								<Card>
									<Card.Content>
										<Icon name="eye" />
										<strong>Watchers: &nbsp;</strong>
										{repoDetail.watchers_count}
									</Card.Content>
								</Card>
								<Card>
									<Card.Content>
										<Icon name="star" />
										<strong>Stars: &nbsp;</strong>
										{repoDetail.stargazers_count}
									</Card.Content>
								</Card>
								<Card>
									<Card.Content>
										<Icon name="fork" />
										<strong>Forks: &nbsp;</strong>
										{repoDetail.forks_count}
									</Card.Content>
								</Card>
							</Card.Group>
							<Card.Group stackable doubling itemsPerRow={2}>
								<Card fluid>
									<Card.Content>
										<Icon name="book" />
										<strong>Description: &nbsp;</strong>
										{repoDetail.description}
									</Card.Content>
								</Card>
								<Card fluid>
									<Card.Content>
										<Icon name="code branch" />
										<strong>Default Branch: &nbsp;</strong>
										{repoDetail.default_branch}
									</Card.Content>
								</Card>
							</Card.Group>

							<Card.Group itemsPerRow={2}>
								<Card fluid>
									<Card.Content>
										<Icon name="git" />
										<strong>Git Url: &nbsp;</strong>
										<a
											href={repoDetail.git_url}
											target="_blank"
										>
											{repoDetail.git_url}
										</a>
									</Card.Content>
								</Card>
								<Card fluid>
									<Card.Content>
										<Icon name="clone" />
										<strong>Clone Url: &nbsp;</strong>
										<a
											href={repoDetail.clone_url}
											target="_blank"
										>
											{repoDetail.clone_url}
										</a>
									</Card.Content>
								</Card>
							</Card.Group>
						</Grid.Column>
						<Grid.Column width={3}>
							<Image src={repoDetail.owner.avatar_url} />
						</Grid.Column>
						<Grid.Column>
							<Card fluid>
								<Card.Content>
									<Icon name="users" />
									<strong>Contributors: &nbsp;</strong>
									<a
										href={repoDetail.contributors_url}
										target="_blank"
									>
										{repoDetail.contributors_url}
									</a>
								</Card.Content>
							</Card>
						</Grid.Column>
						<Grid.Column>
							<Card fluid>
								<Card.Content>
									<Icon name="fork" />
									<strong>Forkers: &nbsp;</strong>
									<a
										href={repoDetail.forks_url}
										target="_blank"
									>
										{repoDetail.forks_url}
									</a>
								</Card.Content>
							</Card>
						</Grid.Column>
						<Grid.Column width={16}>
							<Card.Group stackable doubling itemsPerRow={3}>
								<Card fluid>
									<Card.Content>
										<Icon name="time" />
										<strong>Created At: &nbsp;</strong>
										{repoDetail.created_at}
									</Card.Content>
								</Card>
								<Card fluid>
									<Card.Content>
										<Icon name="code" />
										<strong>Language: &nbsp;</strong>
										{repoDetail.language}
									</Card.Content>
								</Card>
								<Card fluid>
									<Card.Content>
										<Icon name="balance scale" />
										<strong>License: &nbsp;</strong>
										{!repoDetail.license
											? "None"
											: repoDetail.license.name}
									</Card.Content>
								</Card>
							</Card.Group>
						</Grid.Column>
					</Grid>
				</Segment>
			</Container>
		);
	}
}

export default RepoDetail;