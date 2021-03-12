import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'

type State = {
  isVisible: boolean
  message: string
}

type Props = {}
export type CustomAlertRef = {
  show: (message: string, cb?: Callback) => void
}

const CustomAlertContext = React.createContext<{ current: CustomAlertRef }>(undefined!)
type Callback = (...args: any[]) => any

const CustomAlert = React.forwardRef<CustomAlertRef, Props>((props, ref) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')
  const [callback, setCallback] = React.useState<Callback>(() => () => {})
  const { colors } = useTheme()

  React.useImperativeHandle(ref, () => ({
    show: (message: string, cb: Callback = () => {}) => {
      setIsVisible(true)
      setMessage(message)
      setCallback(() => cb)
    },
  }))

  React.useEffect(() => {
    if (isVisible === false) {
      setMessage('')
      setCallback(() => {})
    }
  }, [isVisible])

  const close = () => {
    callback()
    setIsVisible(false)
  }

  return (
    <Overlay isVisible={isVisible} overlayStyle={[Styles.overlayContainer]}>
      <View>
        <View style={{ padding: 20, paddingBottom: 0 }}>
          <View>
            <Icon name='check' type='simple-line-icon' color={colors.success} size={60} />
          </View>
          <Text style={[Styles.message, { color: colors.grey2 }]}>{message}</Text>
        </View>
        <View>
          <Button
            containerStyle={{ borderTopWidth: 1, borderTopColor: colors.divider, paddingVertical: 2 }}
            title='OK'
            type='clear'
            onPress={close}
          />
        </View>
      </View>
    </Overlay>
  )
})

const Styles = StyleSheet.create({
  overlayContainer: {
    borderRadius: 20,
    width: 280,
    padding: 0,
  },
  message: {
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 20,
    fontSize: 13,
  },
})

export const CustomAlertProvider: React.FC<{ customAlert: { current: CustomAlertRef } }> = ({
  customAlert,
  children,
}) => {
  return <CustomAlertContext.Provider value={customAlert}>{children}</CustomAlertContext.Provider>
}

export const useCustomAlert = (): CustomAlertRef => {
  return React.useContext(CustomAlertContext).current
}

export default CustomAlert
