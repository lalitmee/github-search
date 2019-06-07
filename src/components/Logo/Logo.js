import React from 'react';
import { Image } from 'semantic-ui-react';
import githubIcon from '../../images/github-icon.png';
import './Logo.css';

function Logo() {
  return <Image className="github-icon" src={githubIcon} />;
}

export default Logo;
