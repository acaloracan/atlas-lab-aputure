import {DefaultTheme} from 'react-native-paper';
import {COLORS} from '../utils/colors';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      [key: string]: string;
    }
  }
}

export const theme = {
  ...DefaultTheme,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    ...COLORS,
    // primary: '', // primary color for your app, usually your brand color.
    // accent: '', // secondary color for your app which complements the primary color.
    background: COLORS.background, // background color for pages, such as lists.
    // surface: '', // background color for elements containing content, such as cards.
    text: COLORS.text, // text color for content.
    // disabled: '', // color for disabled elements.
    // placeholder: '', // color for placeholder text, such as input placeholder.
    // backdrop: '', // color for backdrops of various components such as modals.
    // onSurface: '', // background color for snackbars
    // notification: '', // background color for badges
  },
};
