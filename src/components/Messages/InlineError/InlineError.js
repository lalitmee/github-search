import PropTypes from 'prop-types';
import React from 'react';

const InlineError = ({ text }) => <span className="error-msg">{text}</span>;

InlineError.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InlineError;
