import React from 'react'
import styles from './Button.module.css';

export default function Button({children, onClick, disabled}) {
  return (
    <button onClick={onClick} disabled={disabled} className={disabled ? `${styles.btn} ${styles.disabled}` : `${styles.btn}`}>{children}</button>
  )
}
