import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>
}

const SignUpScreen:React.FC<Props> = ({ navigation}) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello from Signup</Text>
      <Button
        title='Go to Login'
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export default SignUpScreen;
