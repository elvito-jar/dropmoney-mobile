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
import { Button } from 'react-native-elements'
import AuthLayout from '../../../components/AuthLayout'
import FullScreenLoader from '../../../components/FullScreenLoader'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'StepFive'>
}

const CODE_LENGTH = new Array(4).fill(0)

const StepFive: React.FC<Props> = (props) => {
  const [code, setCode] = React.useState<string>('')
  const [focus, setFocus] = React.useState<boolean>(false)
  const { theme } = useTheme()
  const input = React.useRef<TextInput>(undefined!)
  const [overlay, setOverlay] = React.useState<boolean>(false)
  const selectedIndex = React.useMemo(
    () => (code?.length < CODE_LENGTH.length ? code?.length : CODE_LENGTH.length - 1),
    [code]
  )
  const verifyCode = () => {}
  const handleChange = (value: string) => {
    if (code.length >= CODE_LENGTH.length) return null
    setCode((code + value).slice(0, CODE_LENGTH.length))
  }
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace') {
      setCode(code.slice(0, code.length - 1))
    }
  }

  return (
    <AuthLayout>
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
              onChangeText={handleChange}
              keyboardType='numeric'
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
          <Button
            titleStyle={{ fontSize: 14 }}
            type='clear'
            title='Enviar de nuevo.'
            onPress={() => alert('enviando de nuevo')}
          />
        </View>
        <Button containerStyle={{ paddingHorizontal: 15 }} title='Verificar Codigo' onPress={verifyCode} />
        <FullScreenLoader visible={true} />
      </ScrollView>
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
})

export default StepFive
