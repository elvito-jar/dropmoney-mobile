import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Icon } from 'react-native-elements'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import useTheme from '../hooks/useTheme'
import AccountsScreen from '../screens/AccountsScreen'
import AdressdetailsScreen from '../screens/AdressdetailsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChangeBirthdayScreen from '../screens/ProfileScreen/ChangeBirthdayScreen'
import ChangeEmailScreen from '../screens/ProfileScreen/ChangeEmailScreen'
import ChangePasswordScreen from '../screens/ProfileScreen/ChangePasswordScreen'
import ChangePhoneNumberScreen from '../screens/ProfileScreen/ChangePhoneNumberScreen'
import ChangeUsernameScreen from '../screens/ProfileScreen/ChangeUsernameScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import { AccountsParamList, BottomTabParamList, MenuParamList, TransfersParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='Accounts'
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].colors.primary,
        labelStyle: { paddingBottom: 3 },
        tabStyle: { paddingTop: 5 },
        keyboardHidesTabBar: true,
      }}>
      <BottomTab.Screen
        name='Accounts'
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name='wallet' type='font-awesome-5' color={color} size={size} />,
          title: 'Cuentas',
        }}
      />
      <BottomTab.Screen
        name='Transfers'
        component={TransferNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='money-check-alt' type='font-awesome-5' color={color} size={size} />
          ),
          title: 'Transferencias',
        }}
      />
      <BottomTab.Screen
        name='Menu'
        component={MenuNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name='cogs' type='font-awesome-5' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AccountStack = createStackNavigator<AccountsParamList>()

function AccountNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name='Accounts' component={AccountsScreen} options={{ headerShown: false }} />
      <AccountStack.Screen
        name='AddressdetailsScreen'
        component={AdressdetailsScreen}
        options={{ headerTitle: 'Detalles de cuenta' }}
      />
    </AccountStack.Navigator>
  )
}

const TransfersStack = createStackNavigator<TransfersParamList>()

function TransferNavigator() {
  return (
    <TransfersStack.Navigator>
      <TransfersStack.Screen name='Transfers' component={TabTwoScreen} options={{ headerShown: false }} />
    </TransfersStack.Navigator>
  )
}

const MenuStack = createStackNavigator<MenuParamList>()

function MenuNavigator() {
  const { colors } = useTheme()

  return (
    <MenuStack.Navigator screenOptions={{ headerTintColor: colors.primary }}>
      <MenuStack.Screen name='Menu' component={ProfileScreen} />
      <MenuStack.Screen name='Email' component={ChangeEmailScreen} />
      <MenuStack.Screen name='Username' options={{ headerTitle: 'Usuario' }} component={ChangeUsernameScreen} />
      <MenuStack.Screen
        name='PhoneNumber'
        options={{ headerTitle: 'Numero celular' }}
        component={ChangePhoneNumberScreen}
      />
      <MenuStack.Screen
        name='Birthday'
        options={{ headerTitle: 'Fecha de nacimiento' }}
        component={ChangeBirthdayScreen}
      />
      <MenuStack.Screen name='Password' options={{ headerTitle: 'Contraseña' }} component={ChangePasswordScreen} />
    </MenuStack.Navigator>
  )
}
