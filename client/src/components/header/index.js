import styles from './index.module.css';
import { ReactComponent as Logo } from "./../../assets/logo.svg";
import React from 'react';

const Header = ({ text, mainInfo }) => {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <h1 className={styles.text}>{text}<br />
        <b>{mainInfo}</b>
      </h1>
    </header>
  );
}

export default Header;
