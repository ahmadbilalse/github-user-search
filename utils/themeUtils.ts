interface ThemeType {
  dark: keyof typeof themeStyle,
  light: keyof typeof themeStyle,
}

export const themeType: ThemeType = {
  dark: 'dark',
  light: 'light',
}

export const themeStyle = {
  dark: {
    '--primary-color': '#0079FE',
    '--disabled-color': '#8E95A6',
    '--font-primary-color': '#EFF6FF',
    '--font-secondary-color': '#CCD6EF',
    '--background-color': '#141C2F',
    '--surface-color': '#1F2A48',
    '--on-primary-color': '#FFF',
  },
  light: {
    '--primary-color': '#0079FE',
    '--disabled-color': '#A5B6CD',
    '--font-primary-color': '#526B9D',
    '--font-secondary-color': '#3F3F47',
    '--background-color': '#F6F8FF',
    '--surface-color': '#FEFEFE',
    '--on-primary-color': '#FFF',
  },
}

export const applyTheme = (newTheme: keyof typeof themeStyle) => {
  Object.entries(themeStyle[newTheme]).forEach(
    ([key, value]) => document.documentElement.style.setProperty(key, value)
  );
}