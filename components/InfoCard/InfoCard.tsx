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
import NotFound from "../NotFound/NotFound";
import Loader from "../Loader/Loader";

export default function InfoCard() {
  const gInput = useStore((state) => state.input);
  const { data, loading } = useQuery(GITHUB_USER_DATA, {
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
      login: newData.login,
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
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : user && user?.login ? (
        <>
          <div className={styles.avatar}>
            <div className={styles.avatarImage}>
              {user?.avatarUrl ? (
                <Image src={user?.avatarUrl} priority alt="User avatar" layout="fill" />
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
              <a
                href={`https://github.com/${user?.login}`}
                target="_blank"
                rel="noreferrer"
                className={styles.username}
              >
                @{user?.login}
              </a>
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
                  [styles.contactItem]: true,
                  [styles.unavailable]: !user?.location,
                })}
              >
                <MdLocationOn className={styles.icon} />
                <p>{user?.location || "Not available"}</p>
              </div>
              <div
                className={classNames({
                  [styles.contactItem]: true,
                  [styles.unavailable]: !user?.websiteUrl,
                })}
              >
                <MdLink className={styles.icon} />
                <a
                  className={classNames({
                    [styles.link]: user?.websiteUrl,
                  })}
                  href={
                    /^https*:\/\//.test(user?.websiteUrl)
                      ? user?.websiteUrl
                      : `https://${user?.websiteUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {user?.websiteUrl || "Not available"}
                </a>
              </div>
              <div
                className={classNames({
                  [styles.contactItem]: true,
                  [styles.unavailable]: !user?.twitterUsername,
                })}
              >
                <BsTwitter className={styles.icon} />
                <a
                  className={classNames({
                    [styles.link]: user?.twitterUsername,
                    [styles.unavailable]: !user?.twitterUsername,
                  })}
                  href={`https://twitter.com/${user?.twitterUsername}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user?.twitterUsername || "Not available"}
                </a>
              </div>
              <div
                className={classNames({
                  [styles.contactItem]: true,
                  [styles.unavailable]: !user?.company,
                })}
              >
                <BiBuildings className={styles.icon} />
                <p>{user?.company || "Not available"}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.notFound}>
          <NotFound />
        </div>
      )}
    </div>
  );
}
