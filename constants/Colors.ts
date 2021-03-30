import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

export default {
  light: {
    dark: false,
    Text: {
      style: [
        {
          color: '#393e46',
          fontFamily: 'Poppins-Light',
          fontSize: 16,
        },
      ],
    },
    Button: {
      titleStyle: [{ fontFamily: 'Poppins-Light', paddingTop: 5 }],
    },
    colors: {
      ...DefaultTheme.colors,
      primary: '#2866ab',
      secondary: '#5893d4',
      terciary: '#ff5b44',
      text: '#393e46',
      textTint: '#ffffff',
      background: '#fafafa',
      tint: '#ffffff',
      grey0: '#393e42',
      grey1: '#43484d',
      grey2: '#5e6977',
      grey3: '#86939e',
      grey4: '#bdc6cf',
      grey5: '#e1e8ee',
      greyOutline: '#bbb',
      success: '#52c41a',
      error: '#ff190c',
      divider: StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
    },
  },
  dark: {
    dark: true,
    colors: {
      ...DarkTheme.colors,
      text: '#fff',
      background: '#000',
      grey0: '#393e42',
      grey1: '#43484d',
      grey2: '#5e6977',
      grey3: '#86939e',
      grey4: '#bdc6cf',
      grey5: '#e1e8ee',
      greyOutline: '#bbb',
      success: '#52c41a',
      error: '#ff190c',
      divider: StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
    },
  },
}
