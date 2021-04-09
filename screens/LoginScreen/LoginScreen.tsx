import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { Button, Header, Input as RefInput } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Input from '../../components/Input'
import ToastMessage from '../../components/ToastMessage'
import { useAuth } from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'
import { RootStackParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

type InputFields = {
  email: string
  password: string
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { control, handleSubmit } = useForm<InputFields>()
  const theme = useTheme()
  const { signin } = useAuth()
  const toast = React.useRef<Toast>(undefined!)
  const [loading, setLoading] = React.useState<boolean>(false)
  const password = React.useRef<RefInput>(undefined!)

  const showToast = (message: string) => {
    toast.current?.show(<ToastMessage message={message} />, 3000)
  }

  const submit = async (fields: InputFields) => {
    Keyboard.dismiss()
    setLoading(true)
    const [, err] = await signin(fields.email, fields.password)
    if (err) {
      if (err.name === 'FetchError') {
        if (err.data?.message === 'your account has not been verified') {
          showToast('Tu cuenta aún no ha sido verificada.')
        } else {
          showToast('Correo o contraseña incorrectos.')
        }
      } else {
        showToast('Ha ocurrido un error. Intentalo de nuevo')
      }
      return setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        leftComponent={{
          icon: 'angle-left',
          type: 'font-awesome',
          size: 34,
          color: theme.colors?.primary,
          onPress: () => navigation.goBack(),
        }}
        backgroundColor='transparent'
        containerStyle={{
          borderBottomWidth: 0,
        }}
      />
      <Text style={Styles.title}>Bienvenido de vuelta!</Text>
      <ScrollView
        scrollEnabled={false}
        bounces={false}
        contentContainerStyle={{ alignItems: 'flex-start', paddingHorizontal: 8, paddingTop: 30 }}
        style={{ flex: 1 }}>
        <Text style={Styles.formLabel}>INFORMACIÓN DE CUENTA</Text>
        <Controller
          control={control}
          name='email'
          defaultValue=''
          render={({ onChange, value }) => (
            <Input
              placeholder='Correo electronico'
              autoFocus
              keyboardType='email-address'
              containerStyle={{ marginBottom: 10 }}
              errorStyle={{ display: 'none' }}
              clearButtonMode='while-editing'
              returnKeyType='next'
              textContentType='emailAddress'
              onChangeText={onChange}
              onSubmitEditing={() => password.current.focus()}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          defaultValue=''
          render={({ onChange, value }) => (
            <Input
              ref={password}
              placeholder='Contraseña'
              containerStyle={{ marginBottom: 10 }}
              errorStyle={{ display: 'none' }}
              returnKeyType='done'
              secureTextEntry
              textContentType='password'
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(submit)}
              value={value}
            />
          )}
        />
        <View>
          <Button
            buttonStyle={{ padding: 0, paddingLeft: 10, marginTop: 2 }}
            title='¿Se te olvido la contraseña?'
            type='clear'
            onPress={() => navigation.navigate('ForgotPassword')}
            titleStyle={{ fontSize: 12 }}
          />
        </View>
      </ScrollView>
      <View style={Styles.btnContainer}>
        <Button titleStyle={Styles.btnTitle} onPress={() => navigation.goBack()} title='Cancelar' type='clear' />
        <Button
          buttonStyle={{ borderRadius: 50, paddingHorizontal: 15 }}
          loading={loading}
          titleStyle={Styles.btnTitle}
          title='Iniciar sesión'
          onPress={handleSubmit(submit)}
        />
      </View>
      <Toast ref={toast} style={{ backgroundColor: '#ef5350' }} positionValue={100} />
      <KeyboardSpacer topSpacing={62} />
    </View>
  )
}

const Styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formLabel: {
    fontWeight: 'bold',
    fontSize: 13,
    paddingLeft: 10,
    marginBottom: 12,
  },
  btnContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTitle: {
    fontSize: 15,
  },
})

export default LoginScreen
