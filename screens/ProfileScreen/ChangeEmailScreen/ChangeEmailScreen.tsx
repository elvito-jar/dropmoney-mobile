import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { useToast } from '../../../components/ToastGlobal'
import { useAuth } from '../../../hooks/useAuth'
import useTheme from '../../../hooks/useTheme'
import { MenuParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<MenuParamList, 'Email'>
  route: RouteProp<MenuParamList, 'Email'>
}

type Fields = {
  email: string
}

const ChangeEmailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { control, handleSubmit } = useForm()
  const [loading, setLoading] = React.useState<boolean>(false)
  const { colors } = useTheme()
  const toast = useToast()
  const { updateUser } = useAuth()

  const submit = async ({ email }: Fields) => {
    setLoading(true)
    const [, err] = await updateUser({ email })
    if (err) {
      setLoading(false)
      let message = 'Ha ocurrido un error. Intenta de nuevo'
      message = err.message === '' ? 'Ya este correo esta ocupado' : message
      return toast.show(message)
    }
    setLoading(false)
    navigation.goBack()
  }

  const onError = (errors: any) => {
    if (errors?.email?.type === 'pattern') {
      toast.show('Por favor. Ingresa un email valido')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={{ paddingTop: 20 }}>
        <ListItem bottomDivider>
          <ListItem.Content style={[{ flex: 0 }]}>
            <ListItem.Title>Email :</ListItem.Title>
          </ListItem.Content>
          <Controller
            control={control}
            name='email'
            rules={{ pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
            defaultValue={route.params.email}
            render={({ onChange, value }) => (
              <ListItem.Input
                clearButtonMode='always'
                containerStyle={[styles.input]}
                onChangeText={onChange}
                inputStyle={[{ textAlign: 'left' }]}
                placeholder='Email'
                value={value}
              />
            )}
          />
        </ListItem>
        <View style={{ backgroundColor: '#fff', marginBottom: 30 }}>
          <Text
            style={{
              color: colors.grey2,
              fontWeight: '500',
              textAlign: 'center',
              padding: 15,
              paddingVertical: 20,
              fontSize: 15,
            }}>
            Al cambiar tu correo electrónico se te enviará un email confirmando el cambio.
          </Text>
        </View>
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

const styles = StyleSheet.create({
  input: {},
})

export default ChangeEmailScreen
