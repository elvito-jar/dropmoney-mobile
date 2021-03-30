import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import AuthLayout from '../../../components/AuthLayout'
import { URL } from '../../../constants'
import useSignupState from '../../../hooks/useSignupState'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'
import makeRequest from '../../../utils/makeRequest'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'UsernamePass'>
}

type InputFields = {
  username: string
  password: string
  repeatPassword: string
}

const UsernamePass: React.FC<Props> = (props) => {
  const theme = useTheme()
  const { control, formState, handleSubmit, setError, clearErrors } = useForm<InputFields>({
    mode: 'onSubmit',
    criteriaMode: 'all',
  })
  const [loading, setLoading] = React.useState<boolean>(false)
  const password = React.useRef<Input>(undefined!)
  const state = useSignupState()
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  const submit = async (fields: InputFields) => {
    setLoading(true)
    state.current = { ...state.current, ...fields }
    const [res, err] = await makeRequest(`${URL}/auth/check-register?username=${fields.username}`)
    console.log(res, err?.name)
    if (err) {
      if (err.name === 'FetchError') {
        clearErrors('username')
        setError('username', {
          type: 'validate',
          message: 'Este usuario ya esta ocupado.',
        })
      } else if (err.message === 'Network request failed') {
        Alert.alert(
          'Error de conexión.',
          'Hemos detectado problemas de conexión a internet. Chequea tu conexión e inténtalo de nuevo.',
          [{ text: 'OK' }],
          { cancelable: false }
        )
      }
      return setLoading(false)
    }
    setLoading(false)
    props.navigation.navigate('StepOne')
  }

  return (
    <AuthLayout>
      <ScrollView style={Styles.wrapper}>
        <Text style={[{ color: theme.colors?.primary }, Styles.title]}>Usuario y Contraseña</Text>
        <View style={Styles.form}>
          <Controller
            control={control}
            name='username'
            defaultValue=''
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
              pattern: {
                value: /^[a-zA-Z0-9._]{6,20}$/g,
                message: 'El usuario solo puede contener entre (6-20) caracteres, numero y un solo "_".',
              },
            }}
            render={({ onChange, value }) => (
              <Input
                errorMessage={formState.errors.username?.message}
                errorStyle={[Styles.errorMessage, { marginBottom: formState.errors.username ? 10 : 0 }]}
                placeholder='Usuario'
                textContentType='username'
                autoFocus
                disabled={loading}
                clearButtonMode='while-editing'
                containerStyle={Styles.inputContainer}
                inputContainerStyle={Styles.inputInner}
                inputStyle={{ fontSize: 15 }}
                onChangeText={onChange}
                returnKeyType='next'
                onSubmitEditing={() => password.current.focus()}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            defaultValue=''
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                message:
                  'La contraseña debe tener entre 8-20 caracteres, al menos una letra mayúscula, una minúscula y un dígito.',
              },
            }}
            render={({ onChange, value }) => (
              <Input
                errorMessage={formState.errors.password?.message}
                errorStyle={[Styles.errorMessage, { marginBottom: formState.errors.password ? 10 : 0 }]}
                ref={password}
                placeholder='Contraseña'
                disabled={loading}
                secureTextEntry={!showPassword}
                textContentType='password'
                containerStyle={Styles.inputContainer}
                inputContainerStyle={Styles.inputInner}
                inputStyle={{ fontSize: 15 }}
                onChangeText={onChange}
                rightIcon={{
                  name: showPassword ? 'eye-slash' : 'eye',
                  type: 'font-awesome',
                  color: '#868B8E',
                  onPress: () => setShowPassword(!showPassword),
                }}
                rightIconContainerStyle={{
                  paddingRight: 15,
                }}
                returnKeyType='next'
                value={value}
                onSubmitEditing={handleSubmit(submit)}
              />
            )}
          />
        </View>
        <Button
          containerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
          title='Siguiente'
          loading={loading}
          onPress={handleSubmit(submit)}
        />
      </ScrollView>
    </AuthLayout>
  )
}

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
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
  inputContainer: {
    flex: 1,
    flexBasis: '100%',
    borderBottomWidth: 0,
  },
  inputInner: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: 'rgba(0, 0, 0, .1)',
  },
  errorMessage: {},
})

export default UsernamePass
