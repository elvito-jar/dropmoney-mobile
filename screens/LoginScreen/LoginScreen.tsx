import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { RootStackParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello from Login</Text>
      <Button title='Go to Sign Up' onPress={() => navigation.navigate('SignUp')} />
    </View>
  )
}

export default LoginScreen
