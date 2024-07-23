/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export interface ThemeColors {
  text: string;
  text_gray: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  controlBackground: string;
  border: string;
  iconActive: string;
  sheetBgColor: string;
  light: string;
  dark: string;
  error: string;
  text_disabled: string;
  success: string;
}

// Định nghĩa interface cho đối tượng chứa cả hai theme (light và dark)
export interface ColorsInterface {
  light: ThemeColors;
  dark: ThemeColors;
}
export const Colors: ColorsInterface = {
  light: {
    success: '#2abf7c',
    light: '#fff',
    error: '#f23d4c',
    dark: '#000',
    text: '#11181C',
    text_gray: '#bfbfbf',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    icon: 'black',
    controlBackground: '#fff',
    border: '#999797',
    iconActive: '#1DB954',
    // sheetBgColor: '#2c2e2c',
    sheetBgColor: 'rgba(15, 15, 15, 1)',
    text_disabled:'#7a7979'
  },
  dark: {
    success: '#2abf7c',
    text_disabled:'#7a7979',
    light: '#fff',
    error: '#f23d4c',
    dark: '#000',
    sheetBgColor: 'rgba(15, 15, 15, 1)',
    // sheetBgColor: '#2c2e2c',
    text: '#fff',
    text_gray: '#bfbfbf',
    // background: '#17181a',
    background:'#080808',
    tint: tintColorDark,
    icon: '#fff',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    controlBackground: '#fff',
    border: '#999797',
    iconActive: '#00d158',
  },
};
