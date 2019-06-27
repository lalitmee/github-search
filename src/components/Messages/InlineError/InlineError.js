import PropTypes from 'prop-types';
import React from 'react';
import styles from './InlineError.module.css';

const InlineError = ({ text }) => (
  <span className={styles.errorMsg}>{text}</span>
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InlineError;
