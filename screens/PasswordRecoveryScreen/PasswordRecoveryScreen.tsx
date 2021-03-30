import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native'
import { Button, Input as Einput } from 'react-native-elements'
import { useCustomAlert } from '../../components/CustomAlert'
import Input from '../../components/Input'
import { URL } from '../../constants'
import useTheme from '../../hooks/useTheme'
import { RootStackParamList } from '../../types'
import makeRequest from '../../utils/makeRequest'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PasswordRecovery'>
  route: RouteProp<RootStackParamList, 'PasswordRecovery'>
}

type FormFields = {
  password: string
  verifyPassword: string
}

const token = '5a3ffbdc46c5c0c1d46a5b542c2917fa40f6d5d7/elvitop'

const PasswordRecoveryScreen: React.FC<Props> = (props) => {
  const { colors, dark } = useTheme()
  const { control, formState, handleSubmit, watch } = useForm<FormFields>()
  const verifyPswd = React.useRef<Einput>(undefined!)
  const [loading, setLoading] = React.useState<boolean>(false)
  const password = watch('password')
  const customAlert = useCustomAlert()

  React.useEffect(() => {
    const init = async () => {
      const [, err] = await makeRequest(
        `${URL}/auth/reset/${props.route.params.token}/${props.route.params.username}`
      )
      if (err) {
        if (err.message === 'Invalid Token') {
          Alert.alert('Link expirado', 'Este link para la restauración de tu contraseña ha expirado.', [
            { text: 'OK' },
          ])
          return props.navigation.navigate('Presentation')
        }
      }
    }
    init()
  }, [])

  const submit = async (fields: FormFields) => {
    setLoading(true)
    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: fields.password }),
    }
    const [, err] = await makeRequest(`${URL}/auth/recover/${props.route.params.token}`, config)
    if (err) {
      if (err.message === 'The password reset token is invalid or has expired.') {
        Alert.alert(
          'Link invalido',
          'Este link es inválido o ha expirado. Por favor haz una nueva solicitud para el cambio de contraseña.',
          [{ text: 'OK' }]
        )
        setLoading(false)
        return props.navigation.navigate('Presentation')
      } else {
        setLoading(false)
        return Platform.OS === 'ios'
          ? Alert.alert('Problema de conexión', 'Verifica tu conexión a intenet y vuelve a intentarlo.', [
              { text: 'OK' },
            ])
          : ToastAndroid.show('Problemas de conexión', ToastAndroid.SHORT)
      }
    }
    customAlert.show(
      'Se ha cambiado su contraseña satisfactoriamente. Ya puedes iniciar sesión con esta contraseña a partir de ahora.',
      () => {
        props.navigation.navigate('Presentation')
      }
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? colors.background : '#fff' }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 40 }}>
        <Text style={[Styles.title, { color: colors.text }]}>Restaura tu contraseña</Text>
        <Controller
          control={control}
          name='password'
          rules={{
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
              message:
                'La contraseña debe tener entre 8-20 caracteres, al menos una letra mayúscula, una minúscula y un dígito.',
            },
          }}
          defaultValue=''
          render={({ onChange, value }) => (
            <Input
              errorMessage={formState.errors.password?.message}
              placeholder='Contraseña'
              returnKeyType='next'
              secureTextEntry
              textContentType='password'
              onChangeText={onChange}
              onSubmitEditing={() => verifyPswd.current.focus()}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='verifyPassword'
          defaultValue=''
          rules={{ validate: (value) => (password === value ? true : 'Las contraseñas no coinciden.') }}
          render={({ onChange, value }) => (
            <Input
              ref={verifyPswd}
              errorMessage={formState.errors.verifyPassword?.message}
              placeholder='Verifique su contraseña'
              returnKeyType='done'
              secureTextEntry
              textContentType='password'
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(submit)}
              value={value}
            />
          )}
        />
        <Text style={[Styles.info, { color: colors.grey2 }]}>
          Las contraseñas deben coincidir, una vez cambiada podrás iniciar sesión con esta nueva contraseña.
        </Text>
        <Button
          containerStyle={{ paddingHorizontal: 10 }}
          title='Restaurar'
          onPress={handleSubmit(submit)}
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  info: {
    textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 20,
  },
})

export default PasswordRecoveryScreen
