import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Input from '../../components/Input'
import { showToast, Toast } from '../../components/Toast'
import { URL } from '../../constants'
import useTheme from '../../hooks/useTheme'
import { RootStackParamList } from '../../types'
import makeRequest from '../../utils/makeRequest'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>
}

const ForgotPassword: React.FC<Props> = (props) => {
  const { colors } = useTheme()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [contact, setContact] = React.useState<string>('')
  const toast = React.useRef<Toast>(undefined!)

  const submit = async () => {
    setLoading(true)
    const body = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(contact)
      ? { email: contact, url: '' }
      : { username: contact, url: '' }
    body.url = 'http://localhost:5000/auth/recover'
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const [, err] = await makeRequest(`${URL}/auth/recover`, config)
    if (err) {
      if (err.message === 'non-existing user') {
        Platform.OS === 'ios'
          ? Alert.alert('Usuario o correo invalido', 'No se encontro un usuario existente con estos datos.', [
              { text: 'OK' },
            ])
          : showToast(toast.current, 'Usuario o correo invalido.')
      } else {
        Platform.OS === 'ios'
          ? Alert.alert('Problema de conexión', 'Verifica tu conexión a internet e intenta de nuevo.', [
              { text: 'OK' },
            ])
          : showToast(toast.current, 'Problema de conexión')
      }
      return setLoading(false)
    }
    Alert.alert(
      '¡Te hemos enviado un correo!',
      'Haz click en el link que te hemos enviado a tu correo electrónico para recuperar tu contraseña.',
      [
        {
          text: 'OK',
          onPress: () => props.navigation.navigate('Login'),
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 45 }}>
        <Text style={[Styles.title, { color: colors.text }]}>¿Problemas iniciando sesión?</Text>
        <Text style={[Styles.info, { color: colors.grey2 }]}>
          Escribe tu usuario o tu correo electrónico y te enviaremos un link para recuperar tu cuenta.
        </Text>
        <Input
          containerStyle={{ marginVertical: 5 }}
          value={contact}
          onChangeText={(value) => setContact(value)}
          placeholder='Usuario o correo electrónico'
        />
        <Button containerStyle={{ paddingHorizontal: 10 }} onPress={submit} title='Enviar' loading={loading} />
      </ScrollView>
      <Button
        titleStyle={{ fontSize: 16 }}
        containerStyle={{ borderTopWidth: 0.5, borderTopColor: colors.divider, height: 40 }}
        title='Volver a inicio de sesión'
        onPress={() => props.navigation.navigate('Login')}
        type='clear'
      />
      <Toast ref={toast} style={{ backgroundColor: '#ef5350' }} positionValue={100} />
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  info: {
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 20,
  },
})

export default ForgotPassword
