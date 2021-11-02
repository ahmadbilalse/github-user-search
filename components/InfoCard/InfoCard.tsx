import React from "react";
import styles from "./InfoCard.module.scss";
import Image from "next/image";
import { MdLocationOn, MdLink } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import { GITHUB_USER_DATA } from "../../utils/graphql";
import useStore, { GithubUser } from "../../state/store";
import classNames from "classnames";

export default function InfoCard() {
  const gInput = useStore((state) => state.input);
  const { data } = useQuery(GITHUB_USER_DATA, {
    variables: { login: gInput },
  });
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let newData = null;
  let user = null;
  if (data) {
    newData = data.user;
    user = {
      avatarUrl: newData.avatarUrl,
      bio: newData.bio,
      name: newData.name,
      login: `@${newData.login}`,
      createdAt: newData.createdAt,
      followerCount: newData.followers.totalCount,
      followingCount: newData.following.totalCount,
      location: newData.location,
      twitterUsername: newData.twitterUsername,
      repositoryCount: newData.repositories.totalCount,
      websiteUrl: newData.websiteUrl,
      company: newData.company,
    };

    const date = new Date(newData.createdAt);
    user.createdAt = `Joined at ${date.getDay()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <div className={styles.avatarImage}>
          {user?.avatarUrl ? (
            <Image src={user?.avatarUrl} alt="User avatar" layout="fill" />
          ) : null}
        </div>
        <div className={styles.avatarInfo}>
          <h2
            className={classNames({
              [styles.name]: true,
              [styles.unavailable]: !user?.name,
            })}
          >
            {user?.name || "[No Name]"}
          </h2>
          <h2 className={styles.username}>{user?.login}</h2>
          <p className={styles.joinDate}>{user?.createdAt}</p>
        </div>
      </div>
      <div className={styles.userDetail}>
        <p
          className={classNames({
            [styles.description]: true,
            [styles.unavailable]: !user?.bio,
          })}
        >
          {user?.bio || "This profile has no bio"}
        </p>
        <div className={styles.stats}>
          <div>
            <p>Repos</p>
            <p className={styles.statsNumber}>{user?.repositoryCount}</p>
          </div>
          <div>
            <p>Followers</p>
            <p className={styles.statsNumber}>{user?.followerCount}</p>
          </div>
          <div>
            <p>Following</p>
            <p className={styles.statsNumber}>{user?.followingCount}</p>
          </div>
        </div>
        <div className={styles.contacts}>
          <div
            className={classNames({
              [styles.unavailable]: !user?.location,
            })}
          >
            <MdLocationOn className={styles.icon} />
            <p>{user?.location || "Not available"}</p>
          </div>
          <div
            className={classNames({
              [styles.unavailable]: !user?.websiteUrl,
            })}
          >
            <MdLink className={styles.icon} />
            <p>{user?.websiteUrl || "Not available"}</p>
          </div>
          <div
            className={classNames({
              [styles.unavailable]: !user?.twitterUsername,
            })}
          >
            <BsTwitter className={styles.icon} />
            <p>{user?.twitterUsername || "Not available"}</p>
          </div>
          <div
            className={classNames({
              [styles.unavailable]: !user?.company,
            })}
          >
            <BiBuildings className={styles.icon} />
            <p>{user?.company || "Not available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
