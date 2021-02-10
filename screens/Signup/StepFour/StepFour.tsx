import { StackNavigationProp } from '@react-navigation/stack'
import { AsYouType } from 'libphonenumber-js/min'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import AuthLayout from '../../../components/AuthLayout'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'StepThree'>
}

type InputFields = {
  email: string
  numberTel: string
}

const StepFour: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme()
  const { control, handleSubmit, errors } = useForm<InputFields>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const input2 = React.useRef<Input>(undefined!)
  const Formatter = React.useRef(new AsYouType('VE'))

  const normalizeTel = (value: string) => {
    if (value[0] === '0') return ''
    Formatter.current.reset()
    value = value.replace('+58 ', '').replace(/\s/g, '') || ''
    value = value ? Formatter.current.input(`+58${value}`) : ''
    return value.substr(4)
  }

  const onSubmit = (data: InputFields) => {
    console.log(data)
  }

  return (
    <AuthLayout>
      <ScrollView style={Styles.wrapper}>
        <Text style={[Styles.title, { color: theme.colors?.primary }]}>Como podriamos contactarte?</Text>
        <View style={Styles.form}>
          <Controller
            control={control}
            name='email'
            defaultValue=''
            rules={{ required: true, max: 11 }}
            render={({ onChange, value }) => (
              <Input
                disabled={loading}
                placeholder='Correo electronico'
                autoFocus
                textContentType='emailAddress'
                autoCompleteType='email'
                clearButtonMode='while-editing'
                containerStyle={Styles.inputContainer}
                inputContainerStyle={[Styles.inputInner]}
                value={value}
                keyboardType='email-address'
                onChangeText={(value) => onChange(value)}
                returnKeyType='next'
                onSubmitEditing={() => input2.current.focus()}
              />
            )}
          />
          <View style={[Styles.form, { width: '100%' }]}>
            <View
              style={[Styles.leftTel, { backgroundColor: theme.colors?.grey5, borderColor: theme.colors?.grey3 }]}>
              <Text style={{ color: theme.colors?.grey2 }}>+58</Text>
            </View>
            <Controller
              control={control}
              name='numberTel'
              defaultValue=''
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <Input
                  ref={input2}
                  disabled={loading}
                  placeholder='Numero Telefonico'
                  autoFocus
                  maxLength={11}
                  textContentType='telephoneNumber'
                  autoCompleteType='tel'
                  keyboardType='number-pad'
                  clearButtonMode='while-editing'
                  containerStyle={[Styles.inputContainer, { paddingLeft: 0 }]}
                  inputContainerStyle={[Styles.inputInner, { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }]}
                  value={value}
                  onChangeText={(value) => onChange(normalizeTel(value))}
                  returnKeyType='done'
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
          </View>
        </View>
        <Button
          containerStyle={{ paddingHorizontal: 10 }}
          title='Verificar Celular'
          onPress={handleSubmit(onSubmit)}
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
  },
})

export default StepFour
