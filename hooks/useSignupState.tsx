import React from 'react'
import { SignupState } from '../types'

export const SignupNavigatorContext = React.createContext<React.MutableRefObject<SignupState>>(undefined!)

export default () => {
  return React.useContext(SignupNavigatorContext)
}
