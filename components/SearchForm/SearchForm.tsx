import React, { useState } from "react";
import styles from "./SearchForm.module.scss";
import { BsSearch } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { useLazyQuery } from "@apollo/client";
import { GITHUB_USER_DATA } from "../../utils/graphql";

export default function SearchForm() {
  const [input, setInput] = useState("");
  const [getData, { loading, error, data }] = useLazyQuery(GITHUB_USER_DATA);

  const handleClick = () => {
    getData({
      variables: { login: input },
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <BsSearch className={styles.icon} />
      <input
        onChange={handleChange}
        value={input}
        placeholder="Search GitHub username..."
        className={styles.input}
        type="text"
      />
      {loading ? (
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
