import React from 'react';
import styles from './SearchForm.module.scss';
import { BsSearch } from 'react-icons/bs';

export default function SearchForm() {
  return (
    <div className={styles.container}>
      <BsSearch className={styles.icon} />
      <input placeholder="Search GitHub username..." className={styles.input} type="text" />
      <button className={styles.button}>Search</button>
    </div>
  )
}
