import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import useSignupState from '../../../hooks/useSignupState'
import { SignUpStackParamList } from '../../../types'
import * as makeRequest from '../../../utils/makeRequest'
import StepFour from './StepFour'

jest.mock('@react-native-async-storage/async-storage')
jest.mock('../../../utils/makeRequest', () => {
  const actual = jest.requireActual('../../../utils/makeRequest')
  return {
    ...actual,
    __esModule: true,
    default: jest.fn(),
  }
})

jest.mock('../../../hooks/useSignupState', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ current: {} }),
}))

Object.defineProperty(global, 'FormData', {
  value: () => ({ append: jest.fn() }),
})

describe('<StepFour />', () => {
  const navigation = useNavigation() as StackNavigationProp<SignUpStackParamList, 'StepFour'>

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('se renderiza correctamente', () => {
    const tree = render(<StepFour navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('error al hacer submit campos requeridos', async () => {
    const { getByText, getAllByText, toJSON } = render(<StepFour navigation={navigation} />)
    fireEvent.press(getByText('Verificar Celular'))
    await waitFor(() => {
      expect(getAllByText('Este campo es obligatorio.')).toHaveLength(2)
      expect(navigation.navigate).not.toBeCalled()
    })
  })

  it('error formatos invalidos de email y telefono', async () => {
    const { getByText, getByPlaceholderText } = render(<StepFour navigation={navigation} />)
    fireEvent.changeText(getByPlaceholderText('Correo electronico'), 'sivlej231@')
    fireEvent.changeText(getByPlaceholderText('Numero Telefonico'), '4246022')
    fireEvent.press(getByText('Verificar Celular'))
    await waitFor(() => {
      expect(navigation.navigate).not.toBeCalled()
      expect(getByText('Debe introducir un correo electronico valido.')).toBeTruthy()
      expect(getByText('Debe ingresar un numero celular valido. Ej: 424 6170000')).toBeTruthy()
    })
  })

  it('proceso de submit', async () => {
    const mockedAsyncStorage = jest.spyOn(AsyncStorage, 'setItem')
    const mockedMakeRequest = jest.spyOn(makeRequest, 'default').mockReturnValueOnce(Promise.resolve([true, null]))
    const { getByText, getByPlaceholderText } = render(<StepFour navigation={navigation} />)
    fireEvent.changeText(getByPlaceholderText('Correo electronico'), 'sivlejose89@gmail.com')
    fireEvent.changeText(getByPlaceholderText('Numero Telefonico'), '424 6022493')
    fireEvent.press(getByText('Verificar Celular'))
    await waitFor(() => {
      const { current } = useSignupState()
      expect(current).toMatchObject({ email: 'sivlejose89@gmail.com', phoneNumber: '424 6022493' })
      expect(mockedAsyncStorage).toBeCalledWith('@phoneNumber_codeValidation', expect.any(String))
      expect(mockedMakeRequest).toBeCalled()
      expect(navigation.navigate).toBeCalledWith('StepFive')
    })
  })

  it('proceso de submit fallido', async () => {
    const mockedAsyncStorage = jest.spyOn(AsyncStorage, 'setItem')
    const mockedMakeRequest = jest
      .spyOn(makeRequest, 'default')
      .mockReturnValueOnce(Promise.resolve([null, new makeRequest.FetchError('test', [])]))
    const { getByText, getByPlaceholderText } = render(<StepFour navigation={navigation} />)
    fireEvent.changeText(getByPlaceholderText('Correo electronico'), 'sivlejose89@gmail.com')
    fireEvent.changeText(getByPlaceholderText('Numero Telefonico'), '424 6022493')
    fireEvent.press(getByText('Verificar Celular'))
    await waitFor(() => {
      const { current } = useSignupState()
      expect(current).toMatchObject({ email: 'sivlejose89@gmail.com', phoneNumber: '424 6022493' })
      expect(mockedAsyncStorage).toBeCalledWith('@phoneNumber_codeValidation', expect.any(String))
      expect(mockedMakeRequest).toBeCalled()
      expect(navigation.navigate).not.toBeCalled()
    })
  })
})
