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
  name: string
  lastName: string
  cedula: string
  email: string
  phoneNumber: string
  state: string
  city: string
  addressOne: string
  addresTwo: string
}

const initialState: State = {
  name: '',
  lastName: '',
  cedula: '',
  email: '',
  phoneNumber: '',
  state: '',
  city: '',
  addressOne: '',
  addresTwo: '',
}

type Actions = { type: 'INPUT'; input: string; value: string }

type ContextSignupNavigator = {
  state: State
  dispatch: React.Dispatch<Actions>
}

const SignupNavigatorContext = React.createContext<ContextSignupNavigator>(undefined!)

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
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <SignupNavigatorContext.Provider value={{ state, dispatch }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='StepFour' component={StepFour} />
        <Stack.Screen name='StepFive' component={StepFive} />
        <Stack.Screen name='UsernamePass' component={UsernamePass} />
        <Stack.Screen name='StepOne' component={StepOne} />
        <Stack.Screen name='StepTwo' component={StepTwo} />
        <Stack.Screen name='StepThree' component={StepThree} />
      </Stack.Navigator>
    </SignupNavigatorContext.Provider>
  )
}

export default SignupNavigator
