import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { Button, Header } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'

const AuthLayout: React.FC = ({ children }) => {
  const navigation = useNavigation()
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        leftComponent={{
          icon: 'angle-left',
          type: 'font-awesome',
          accessibilityLabel: 'back',
          size: 34,
          color: colors?.primary,
          onPress: () => navigation.goBack(),
        }}
        backgroundColor='transparent'
        containerStyle={{
          borderBottomWidth: 0,
        }}
      />
      {children}
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: colors?.divider,
        }}>
        <Button
          type='clear'
          containerStyle={[{ width: '100%', height: '100%' }]}
          onPress={() => navigation.navigate('Presentation')}
          title='Ya tienes una cuenta? Inicia Sesión'
          titleStyle={{ fontSize: 16 }}
        />
      </View>
    </View>
  )
}

export default AuthLayout
