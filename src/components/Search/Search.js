import InlineError from 'components/Messages/InlineError/InlineError';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import './Search.css';

function Search(props) {
  const { onSubmit, onInputChange, query, errors } = props;
  return (
    <Segment className="segment">
      <Form onSubmit={onSubmit}>
        <Form.Field error={!!errors.query}>
          <Form.Input
            label="Search"
            type="text"
            id="query"
            name="query"
            placeholder="Search for any query"
            value={query}
            onChange={onInputChange}
          />
          {errors.query ? <InlineError text={errors.query} /> : null}
        </Form.Field>
        <Form.Field>
          <Form.Button primary type="submit" className="form-button">
            Search
          </Form.Button>
        </Form.Field>
      </Form>
    </Segment>
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
