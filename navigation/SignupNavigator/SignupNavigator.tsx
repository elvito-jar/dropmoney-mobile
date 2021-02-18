import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import StepFive from '../../screens/Signup/StepFive'
import StepFour from '../../screens/Signup/StepFour'
import StepOne from '../../screens/Signup/StepOne'
import StepThree from '../../screens/Signup/StepThree'
import StepTwo from '../../screens/Signup/StepTwo'
import UsernamePass from '../../screens/Signup/UsernamePass'
import { SignUpStackParamList } from '../../types'

type State = {
  username: string
  password: string
  name: string
  lastName: string
  cedula: string
  birthday: Date
  address: string
  state: string
  city: string
  zipCode: string
  email: string
  phoneNumber: string
}

const initialState: State = {
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

type Actions = { type: 'INPUT'; input: string; value: string }

export const SignupNavigatorContext = React.createContext<React.MutableRefObject<State>>(undefined!)

const Stack = createStackNavigator<SignUpStackParamList>()
function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'INPUT':
      return { ...state, [action.input]: action.value }

    default:
      throw Error('Accion no identificada SignupNavigator.tsx')
  }
}

const SignupNavigator: React.FC = (props) => {
  const state = React.useRef<State>(initialState)
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
