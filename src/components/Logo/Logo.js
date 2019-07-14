import githubIconImage from 'images/github-icon.png';
import React from 'react';
import { Image } from 'semantic-ui-react';
import styles from './Logo.module.css';

function Logo() {
  return <Image className={styles.githubIcon} src={githubIconImage} />;
}

export default Logo;
