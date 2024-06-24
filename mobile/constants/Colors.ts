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
}

// Định nghĩa interface cho đối tượng chứa cả hai theme (light và dark)
export interface ColorsInterface {
  light: ThemeColors;
  dark: ThemeColors;
}
export const Colors: ColorsInterface = {
  light: {
    text: '#11181C',
    text_gray: '#bfbfbf',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    icon: 'black',
    controlBackground: '#fff',
    border: '#999797'
  },
  dark: {
    text: '#fff',
    text_gray: '#bfbfbf',
    // background: '#17181a',
    background:'#080808',
    tint: tintColorDark,
    icon: '#fff',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    controlBackground: '#fff',
    border: '#999797'
  },
};
