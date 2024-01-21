import React from 'react';
import styles from './Header.module.css';
import { ReactComponent as AdmiralLogo } from './admiral.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <AdmiralLogo className={styles.logo}/>
      <span className={styles.lang}>ENG</span>
    </header>
  )
}
