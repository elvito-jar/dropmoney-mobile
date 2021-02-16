import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import AuthLayout from '../../../components/AuthLayout'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'UsernamePass'>
}

type InputFields = {
  username: string
  password: string
  repeatPassword: string
}

const UsernamePass: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  const { control, formState, handleSubmit } = useForm<InputFields>({ mode: 'onSubmit', criteriaMode: 'all' })
  const { errors } = formState
  const [loading, setLoading] = React.useState<boolean>(false)
  const password = React.useRef<Input>(undefined!)
  const repeatPassword = React.useRef<Input>(undefined!)

  const submit = (fields: InputFields) => {
    console.log(fields)
    props.navigation.navigate('StepOne')
  }

  console.log(errors, 'reiniciando')

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
                errorMessage={errors.username?.message}
                errorStyle={[Styles.errorMessage, { marginBottom: errors.username ? 10 : 0 }]}
                placeholder='Usuario'
                autoFocus
                disabled={loading}
                clearButtonMode='while-editing'
                containerStyle={Styles.inputContainer}
                inputContainerStyle={Styles.inputInner}
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
                value: /^(?=.*[a-zA-Z])(?=.*[\d]).\S{8,}$/g,
                message:
                  'La contraseña debe contener al menos 8 caracteres, una letra mayuscula, un numero y sin espacios y solo acepta caracteres, caracteres especiales(@$?-._), numeros',
              },
            }}
            render={({ onChange, value }) => (
              <Input
                errorMessage={errors.password?.message}
                errorStyle={[Styles.errorMessage, { marginBottom: errors.password ? 10 : 0 }]}
                ref={password}
                placeholder='Contraseña'
                disabled={loading}
                secureTextEntry
                textContentType='password'
                clearButtonMode='while-editing'
                containerStyle={Styles.inputContainer}
                inputContainerStyle={Styles.inputInner}
                onChangeText={onChange}
                returnKeyType='next'
                value={value}
                onSubmitEditing={() => repeatPassword.current.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name='repeatPassword'
            defaultValue=''
            rules={{
              required: { value: true, message: 'Este campo es obligatorio.' },
              validate: {
                repeat: (value) => value === control.getValues().password || 'Las contraseñas deben coincidir.',
              },
            }}
            render={({ onChange, value }) => (
              <Input
                errorMessage={errors.repeatPassword?.message}
                errorStyle={[Styles.errorMessage, { marginBottom: errors.repeatPassword ? 10 : 0 }]}
                ref={repeatPassword}
                placeholder='Escribe de nuevo la Contraseña'
                disabled={loading}
                secureTextEntry
                textContentType='password'
                clearButtonMode='while-editing'
                containerStyle={Styles.inputContainer}
                inputContainerStyle={[Styles.inputInner, {}]}
                onChangeText={onChange}
                returnKeyType='done'
                value={value}
                onSubmitEditing={handleSubmit(submit)}
              />
            )}
          />
        </View>
        <Button
          containerStyle={{ paddingHorizontal: 10 }}
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
  },
  inputInner: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  errorMessage: {},
})

export default UsernamePass
