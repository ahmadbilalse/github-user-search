import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import styles from "./SearchForm.module.scss";
import { BsSearch } from "react-icons/bs";
import { useLazyQuery } from "@apollo/client";
import { GITHUB_USER_DATA } from "../../utils/graphql";
import useStore from "../../state/store";

export default function SearchForm() {
  const [input, setInput] = useState("");
  const [getData, { loading }] = useLazyQuery(GITHUB_USER_DATA);
  const gSetInput = useStore((state) => state.setInput);
  const inputEl = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    getData({
      variables: { login: input },
    });
    gSetInput(input);
  };

  const handleClear = (e: SyntheticEvent) => {
    setInput("");
    if (inputEl.current) {
      inputEl.current.focus();
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    setInput((e.target as HTMLInputElement).value);
  };

  return (
    <form className={styles.container}>
      <BsSearch className={styles.icon} />
      <input
        ref={inputEl}
        onChange={handleChange}
        value={input}
        placeholder="Search GitHub username..."
        className={styles.input}
        type="text"
      />
      {loading ? null : (
        <>
          {input ? (
            <div onClick={handleClear} className={styles.clearButton}>
              &#215;
            </div>
          ) : null}
          <button onClick={handleSubmit} className={styles.button}>
            Search
          </button>
        </>
      )}
    </form>
  );
}
