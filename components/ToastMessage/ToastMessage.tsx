import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

type Props = { message: string; containerStyle?: ViewStyle; messageStyle?: TextStyle }

const ToastMessage: React.FC<Props> = ({ message, containerStyle, messageStyle }) => (
  <View style={[Styles.toast, containerStyle]}>
    <Text style={[{ color: 'white', textAlign: 'center' }, messageStyle]}>{message}</Text>
  </View>
)

ToastMessage.defaultProps = {
  containerStyle: {},
  messageStyle: {},
}

const Styles = StyleSheet.create({
  toast: { width: 300 },
})

export default ToastMessage
