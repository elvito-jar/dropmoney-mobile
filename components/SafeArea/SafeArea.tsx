import React, { PropsWithChildren } from 'react'
import { Platform, SafeAreaView, ViewStyle } from 'react-native'
import useTheme from '../../hooks/useTheme'

type Props = {
  style?: ViewStyle[] | ViewStyle
}

const SafeArea: React.FC<PropsWithChildren<Props>> = (props) => {
  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? 25 : 0 },
        props.style,
      ]}>
      {props.children}
    </SafeAreaView>
  )
}

export default React.memo(SafeArea)
