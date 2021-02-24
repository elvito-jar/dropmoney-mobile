import { useNavigation } from '@react-navigation/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import {} from 'module'
import React from 'react'
import UsernamePass from './UsernamePass'
jest.mock('../../../hooks/useSignupState', () =>
  jest.fn(() => ({
    current: {},
  }))
)

describe('<UsernamePass />', () => {
  let navigation: any

  beforeEach(() => {
    navigation = useNavigation()
  })

  it('renderiza correctamente', () => {
    const tree = render(<UsernamePass navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('mostrar error de campos requeridos', async () => {
    const { getByText, findAllByText, toJSON } = render(<UsernamePass navigation={navigation} />)
    const submit = getByText('Siguiente')
    expect(submit).toBeTruthy()
    fireEvent.press(submit)
    const errors = await findAllByText('Este campo es obligatorio')
    expect(errors).toHaveLength(2)
    expect(navigation.navigate).not.toBeCalled()
  })

  it('regexp campos usuario y contrasena invalidos', async () => {
    const { getByText, getByPlaceholderText, toJSON } = render(<UsernamePass navigation={navigation} />)
    const submit = getByText('Siguiente')
    const username = getByPlaceholderText('Usuario')
    const pass = getByPlaceholderText('Contraseña')
    fireEvent.changeText(username, '123--a.%')
    fireEvent.changeText(pass, 'eeqd2')
    fireEvent.press(submit)
    await waitFor(() => {
      expect(
        getByText('El usuario solo puede contener entre (6-20) caracteres, numero y un solo "_".')
      ).toBeTruthy()
      expect(
        getByText(
          'La contraseña debe contener al menos 8 caracteres, una letra mayuscula, un numero y sin espacios y solo acepta caracteres, caracteres especiales(@$?-._), numeros'
        )
      ).toBeTruthy()
    })
    expect(navigation.navigate).not.toBeCalled()
  })

  it('regexp campos usuario y contrasena validos', async () => {
    const { getByText, queryByText, getByPlaceholderText, toJSON } = render(
      <UsernamePass navigation={navigation} />
    )
    const submit = getByText('Siguiente')
    const username = getByPlaceholderText('Usuario')
    const pass = getByPlaceholderText('Contraseña')
    fireEvent.changeText(username, 'elvitop')
    fireEvent.changeText(pass, 'KKirinoML123-')
    fireEvent.press(submit)
    await waitFor(() => {
      expect(
        queryByText('El usuario solo puede contener entre (6-20) caracteres, numero y un solo "_".')
      ).toBeNull()
      expect(
        queryByText(
          'La contraseña debe contener al menos 8 caracteres, una letra mayuscula, un numero y sin espacios y solo acepta caracteres, caracteres especiales(@$?-._), numeros'
        )
      ).toBeNull()
    })
    expect(navigation.navigate).toBeCalledWith('StepOne')
  })
})
