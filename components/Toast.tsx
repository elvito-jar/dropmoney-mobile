import { Keyboard, TextStyle, ViewStyle } from 'react-native'
import Toast from 'react-native-easy-toast'
import ToastMessage from './ToastMessage'

type Options = {
  containerStyle?: ViewStyle
  messageStyle?: TextStyle
}

const defaultOptions: Options = {
  containerStyle: {},
  messageStyle: {},
}

function showToast(toastRef: Toast, message: string, options: Options = defaultOptions) {
  Keyboard.dismiss()
  toastRef.show(<ToastMessage message={message} {...options} />)
}

export { Toast, showToast }
