import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SignupNavigatorContext } from '../../hooks/useSignupState'
import StepFive from '../../screens/Signup/StepFive'
import StepFour from '../../screens/Signup/StepFour'
import StepOne from '../../screens/Signup/StepOne'
import StepThree from '../../screens/Signup/StepThree'
import StepTwo from '../../screens/Signup/StepTwo'
import UsernamePass from '../../screens/Signup/UsernamePass'
import { SignUpStackParamList, SignupState } from '../../types'

const initialState: SignupState = {
  username: '',
  password: '',
  name: '',
  birthday: undefined!,
  lastName: '',
  cedula: '',
  email: '',
  phoneNumber: '',
  state: '',
  city: '',
  address: '',
  zipCode: '',
}

const Stack = createStackNavigator<SignUpStackParamList>()

const SignupNavigator: React.FC = (props) => {
  const state = React.useRef<SignupState>(initialState)
  return (
    <SignupNavigatorContext.Provider value={state}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='UsernamePass' component={UsernamePass} />
        <Stack.Screen name='StepOne' component={StepOne} />
        <Stack.Screen name='StepTwo' component={StepTwo} />
        <Stack.Screen name='StepThree' component={StepThree} />
        <Stack.Screen name='StepFour' component={StepFour} />
        <Stack.Screen name='StepFive' component={StepFive} />
      </Stack.Navigator>
    </SignupNavigatorContext.Provider>
  )
}

export default SignupNavigator
