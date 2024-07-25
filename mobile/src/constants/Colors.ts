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
  lightReverse: string;
  dark: string;
  darkReverse: string;
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
    lightReverse: '#000',
    darkReverse: '#fff',
    error: '#f23d4c',
    dark: '#000',
    text: '#07090a',
    text_gray: '#4d4d4d',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    icon: 'white',
    controlBackground: '#fff',
    border: '#999797',
    iconActive: '#1DB954',
    sheetBgColor: 'rgba(245, 245, 245, 1)',
    text_disabled:'#6e6e6e'
  },
  dark: {
    lightReverse: '#fff',
    darkReverse: '#000',
    success: '#2abf7c',
    text_disabled:'#7a7979',
    light: '#fff',
    error: '#f23d4c',
    dark: '#000',
    sheetBgColor: 'rgba(15, 15, 15, 1)',
    text: '#fff',
    text_gray: '#bfbfbf',
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
