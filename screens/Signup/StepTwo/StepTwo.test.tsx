import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native'
import React from 'react'
import useSignupState from '../../../hooks/useSignupState'
import { SignUpStackParamList } from '../../../types'
import StepTwo from './StepTwo'

jest.mock('../../../hooks/useSignupState', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ current: {} }),
}))

describe('<StepTwo />', () => {
  const navigation = useNavigation() as StackNavigationProp<SignUpStackParamList, 'StepTwo'>

  it('se renderiza correctamente', () => {
    const tree = render(<StepTwo navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('toggle modal para introducir fecha de nacimiento', async () => {
    const { getByA11yLabel, queryByText, getByText } = render(<StepTwo navigation={navigation} />)
    const dateField = getByA11yLabel('Date field')
    expect(dateField).toBeTruthy()
    fireEvent.press(dateField)
    await waitFor(() => {
      expect(getByText('Fecha de Nacimiento')).toBeTruthy()
      fireEvent.press(getByText('Cancelar'))
    })
    fireEvent.press(getByText('Cancelar'))
    await waitForElementToBeRemoved(() => getByText('Fecha de Nacimiento'))
    expect(queryByText('Fecha de Nacimiento')).toBeNull()
  })

  it('pasa a la pagina StepThree', async () => {
    const { getByText } = render(<StepTwo navigation={navigation} />)
    const submit = getByText('Siguiente')
    fireEvent.press(submit)
    expect(navigation.navigate).toBeCalledWith('StepThree')
    const { current } = useSignupState()
    expect(current).toMatchObject({ birthday: expect.any(Date) })
  })
})
