import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { render } from '@testing-library/react-native'
import React from 'react'
import { SignUpStackParamList } from '../../../types'
import SuccessSignup from './SuccessSignup'

describe('<SuccessSignup />', () => {
  const navigation = useNavigation() as StackNavigationProp<SignUpStackParamList, 'SuccessSignup'>

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('se renderiza correctamente', () => {
    jest.spyOn(React, 'useRef').mockReturnValue({ current: { play: () => {} } })
    const tree = render(<SuccessSignup navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
