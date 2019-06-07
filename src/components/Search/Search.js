import PropTypes from 'prop-types';
import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

function Search(props) {
  const { onSubmit, onInputChange, query } = props;
  return (
    <Segment
      style={{
        width: '600px',
        marginLeft: '23%',
      }}
    >
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input
            width={13}
            label="Search For Any Name"
            type="text"
            id="query"
            name="query"
            placeholder="Search for any query"
            value={query}
            onChange={onInputChange}
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
  );
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Search;
