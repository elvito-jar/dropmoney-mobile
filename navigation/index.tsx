import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import { Icon, ThemeProvider } from 'react-native-elements'
import { CustomAlert, CustomAlertProvider, CustomAlertRef } from '../components/CustomAlert'
import { ToastGlobal, ToastGlobalProvider, ToastGlobalRef } from '../components/ToastGlobal'
import Colors from '../constants/Colors'
import { AuthContext, useAuth } from '../hooks/useAuth'
import ForgotPassword from '../screens/ForgotPassword'
import LoginScreen from '../screens/LoginScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen'
import Presentation from '../screens/Presentation'
import { RootStackParamList } from '../types'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import SignupNavigator from './SignupNavigator'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const customAlert = React.useRef<CustomAlertRef>(undefined!)
  const toast = React.useRef<ToastGlobalRef>(undefined!)
  return (
    <CustomAlertProvider customAlert={customAlert}>
      <ToastGlobalProvider toast={toast}>
        <ThemeProvider theme={colorScheme === 'dark' ? Colors.dark : Colors.light}>
          <AuthContext>
            <NavigationContainer
              linking={LinkingConfiguration}
              theme={colorScheme === 'dark' ? Colors.dark : Colors.light}>
              <RootNavigator />
            </NavigationContainer>
            <CustomAlert ref={customAlert} />
            <ToastGlobal ref={toast} />
          </AuthContext>
        </ThemeProvider>
      </ToastGlobalProvider>
    </CustomAlertProvider>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

const BackImage: React.FC<{ tintColor: string | undefined }> = (props) => (
  <Icon
    name='angle-left'
    type='font-awesome'
    size={37}
    color={props.tintColor}
    containerStyle={{
      marginHorizontal: 5,
      paddingLeft: 3,
      paddingBottom: 4,
    }}
  />
)

function RootNavigator() {
  const { state } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: BackImage,
        headerTitle: '',
        headerBackTitleVisible: false,
        headerStyle: {
          shadowColor: 'transparent',
        },
      }}>
      {state.userToken === false ? (
        <>
          <Stack.Screen options={{ headerShown: false }} name='Presentation' component={Presentation} />
          <Stack.Screen
            name='PasswordRecovery'
            options={{ headerShown: false }}
            component={PasswordRecoveryScreen}
          />
          <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPassword} />
          <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name='SignUp' component={SignupNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen options={{ headerShown: false }} name='Root' component={BottomTabNavigator} />
        </>
      )}
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  )
}
