import React from "react";
import styles from "./ThemeSwitcher.module.scss";
import { HiSun } from "react-icons/hi";
import useStore from "../../state/store";
import { themeType } from "../../utils/themeUtils";

export default function ThemeSwitcher() {
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

  const handleClick = () => {
    if (theme === themeType.dark) {
      setTheme(themeType.light);
    } else {
      setTheme(themeType.dark);
    }
  };

  return (
    <div>
      <button onClick={handleClick} className={styles.themeSwitcher}>
        <p className={styles.themeText} suppressHydrationWarning>
          {theme === themeType.dark
            ? themeType.light.toUpperCase()
            : themeType.dark.toUpperCase()}
        </p>
        <HiSun className={styles.icon} />
      </button>
    </div>
  );
}
