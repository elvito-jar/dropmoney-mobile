import { render } from '@testing-library/react-native'
import React from 'react'
import AuthLayout from '../../components/AuthLayout'

describe('<AuthLayout />', () => {
  it('se renderiza correctamente', () => {
    const tree = render(<AuthLayout />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
