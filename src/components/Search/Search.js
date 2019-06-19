import PropTypes from 'prop-types';
import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import InlineError from '../Messages/InlineError/InlineError';

function Search(props) {
  const { onSubmit, onInputChange, query, errors } = props;
  return (
    <Segment
      style={{
        width: '600px',
        marginLeft: '23%',
      }}
    >
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
          <Form.Button
            primary
            type="submit"
            style={{
              margin: '0 auto',
              display: 'flex',
            }}
          >
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
