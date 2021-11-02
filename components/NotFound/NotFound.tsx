import React from 'react';
import styles from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>404</p>
      <p className={styles.content}>User Not Found :(</p>
    </div>
  )
}
