import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Device from 'expo-device'
import * as SecureStore from 'expo-secure-store'
//@ts-ignore
import generateId from 'generate-unique-id'
import moment from 'moment'
import React from 'react'
import { URL } from '../constants'
import { SignupState } from '../types'
import makeRequest, { FetchError, RequestResponse } from '../utils/makeRequest'

type State = {
  userToken: string | null
  isLoading: boolean
  isSignout: boolean
  user: User
}

type Actions =
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SIGN_IN'; token: string | null; user: User }
  | { type: 'SIGN_OUT' }
  | { type: 'UPDATE_TOKEN'; user: User }

type User = {
  city: {
    name: string
    address: string
    postalCode: number
    state: string
  }
  _id: string
  isPublic: boolean
  username: string
  email: string
  firstName: string
  lastName: string
  ci: string
  phones: { isoCode: string; number: string }[]
  dateOfBirth: string
}

const initialState: State = {
  userToken: null,
  isLoading: true,
  isSignout: false,
  user: {
    city: {
      name: 'San francisco',
      address: '121 jackson ave',
      postalCode: 4004,
      state: 'Zulia',
    },
    isPublic: false,
    _id: '604cc6a71117c30cd8424f8f',
    username: 'elvitop',
    email: 'sivlejose89@gmail.com',
    firstName: 'Elvis',
    lastName: 'Araujo',
    ci: '26638992',
    phones: [
      {
        isoCode: 'VE',
        number: '+584246022493',
      },
    ],
    dateOfBirth: '1998-12-05T00:00:00.000Z',
  },
}

type ContextType = {
  state: State
  signin: (email: string, password: string) => Promise<RequestResponse>
  signout: () => void
  signup: (state: SignupState) => Promise<RequestResponse>
  updateUser: (body: any) => Promise<RequestResponse>
  dispatch: React.Dispatch<Actions>
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...state, userToken: action.token, isLoading: false }

    case 'SIGN_IN':
      return { ...state, userToken: action.token, isSignout: false, user: action.user }

    case 'SIGN_OUT':
      return { ...state, isSignout: true, userToken: null }

    case 'UPDATE_TOKEN':
      return { ...state, user: action.user }

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
    // bootstrapAsync()
  }, [])

  const signin = async (email: string, password: string): Promise<RequestResponse> => {
    let id
    const goodId = await SecureStore.getItemAsync('device_id')
    id = goodId || generateId()
    if (!goodId) {
      await SecureStore.setItemAsync('device_id', id)
    }
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        deviceModel: Device.modelName,
        deviceName: Device.deviceName || 'device',
        deviceId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const [res, err] = await makeRequest(`${URL}/auth/login`, config)
    if (err || res.message === 'not login') {
      return res?.message === 'not login' ? [null, new FetchError('not login', [], res)] : [null, err]
    }
    dispatch({ type: 'SIGN_IN', token: res.token, user: res.user })
    return [{}, null]
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
      dateOfBirth: moment(state.birthday).valueOf(),
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

  const updateUser = async (body: any): Promise<RequestResponse> => {
    const config: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.userToken}`,
      },
      body: JSON.stringify(body),
    }
    const [res, err] = await makeRequest(`${URL}/user/${state.user._id}`, config)
    if (err) {
      return [null, err]
    }
    dispatch({ type: 'UPDATE_TOKEN', user: res.user })
    return [res, err]
  }

  const signout = () => {
    dispatch({ type: 'SIGN_OUT' })
  }

  const authContext = React.useMemo<ContextType>(
    () => ({
      state,
      signin,
      signup,
      signout,
      updateUser,
      dispatch,
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
