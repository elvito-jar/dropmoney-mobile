import React from 'react'
import { Keyboard, KeyboardEvent, TextStyle, ViewStyle } from 'react-native'
import Toast from 'react-native-easy-toast'
import ToastMessage from '../ToastMessage'

type Options = {
  containerStyle?: ViewStyle
  messageStyle?: TextStyle
}

export type ToastGlobalRef = {
  show: (message: string, options?: Options) => void
}
type Props = {}

const ToastGlobalContext = React.createContext<{ current: ToastGlobalRef }>(undefined!)

const ToastGlobal = React.forwardRef<ToastGlobalRef, Props>((props, ref) => {
  const [position, setPosition] = React.useState<'bottom' | 'center' | 'top'>('bottom')
  const [height, setHeight] = React.useState<number>(0)
  const toast = React.useRef<Toast>(undefined!)

  React.useImperativeHandle(ref, () => ({
    show: (message: string, options: Options = {}) => {
      toast.current.show(<ToastMessage message={message} {...options} />, 800)
    },
  }))

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide)
    }
  }, [])

  const keyboardDidShow = (e: KeyboardEvent) => {
    setHeight(e.endCoordinates.height)
  }

  const keyboardDidHide = (e: KeyboardEvent) => {
    setHeight(e.endCoordinates.height)
  }

  return (
    <Toast
      ref={toast}
      //@ts-ignore
      style={{ backgroundColor: '#ff190c' }}
      positionValue={height ? height + 60 : 100}
      position={position}
    />
  )
})

export const ToastGlobalProvider: React.FC<{ toast: { current: ToastGlobalRef } }> = ({ toast, children }) => (
  <ToastGlobalContext.Provider value={toast}>{children}</ToastGlobalContext.Provider>
)

export const useToast = (): ToastGlobalRef => {
  return React.useContext(ToastGlobalContext).current
}

export default ToastGlobal
