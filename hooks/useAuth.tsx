import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'

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
  signin: () => void
  signout: () => void
  signup: () => void
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

  const signin = () => {}

  const signup = () => {}

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
