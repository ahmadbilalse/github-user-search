import React from "react";
import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles["la-ball-clip-rotate-pulse"]}>
      <div></div>
      <div></div>
    </div>
  );
}
