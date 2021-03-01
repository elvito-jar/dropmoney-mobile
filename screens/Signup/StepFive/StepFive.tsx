import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Toast from 'react-native-easy-toast'
import { Button } from 'react-native-elements'
import AuthLayout from '../../../components/AuthLayout'
import FullScreenLoader from '../../../components/FullScreenLoader'
import ToastMessage from '../../../components/ToastMessage'
import { useAuth } from '../../../hooks/useAuth'
import useSignupState from '../../../hooks/useSignupState'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'
import makeRequest from '../../../utils/makeRequest'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'StepFive'>
}

const CODE_LENGTH = new Array(4).fill(0)

const StepFive: React.FC<Props> = (props) => {
  const toast = React.useRef<Toast | null>(undefined!)
  const [code, setCode] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const state = useSignupState()
  const [visibleLoader, setVisibleLoader] = React.useState<boolean>(false)
  const [successLoader, setSuccessLoader] = React.useState<boolean>(false)
  const [focus, setFocus] = React.useState<boolean>(false)
  const { theme } = useTheme()
  const { signup } = useAuth()
  const input = React.useRef<TextInput>(undefined!)
  const [overlay, setOverlay] = React.useState<boolean>(false)
  const selectedIndex = React.useMemo(
    () => (code?.length < CODE_LENGTH.length ? code?.length : CODE_LENGTH.length - 1),
    [code]
  )

  const handleChange = (value: string) => {
    if (code.length >= CODE_LENGTH.length) return null
    setCode((code + value).slice(0, CODE_LENGTH.length))
  }

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace') {
      setCode(code.slice(0, code.length - 1))
    }
  }

  const showToast = (message: string) => {
    toast.current?.show(<ToastMessage message={message} />, 3000)
  }

  const resendCode = async () => {
    setVisibleLoader(true)
    const newValidationCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
    await AsyncStorage.setItem('@phoneNumber_codeValidation', newValidationCode)
    const formData = new FormData()
    formData.append('code', newValidationCode)
    const config: RequestInit = {
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'POST',
      body: formData,
    }
    const [res, err] = await makeRequest('http://localhost:5999/auth/phoneValidation', config)
    if (err) {
      setVisibleLoader(false)
      showToast('Ha ocurrido un error enviando el mensaje. Intentalo de nuevo.')
    } else {
      setSuccessLoader(true)
      setTimeout(() => {
        setVisibleLoader(false)
        setSuccessLoader(false)
      }, 500)
    }
  }

  const submit = async () => {
    setLoading(true)
    const validationCode = await AsyncStorage.getItem('@phoneNumber_codeValidation')
    console.log(validationCode, code !== validationCode)
    if (code !== validationCode) {
      setLoading(false)
      return showToast('Codigo incorrecto.')
    }
    const [, err] = await signup(state.current)
    if (err) {
      console.log(err.data)
      setLoading(false)
      return showToast('Ha ocurrido un error. Intentalo de nuevo')
    }
    props.navigation.navigate('SuccessSignup')
    setLoading(false)
  }

  return (
    <AuthLayout>
      <>
        <ScrollView style={Styles.wrapper}>
          <Text style={[Styles.title, { color: theme.colors?.primary }]}>Código de Verificación</Text>
          <Text style={[Styles.infoText, { color: theme.colors?.grey1 }]}>
            Asegurémonos de que sea realmente para ti. Hemos enviado un mensaje con un código de verificación al
            número telefónico que termina en:{'\n'} <Text style={{ fontWeight: 'bold' }}>******2493</Text>
          </Text>
          <TouchableWithoutFeedback onPress={() => input.current.focus()}>
            <View style={Styles.form}>
              {CODE_LENGTH.map((v, i) => (
                <View style={Styles.cell} key={i}>
                  <Text style={{ fontSize: 24, color: theme.colors?.primary, fontWeight: 'bold' }}>
                    {code[i] || ''}
                  </Text>
                </View>
              ))}
              <TextInput
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                autoFocus
                editable={!loading}
                textContentType='oneTimeCode'
                onChangeText={handleChange}
                keyboardType='number-pad'
                style={[
                  Styles.input,
                  {
                    color: theme.colors?.primary,
                    left: selectedIndex * 70 + 10 + selectedIndex * 14,
                    opacity: code.length >= CODE_LENGTH.length ? 0 : 1,
                  },
                ]}
                value=''
                onKeyPress={handleKeyPress}
                ref={input}
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              marginTop: -10,
            }}>
            <Text style={{ margin: 0, marginHorizontal: 0, color: theme.colors?.grey1, fontSize: 14 }}>
              ¿No recibió el código?
            </Text>
            <Button titleStyle={{ fontSize: 14 }} type='clear' title='Enviar de nuevo.' onPress={resendCode} />
          </View>
          <Button
            loading={loading}
            containerStyle={{ paddingHorizontal: 15 }}
            title='Verificar Codigo'
            onPress={submit}
          />
          <FullScreenLoader visible={visibleLoader} message='El mensaje se ha enviado' success={successLoader} />
        </ScrollView>
        <Toast ref={toast} style={{ backgroundColor: '#ef5350' }} positionValue={100} />
      </>
    </AuthLayout>
  )
}

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cell: {
    width: 70,
    height: 45,
    marginHorizontal: 7,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.11)',
    fontSize: 24,
    textAlign: 'center',
    width: 70,
    borderRadius: 5,
    marginHorizontal: 7,
    top: 0,
    bottom: 0,
  },
  infoText: {
    paddingHorizontal: 15,
    textAlign: 'center',
    marginBottom: 0,
  },
  toast: { width: 300 },
})

export default StepFive
