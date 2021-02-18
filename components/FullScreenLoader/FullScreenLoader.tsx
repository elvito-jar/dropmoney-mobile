import React from 'react'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import { Icon, Overlay } from 'react-native-elements'

type Props = {
  visible: boolean
  message: string
  success: boolean
}

const FullScreenLoader: React.FC<Props> = (props) => (
  <Overlay isVisible={props.visible} overlayStyle={Styles.container}>
    {props.success ? (
      <>
        <Icon name='check' type='font-awesome' color='#FFFFFF' size={42} />
        <Text style={Styles.message}>{props.message}</Text>
      </>
    ) : (
      <ActivityIndicator size='large' color='#FFFFFF' />
    )}
  </Overlay>
)

FullScreenLoader.defaultProps = {
  success: false,
  message: '',
}

const Styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    height: 170,
    width: 170,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
  },
  message: {
    color: 'white',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
  },
})

export default FullScreenLoader
