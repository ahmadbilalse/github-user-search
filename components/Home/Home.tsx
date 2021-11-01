import React from "react";
import Head from "next/head";
import styles from "./Home.module.scss";
import { HiSun } from "react-icons/hi";
import SearchForm from "../SearchForm/SearchForm";
import InfoCard from "../InfoCard/InfoCard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Github User Search</title>
        <meta name="description" content="Github user search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.heading}>devFinder</h1>
          <button className={styles.themeSwitcher}>
            <p className={styles.themeText}>LIGHT</p>
            <HiSun className={styles.icon} />
          </button>
        </div>
        <div className={styles.searchForm}>
          <SearchForm />
        </div>
        <div className={styles.infoCard}>
          <InfoCard />
        </div>
      </main>
    </div>
  );
}
