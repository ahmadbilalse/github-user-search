import React from "react";
import styles from "./InfoCard.module.scss";
import Image from "next/image";
import { MdLocationOn, MdLink } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";

export default function InfoCard() {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <div className={styles.avatarImage}>
          <Image
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="User avatar"
            layout="fill"
          />
        </div>
        <div className={styles.avatarInfo}>
          <h2 className={styles.name}>The Octocat</h2>
          <h2 className={styles.username}>@octocat</h2>
          <p className={styles.joinDate}>Joined 25 Jan 2011</p>
        </div>
      </div>
      <div className={styles.userDetail}>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
        tincidunt purus.
      </p>
      <div className={styles.stats}>
        <div>
          <p>Repos</p>
          <p className={styles.statsNumber}>8</p>
        </div>
        <div>
          <p>Followers</p>
          <p className={styles.statsNumber}>3938</p>
        </div>
        <div>
          <p>Following</p>
          <p className={styles.statsNumber}>9</p>
        </div>
      </div>
      <div className={styles.contacts}>
        <div>
          <MdLocationOn className={styles.icon} />
          <p>San Fransisco</p>
        </div>
        <div>
          <MdLink className={styles.icon} />
          <p>https://github.blog</p>
        </div>
        <div className={styles.unavailable}>
          <BsTwitter className={styles.icon} />
          <p>Not available</p>
        </div>
        <div>
          <BiBuildings className={styles.icon} />
          <p>@github</p>
        </div>
      </div>
      </div>
    </div>
  );
}
