import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Header, Image } from 'semantic-ui-react';
import styles from './SearchResult.module.css';

const SearchResult = ({ searchResult, name }) => {
  const searchResultData =
    searchResult &&
    searchResult.map(repo => (
      <Card key={repo.id}>
        <Card.Content>
          <Image floated="right" size="mini" src={repo.owner.avatar_url} />
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
          <Card.Description>{repo.description}</Card.Description>
        </Card.Content>
        {/* <Card.Content extra>
          <div className="ui two buttons">
            <Link
              to={{
                pathname: `/info/${repo.name}`,
                state: {
                  repoDetail: repo,
                },
              }}
            >
              <Button basic color="green">
                Details
              </Button>
            </Link>
            <Button basic color="red">
              Decline
            </Button>
          </div>
        </Card.Content> */}
      </Card>
    ));
  return (
    <Container>
      <Header className={styles.name}>{name}</Header>
      <Card.Group stackable doubling itemsPerRow={3}>
        {searchResultData}
      </Card.Group>
    </Container>
  );
};

SearchResult.propTypes = {
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      created_at: PropTypes.string,
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
};

SearchResult.defaultProps = {};

export default SearchResult;
