import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import AuthLayout from '../../../components/AuthLayout'
import Select from '../../../components/Select'
import useSignupState from '../../../hooks/useSignupState'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList, VenezuelaState } from '../../../types'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'StepThree'>
}

type InputFields = {
  address: string
  city: string
  zipCode: string
}

const StepThree: React.FC<Props> = ({ navigation }) => {
  const { control, handleSubmit, formState } = useForm<InputFields>()
  const [venezuelaState, setVenezuelaState] = React.useState<VenezuelaState>('Zulia')
  const theme = useTheme()
  const [showSelect, setShowSelect] = React.useState<boolean>(false)
  const state = useSignupState()
  const input2 = React.useRef<Input>(undefined!)
  const input3 = React.useRef<Input>(undefined!)

  const onDone = (state: VenezuelaState) => {
    setVenezuelaState(state)
    setShowSelect(false)
  }

  const onCancel = () => {
    setShowSelect(false)
  }

  const submit = (fields: InputFields) => {
    state.current = { ...state.current, ...fields, state: venezuelaState }
    navigation.navigate('StepFour')
  }

  return (
    <AuthLayout>
      <ScrollView style={Styles.container}>
        <Text style={[Styles.title, { color: theme.colors?.primary }]}>Cual es tu Dirección?</Text>
        <View style={Styles.formContainer}>
          <Controller
            control={control}
            name='address'
            rules={{ required: { value: true, message: 'Este campo es obligatorio.' } }}
            defaultValue=''
            render={({ onChange, value }) => (
              <Input
                autoFocus
                errorMessage={formState.errors.address?.message}
                textContentType='fullStreetAddress'
                autoCompleteType='street-address'
                placeholder='Dirección de Calle'
                clearButtonMode='while-editing'
                inputContainerStyle={[Styles.inputInner]}
                containerStyle={[Styles.inputContainer]}
                inputStyle={{ fontSize: 15 }}
                value={value}
                onChangeText={(value) => onChange(value)}
                returnKeyType='next'
                onSubmitEditing={() => input2.current.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name='zipCode'
            rules={{ required: { value: true, message: 'Este campo es obligatorio.' } }}
            defaultValue=''
            render={({ onChange, value }) => (
              <Input
                ref={input2}
                keyboardType='number-pad'
                errorMessage={formState.errors.zipCode?.message}
                textContentType='fullStreetAddress'
                autoCompleteType='street-address'
                placeholder='Codigo Postal'
                clearButtonMode='while-editing'
                inputContainerStyle={[Styles.inputInner]}
                containerStyle={[Styles.inputContainer, { width: '50%' }]}
                inputStyle={{ fontSize: 15 }}
                value={value}
                onChangeText={(value) => onChange(value)}
                returnKeyType='next'
                onSubmitEditing={() => input3.current.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name='city'
            rules={{ required: { value: true, message: 'Este campo es obligatorio.' } }}
            defaultValue=''
            render={({ onChange, value }) => (
              <Input
                ref={input3}
                textContentType='fullStreetAddress'
                autoCompleteType='street-address'
                errorMessage={formState.errors.city?.message}
                placeholder='Ciudad'
                clearButtonMode='while-editing'
                inputContainerStyle={[Styles.inputInner]}
                containerStyle={[Styles.inputContainer, { width: '50%' }]}
                inputStyle={{ fontSize: 15 }}
                value={value}
                onChangeText={(value) => onChange(value)}
                returnKeyType='next'
                onSubmitEditing={() => {
                  input3.current.blur()
                  setShowSelect(true)
                }}
              />
            )}
          />
          <Button
            icon={{
              name: 'chevron-down',
              type: 'font-awesome',
              size: 12,
            }}
            type='outline'
            iconRight={true}
            accessibilityLabel='Estado'
            onPress={() => setShowSelect(true)}
            title={venezuelaState}
            containerStyle={{ width: '100%', paddingHorizontal: 10 }}
            buttonStyle={[Styles.stateBtn, { borderColor: theme.colors?.grey0 }]}
            titleStyle={{ color: theme.colors?.grey1 }}
          />
        </View>
        <Button containerStyle={{ paddingHorizontal: 10 }} onPress={handleSubmit(submit)} title='Siguiente' />
        <Select state={venezuelaState} onDone={onDone} onCancel={onCancel} visible={showSelect} />
      </ScrollView>
    </AuthLayout>
  )
}

const Styles = StyleSheet.create({
  container: {
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
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  inputContainer: {
    width: '100%',
  },
  inputInner: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: 'rgba(0, 0, 0, .1)',
  },
  stateBtn: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
})

export default StepThree
