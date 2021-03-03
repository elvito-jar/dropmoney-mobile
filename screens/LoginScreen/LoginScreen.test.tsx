import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { RootStackParamList } from '../../types'
import { FetchError } from '../../utils/makeRequest'
import LoginScreen from './LoginScreen'

jest.mock('../../hooks/useAuth', () => {
  const actual = jest.requireActual('../../hooks/useAuth')
  return {
    ...actual,
    __esModule: true,
    useAuth: jest.fn().mockReturnValue({ signin: jest.fn() }),
  }
})

describe('<LoginScreen />', () => {
  const navigation = useNavigation() as StackNavigationProp<RootStackParamList, 'Login'>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('se renderiza correctamente', () => {
    const tree = render(<LoginScreen navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('de vuelta a la pagina de presetacion', () => {
    const { getByText } = render(<LoginScreen navigation={navigation} />)
    fireEvent.press(getByText('Cancelar'))
    expect(navigation.goBack).toBeCalled()
  })

  it('error iniciar sesion sin campos rellenos o clave o correo invalido', async () => {
    const mockedsignin = jest
      .spyOn(useAuth(), 'signin')
      .mockReturnValueOnce(Promise.resolve([null, new FetchError('Log in failed', [])]))
    const { getByText } = render(<LoginScreen navigation={navigation} />)
    fireEvent.press(getByText('Iniciar sesión'))
    await waitFor(() => {
      expect(mockedsignin).toBeCalledWith('', '')
      expect(getByText('Correo o contraseña incorrectos.')).toBeTruthy()
    })
  })

  it('error iniciar sesion correo no verificado', async () => {
    const mockedsignin = jest
      .spyOn(useAuth(), 'signin')
      .mockReturnValueOnce(
        Promise.resolve([
          null,
          new FetchError('your account has not been verified', [], {
            message: 'your account has not been verified',
          }),
        ])
      )
    const { getByText, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />)
    fireEvent.changeText(getByPlaceholderText('Correo electronico'), 'sivlejose89@gmail.com')
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'e26638992E')
    fireEvent.press(getByText('Iniciar sesión'))
    await waitFor(() => {
      expect(mockedsignin).toBeCalledWith('sivlejose89@gmail.com', 'e26638992E')
      expect(getByText('Tu cuenta aún no ha sido verificada.')).toBeTruthy()
    })
  })
})
