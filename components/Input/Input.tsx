import React from 'react'
import { StyleSheet } from 'react-native'
import { Input as EInput, InputProps } from 'react-native-elements'

const Input = React.forwardRef<EInput, InputProps>((props, ref) => (
  <EInput
    {...props}
    ref={ref}
    containerStyle={[Styles.inputContainer, props.containerStyle]}
    inputContainerStyle={[Styles.inputInner, props.inputContainerStyle]}
    inputStyle={[Styles.input, props.inputStyle]}
  />
))

const Styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexBasis: '100%',
    borderBottomWidth: 0,
  },
  inputInner: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: 'rgba(0, 0, 0, .1)',
  },
  input: {
    fontSize: 15,
  },
})

export default Input
