import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AsYouType, isPossibleNumber, isValidNumber } from 'libphonenumber-js'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { useToast } from '../../../components/ToastGlobal'
import { useAuth } from '../../../hooks/useAuth'
import { MenuParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<MenuParamList, 'PhoneNumber'>
  route: RouteProp<MenuParamList, 'PhoneNumber'>
}

type Fields = {
  phone: string
}

const ChangePhoneNumberScreen: React.FC<Props> = ({ navigation, route }) => {
  const { control, handleSubmit } = useForm()
  const [loading, setLoading] = React.useState<boolean>(false)
  const toast = useToast()
  const Formatter = React.useRef(new AsYouType('VE'))
  const { updateUser } = useAuth()

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

  const submit = async ({ phone }: Fields) => {
    setLoading(true)

    const [res, err] = await updateUser({ phones: [{ isoCode: 'VE', number: `+58${phone}` }] })
    if (err) {
      setLoading(false)
      return toast.show('Ha ocurrido un error. Intenta de nuevo')
    }
    setLoading(false)
    navigation.goBack()
  }

  const onError = (errors: any) => {
    if (errors?.phone) {
      toast.show('Numero invalido. Ej: 424 6170000')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={{ paddingTop: 20 }}>
        <ListItem containerStyle={{ marginBottom: 30 }} bottomDivider>
          <ListItem.Content style={[{ flex: 0 }]}>
            <ListItem.Title>+58 </ListItem.Title>
          </ListItem.Content>
          <Controller
            control={control}
            name='phone'
            rules={{
              validate: {
                valid: validateNumber,
              },
            }}
            defaultValue={normalizeTel(route.params.phone)}
            render={({ onChange, value }) => (
              <ListItem.Input
                clearButtonMode='always'
                onChangeText={(value) => onChange(normalizeTel(value))}
                inputStyle={[{ textAlign: 'left' }]}
                placeholder='Numero celular'
                value={value}
              />
            )}
          />
        </ListItem>
        <Button
          title='Listo'
          containerStyle={{ paddingHorizontal: 20 }}
          loading={loading}
          onPress={handleSubmit(submit, onError)}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ChangePhoneNumberScreen
