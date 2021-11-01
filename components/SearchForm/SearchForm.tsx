import React, { useState } from "react";
import styles from "./SearchForm.module.scss";
import { BsSearch } from "react-icons/bs";
import Loader from "../Loader/Loader";

export default function SearchForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <BsSearch className={styles.icon} />
      <input
        placeholder="Search GitHub username..."
        className={styles.input}
        type="text"
      />
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <button onClick={handleClick} className={styles.button}>
          Search
        </button>
      )}
    </div>
  );
}
