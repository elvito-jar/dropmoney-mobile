import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { SignUpStackParamList } from '../../../types'
import StepOne from './StepOne'

jest.mock('../../../hooks/useSignupState', () => {
  const actual = jest.requireActual('../../../hooks/useSignupState')
  return {
    __esModule: true,
    ...actual,
    default: jest.fn().mockReturnValue({ current: {} }),
  }
})

describe('<StepOne />', () => {
  const navigation = useNavigation() as StackNavigationProp<SignUpStackParamList, 'StepOne'>

  it('se renderiza correctamente', () => {
    const tree = render(<StepOne navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('mostrar error campos requeridos', async () => {
    const { getByText, toJSON } = render(<StepOne navigation={navigation} />)
    const submit = getByText('Siguiente')
    expect(submit).toBeTruthy()
    fireEvent.press(submit)
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot()
    })
  })

  it('cedula ya registrada', async () => {})

  it('campos validos verificar submit', async () => {
    const { getByText, getByPlaceholderText } = render(<StepOne navigation={navigation} />)
    fireEvent.changeText(getByPlaceholderText('Nombre'), 'nombre')
    fireEvent.changeText(getByPlaceholderText('Apellido'), 'apellido')
    fireEvent.changeText(getByPlaceholderText('Cedula'), '26638992')
    fireEvent.press(getByText('Siguiente'))
    await waitFor(() => {
      expect(navigation.navigate).toBeCalledWith('StepTwo')
    })
  })
})
