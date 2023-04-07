import { ColorValue, StyleSheet } from 'react-native';
import type { ViewStyle, ImageStyle, TextStyle } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../constants';

type Style = {
  container: ViewStyle;
  userName: TextStyle;
  welcomeMessage: TextStyle;
  searchContainer: ViewStyle;
  searchWrapper: ViewStyle;
  searchInput: ViewStyle;
  searchBtn: ViewStyle;
  searchBtnImage: ViewStyle;
  tabsContainer: ViewStyle;
  tab: (color: ColorValue) => TextStyle;
  tabText: (color: ColorValue) => TextStyle;
};

const styles = StyleSheet.create<Style | any>({
  container: {
    width: '100%',
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    height: '100%',
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnImage: {
    width: '50%',
    height: '50%',
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: '100%',
    marginTop: SIZES.medium,
  },
  tab: (color: ColorValue): TextStyle => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: color,
  }),
  tabText: (color: ColorValue): TextStyle => ({
    fontFamily: FONT.medium,
    color: color,
  }),
});

export default styles;
