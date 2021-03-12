import { useTheme } from '@react-navigation/native'
import { ColorPallete } from '../types'

export default () => {
  return useTheme() as ColorPallete
}
