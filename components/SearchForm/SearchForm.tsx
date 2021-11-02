import React, { useEffect, useState } from "react";
import styles from "./SearchForm.module.scss";
import { BsSearch } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { useLazyQuery } from "@apollo/client";
import { GITHUB_USER_DATA } from "../../utils/graphql";
import useStore from "../../state/store";

export default function SearchForm() {
  const [input, setInput] = useState("");
  const [getData, { loading }] = useLazyQuery(GITHUB_USER_DATA);
  const gSetInput = useStore((state) => state.setInput);

  const handleClick = (e) => {
    e.preventDefault();
    getData({
      variables: { login: input },
    });
    gSetInput(input);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className={styles.container}>
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
    </form>
  );
}
