import InlineError from 'components/Messages/InlineError/InlineError';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import styles from './Search.module.css';

function Search(props) {
  const { onSubmit, onInputChange, query, errors } = props;
  return (
    <Form onSubmit={onSubmit}>
      <Grid centered>
        <Grid.Column width={10}>
          <Form.Field error={!!errors.query}>
            <Form.Input
              type="text"
              id="query"
              name="query"
              placeholder="Search for any query"
              value={query}
              onChange={onInputChange}
            />
            {errors.query ? <InlineError text={errors.query} /> : null}
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={2}>
          <Form.Field>
            <Form.Button primary type="submit" className={styles.formButton}>
              Search
            </Form.Button>
          </Form.Field>
        </Grid.Column>
      </Grid>
    </Form>
  );
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    query: PropTypes.string,
  }).isRequired,
};

export default Search;
