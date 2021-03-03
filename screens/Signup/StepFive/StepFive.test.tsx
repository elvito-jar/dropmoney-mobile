import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { SignUpStackParamList } from '../../../types'
import { FetchError } from '../../../utils/makeRequest'
import StepFive from './StepFive'

jest.mock('@react-native-async-storage/async-storage')
jest.mock('../../../hooks/useAuth', () => {
  const actual = jest.requireActual('../../../hooks/useAuth')
  return {
    ...actual,
    __esModule: true,
    useAuth: jest.fn().mockReturnValue({ signup: jest.fn() }),
  }
})

jest.mock('../../../hooks/useSignupState', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ current: {} }),
}))

describe('<StepFive />', () => {
  const navigation = useNavigation() as StackNavigationProp<SignUpStackParamList, 'StepFive'>
  // let useAuthOb: any

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('se renderiza correctamente', () => {
    const tree = render(<StepFive navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('se introdujo codigo invalido', async () => {
    const mockedAsyncStorage = jest.spyOn(AsyncStorage, 'getItem')
    const { getByA11yLabel, getByText } = render(<StepFive navigation={navigation} />)
    fireEvent.changeText(getByA11yLabel('Codigo'), '744')
    fireEvent.press(getByText('Verificar Codigo'))
    await waitFor(() => {
      expect(mockedAsyncStorage).toBeCalledWith('@phoneNumber_codeValidation')
      expect(getByText('Codigo incorrecto.')).toBeTruthy()
    })
  })

  it('se introdujo codigo valido, peticion de signup sin exito', async () => {
    const mockedAsyncStorage = jest.spyOn(AsyncStorage, 'getItem').mockReturnValueOnce(Promise.resolve('7447'))
    const mockedsignup = jest
      .spyOn(useAuth(), 'signup')
      .mockReturnValueOnce(Promise.resolve([null, new FetchError('dummy', [])]))
    const { getByA11yLabel, getByText } = render(<StepFive navigation={navigation} />)
    fireEvent.changeText(getByA11yLabel('Codigo'), '7447')
    fireEvent.press(getByText('Verificar Codigo'))
    await waitFor(() => {
      expect(mockedAsyncStorage).toBeCalledWith('@phoneNumber_codeValidation')
      expect(mockedsignup).toBeCalled()
      expect(getByText('Ha ocurrido un error. Intentalo de nuevo'))
    })
  })

  it('se introdujo codigo valido, peticion de singup exitosa', async () => {
    const mockedAsyncStorage = jest.spyOn(AsyncStorage, 'getItem').mockReturnValueOnce(Promise.resolve('7447'))
    const mockedsignup = jest.spyOn(useAuth(), 'signup').mockReturnValueOnce(Promise.resolve([true, null]))
    const { getByA11yLabel, getByText } = render(<StepFive navigation={navigation} />)
    fireEvent.changeText(getByA11yLabel('Codigo'), '7447')
    fireEvent.press(getByText('Verificar Codigo'))
    await waitFor(() => {
      expect(mockedAsyncStorage).toBeCalledWith('@phoneNumber_codeValidation')
      expect(mockedsignup).toBeCalled()
      expect(navigation.navigate).toBeCalledWith('SuccessSignup')
    })
  })
})
