import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import useSignupState from '../../../hooks/useSignupState'
import { SignUpStackParamList } from '../../../types'
import StepThree from './StepThree'

jest.mock('../../../hooks/useSignupState', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ current: {} }),
}))

describe('<StepThree />', () => {
  const navigation = useNavigation() as StackNavigationProp<SignUpStackParamList, 'StepThree'>

  it('se renderiza correctamente', () => {
    const tree = render(<StepThree navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('se renderiza el modal selec para seleccionar el estado', () => {
    const { toJSON, getByA11yLabel } = render(<StepThree navigation={navigation} />)
    fireEvent.press(getByA11yLabel('Estado'))
    expect(toJSON()).toMatchSnapshot()
  })

  it('se ejecuta la funcion cuando los campos estan rellenos', async () => {
    const { getByText, getByPlaceholderText, getByA11yLabel } = render(<StepThree navigation={navigation} />)
    const submit = getByText('Siguiente')
    fireEvent.press(submit)
    expect(navigation.navigate).not.toBeCalled()
    fireEvent.changeText(getByPlaceholderText('Dirección de Calle'), '95 broad street')
    fireEvent.changeText(getByPlaceholderText('Codigo Postal'), '4004')
    fireEvent.changeText(getByPlaceholderText('Ciudad'), 'San francisco')
    fireEvent.press(getByA11yLabel('Estado'))
    await waitFor(() => expect(getByText('Anzoátegui')).toBeTruthy())
    fireEvent.press(getByText('Anzoátegui'))
    fireEvent.press(getByText('Listo'))
    fireEvent.press(submit)
    await waitFor(() => {
      expect(navigation.navigate).toBeCalledWith('StepFour')
      const { current } = useSignupState()
      expect(current).toMatchObject({
        address: '95 broad street',
        zipCode: '4004',
        city: 'San francisco',
        state: 'Anzoátegui',
      })
    })
  })
})
