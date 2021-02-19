import { StackNavigationProp } from '@react-navigation/stack'
import { AsYouType, isPossibleNumber, isValidNumber } from 'libphonenumber-js'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import AuthLayout from '../../../components/AuthLayout'
import useSignupState from '../../../hooks/useSignupState'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'StepThree'>
}

type InputFields = {
  email: string
  phoneNumber: string
}

const StepFour: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme()
  const { control, handleSubmit, formState } = useForm<InputFields>({ mode: 'onSubmit' })
  const [loading, setLoading] = React.useState<boolean>(false)
  const input2 = React.useRef<Input>(undefined!)
  const state = useSignupState()
  const Formatter = React.useRef(new AsYouType('VE'))
  const { errors } = formState

  const normalizeTel = (value: string) => {
    if (value[0] === '0') return ''
    Formatter.current.reset()
    value = value.replace('+58 ', '').replace(/\s/g, '') || ''
    value = value ? Formatter.current.input(`+58${value}`) : ''
    return value.substr(4)
  }

  const validateNumber = (number: string) => {
    number = `+58 ${number}`
    return (
      (isPossibleNumber(number, 'VE') && isValidNumber(number, 'VE')) ||
      'Debe ingresar un numero celular valido. Ej: 424 6170000'
    )
  }

  const submit = (fields: InputFields) => {
    setLoading(true)
    state.current = { ...state.current, ...fields }
    setTimeout(() => {
      navigation.navigate('StepFive')
    }, 1000)
  }

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

  return (
    <AuthLayout>
      <ScrollView style={Styles.wrapper}>
        <Text style={[Styles.title, { color: theme.colors?.primary }]}>Como podriamos contactarte?</Text>
        <View style={Styles.form}>
          <Controller
            control={control}
            name='email'
            defaultValue=''
            rules={{
              required: { value: true, message: 'Este campo es obligatorio.' },
              pattern: { value: emailRegex, message: 'Debe introducir un correo electronico valido.' },
            }}
            render={({ onChange, value }) => (
              <Input
                errorMessage={errors.email?.message}
                errorStyle={{ marginBottom: errors.email?.message ? 10 : 0 }}
                disabled={loading}
                placeholder='Correo electronico'
                autoFocus
                textContentType='emailAddress'
                autoCompleteType='email'
                clearButtonMode='while-editing'
                containerStyle={Styles.inputContainer}
                inputContainerStyle={[Styles.inputInner]}
                inputStyle={{ fontSize: 15 }}
                value={value}
                keyboardType='email-address'
                onChangeText={(value) => onChange(value)}
                returnKeyType='next'
                onSubmitEditing={() => input2.current.focus()}
              />
            )}
          />
          <View style={[Styles.form, { width: '100%' }]}>
            <View style={[Styles.leftTel, { backgroundColor: theme.colors?.grey5 }]}>
              <Text style={{ color: theme.colors?.grey2 }}>+58</Text>
            </View>
            <Controller
              control={control}
              name='phoneNumber'
              defaultValue=''
              rules={{
                required: { value: true, message: 'Este campo es obligatorio.' },
                validate: {
                  valid: validateNumber,
                },
              }}
              render={({ onChange, value }) => (
                <Input
                  errorStyle={{ display: 'none' }}
                  ref={input2}
                  disabled={loading}
                  placeholder='Numero Telefonico'
                  maxLength={11}
                  textContentType='telephoneNumber'
                  autoCompleteType='tel'
                  keyboardType='number-pad'
                  clearButtonMode='while-editing'
                  containerStyle={[Styles.inputContainer, { paddingLeft: 0 }]}
                  inputContainerStyle={[Styles.inputInner, { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }]}
                  inputStyle={{ fontSize: 15 }}
                  value={value}
                  onChangeText={(value) => onChange(normalizeTel(value))}
                  returnKeyType='done'
                  onSubmitEditing={handleSubmit(submit)}
                />
              )}
            />
            {errors.phoneNumber?.message && (
              <Text style={[Styles.errorPhone]}>{errors.phoneNumber?.message || ''}</Text>
            )}
          </View>
        </View>
        <Text style={[Styles.infoText, { color: theme.colors?.grey1 }]}>
          Te enviaremos un correo y código de verificación al respectivo correo y número telefónico escrito aquí.
        </Text>
        <Button
          loading={loading}
          containerStyle={{ paddingHorizontal: 10 }}
          title='Verificar Celular'
          onPress={handleSubmit(submit)}
        />
      </ScrollView>
    </AuthLayout>
  )
}

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: '500',
    marginBottom: 20,
  },
  form: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  leftTel: {
    width: 50,
    marginLeft: 10,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .1)',
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  inputContainer: {
    flex: 1,
  },
  inputInner: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: 'rgba(0, 0, 0, .1)',
  },
  errorPhone: {
    flexBasis: '100%',
    color: 'red',
    padding: 5,
    paddingBottom: 0,
    fontSize: 12,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  infoText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
  },
})

export default StepFour
