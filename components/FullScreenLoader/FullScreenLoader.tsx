import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

type Props = {
  visible: boolean
}

const FullScreenLoader: React.FC<Props> = (props) => (
  <Overlay isVisible={props.visible} overlayStyle={Styles.container}>
    <ActivityIndicator size='large' color='#FFFFFF' />
  </Overlay>
)

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
    height: 120,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
  },
})

export default FullScreenLoader
