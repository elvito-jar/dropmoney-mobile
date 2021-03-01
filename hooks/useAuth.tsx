import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import React from 'react'
import { URL } from '../constants'
import { SignupState } from '../types'
import makeRequest, { RequestResponse } from '../utils/makeRequest'

type State = {
  userToken: string | null
  isLoading: boolean
  isSignout: boolean
}

type Actions =
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SIGN_IN'; token: string | null }
  | { type: 'SIGN_OUT' }

const initialState: State = {
  userToken: null,
  isLoading: true,
  isSignout: false,
}

type ContextType = {
  state: State
  signin: (email: string, password: string) => Promise<RequestResponse>
  signout: () => void
  signup: (state: SignupState) => Promise<RequestResponse>
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...state, userToken: action.token, isLoading: false }

    case 'SIGN_IN':
      return { ...state, userToken: action.token, isSignout: false }

    case 'SIGN_OUT':
      return { ...state, isSignout: true, userToken: null }

    default: {
      throw Error('Accion no identificada reducer useAuth.tsx')
    }
  }
}

const AContext = React.createContext<ContextType>(undefined!)

const AuthContext: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {}
      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }
    bootstrapAsync()
  }, [])

  const signin = async (email: string, password: string): Promise<RequestResponse> => {
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const [res, err] = await makeRequest(`${URL}/auth/login`, config)
    if (err) {
      return [null, err]
    }
    dispatch({ type: 'SIGN_IN', token: res.token })
    return [res, null]
  }

  const signup = async (state: SignupState) => {
    const body = JSON.stringify({
      username: state.username,
      email: state.email,
      password: state.password,
      firstName: state.name,
      lastName: state.lastName,
      ci: state.cedula,
      phones: [{ isoCode: 've', number: state.phoneNumber }],
      nationality: 'V',
      roles: ['admin', 'user'],
      address: state.address,
      city: state.city,
      state: state.state,
      postalCode: state.zipCode,
      DateOfBirth: moment(state.birthday).format('DD/MM/YYYY'),
    })
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      method: 'POST',
    }
    return makeRequest(`${URL}/auth/register`, config)
  }

  const signout = () => {}

  const authContext = React.useMemo<ContextType>(
    () => ({
      state,
      signin,
      signup,
      signout,
    }),
    [state]
  )

  return <AContext.Provider value={authContext}>{children}</AContext.Provider>
}

const useAuth = (): ContextType => {
  const data = React.useContext(AContext)
  return data
}

export { AuthContext, useAuth }
