import React from "react";
import { FaGithub } from "react-icons/fa";
import styles from './GithubLink.module.scss'

export default function GithubLink() {
  return (
    <div className={styles.container}>
      <a
        href="https://github.com/ahmadbilalse/github-user-search"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub className={styles.icon} />
        View on GitHub
      </a>
    </div>
  );
}
