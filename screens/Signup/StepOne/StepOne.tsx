import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import AuthLayout from '../../../components/AuthLayout'
import useSignupState from '../../../hooks/useSignupState'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'StepOne'>
}

type InputFields = {
  lastName: string
  name: string
  cedula: string
}

const StepOne: React.FC<Props> = ({ navigation }) => {
  const input1 = React.useRef<Input>(undefined!)
  const input2 = React.useRef<Input>(undefined!)
  const input3 = React.useRef<Input>(undefined!)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { theme } = useTheme()
  const { control, handleSubmit, errors } = useForm<InputFields>()
  const state = useSignupState()

  const submit = (fields: InputFields) => {
    navigation.navigate('StepTwo')
  }

  React.useEffect(() => {
    if (errors.name) {
      input1.current.shake()
    }
    if (errors.lastName) {
      input2.current.shake()
    }
    if (errors.cedula) {
      input3.current.shake()
    }
  }, [errors])

  return (
    <AuthLayout>
      <ScrollView>
        <View style={Styles.container}>
          <Text style={[Styles.title, { color: theme.colors?.primary }]}>Cual es tu Nombre?</Text>
          <View style={Styles.inputsWrapper}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Controller
                control={control}
                rules={{ required: true }}
                name='name'
                defaultValue=''
                render={({ onChange, value }) => (
                  <Input
                    disabled={loading}
                    ref={input1}
                    autoFocus
                    textContentType='givenName'
                    autoCompleteType='name'
                    placeholder='Nombre'
                    clearButtonMode='while-editing'
                    inputContainerStyle={[
                      Styles.inputInner,
                      { borderColor: errors.name ? 'red' : 'rgba(0, 0, 0, 0.13)' },
                    ]}
                    inputStyle={{ fontSize: 15 }}
                    containerStyle={[Styles.inputContainer, { paddingRight: 5 }]}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    returnKeyType='next'
                    onSubmitEditing={() => input2.current.focus()}
                  />
                )}
              />
              <Controller
                control={control}
                name='lastName'
                defaultValue=''
                rules={{ required: true }}
                render={({ onChange, value }) => (
                  <Input
                    disabled={loading}
                    textContentType='familyName'
                    autoCompleteType='name'
                    ref={input2}
                    clearButtonMode='while-editing'
                    placeholder='Apellido'
                    inputContainerStyle={[
                      Styles.inputInner,
                      { borderColor: errors.lastName ? 'red' : 'rgba(0, 0, 0, 0.13)' },
                    ]}
                    inputStyle={{ fontSize: 15 }}
                    containerStyle={[Styles.inputContainer, { paddingLeft: 5 }]}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    returnKeyType='next'
                    onSubmitEditing={() => input3.current.focus()}
                  />
                )}
              />
            </View>
            <Controller
              control={control}
              name='cedula'
              rules={{ required: true }}
              defaultValue=''
              render={({ onChange, value }) => (
                <Input
                  ref={input3}
                  disabled={loading}
                  keyboardType='number-pad'
                  clearButtonMode='while-editing'
                  placeholder='Cedula'
                  inputContainerStyle={[
                    Styles.inputInner,
                    { borderColor: errors.cedula ? 'red' : 'rgba(0, 0, 0, 0.13)' },
                  ]}
                  inputStyle={{ fontSize: 15 }}
                  containerStyle={[Styles.inputContainer, { width: '100%', flex: 0 }]}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
          </View>
          <Text style={[Styles.helpText, { color: theme.colors?.grey2 }]}>
            Debes ingresar el nombre que corresponda con tu documento de identidad perteneciente.
          </Text>
          <Button
            loading={loading}
            disabled={loading}
            containerStyle={Styles.nextButton}
            title='Siguiente'
            onPress={handleSubmit(submit)}
          />
        </View>
      </ScrollView>
    </AuthLayout>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  inputsWrapper: {
    flexWrap: 'wrap',
    paddingTop: 20,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  inputInner: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: 'rgba(0, 0, 0, .1)',
  },
  helpText: {
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 10,
    fontWeight: '500',
  },
  nextButton: {
    height: 45,
    marginTop: 20,
  },
})

export default StepOne
