import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import { ThemeProvider } from 'react-native-elements'
import { darkTheme, lightTheme } from '../constants/theme'
import { AuthContext, useAuth } from '../hooks/useAuth'
import LoginScreen from '../screens/LoginScreen'
import Presentation from '../screens/Presentation'
import { RootStackParamList } from '../types'
import BottomTabNavigator from './BottomTabNavigator'
// import LinkingConfiguration from './LinkingConfiguration';
import SignupNavigator from './SignupNavigator'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <AuthContext>
          <RootNavigator />
        </AuthContext>
      </ThemeProvider>
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  const { state } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {state.userToken === null ? (
        <>
          <Stack.Screen name='Presentation' component={Presentation} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='SignUp' component={SignupNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name='Root' component={BottomTabNavigator} />
        </>
      )}
      {/* // <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
    </Stack.Navigator>
  )
}
