import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { useToast } from '../../../components/ToastGlobal'
import { URL } from '../../../constants'
import { useAuth } from '../../../hooks/useAuth'
import useTheme from '../../../hooks/useTheme'
import { MenuParamList } from '../../../types'
import makeRequest from '../../../utils/makeRequest'

type Props = {
  navigation: StackNavigationProp<MenuParamList, 'Password'>
  route: RouteProp<MenuParamList, 'Password'>
}

type Fields = {
  current: string
  password: string
  confirmPassword: string
}

const ChangePasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const { control, handleSubmit, watch } = useForm()
  const [loading, setLoading] = React.useState<boolean>(false)
  const { colors } = useTheme()
  const toast = useToast()
  const { state } = useAuth()
  const password = watch('password')

  const submit = async ({ current, password }: Fields) => {
    setLoading(true)
    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.userToken}`,
      },
      body: JSON.stringify({ oldpwd: current, newpwd: password }),
    }
    const [, err] = await makeRequest(`${URL}/auth/change/${state.user._id}`, config)
    if (err) {
      if (err.name === 'FetchError') {
        toast.show('Tu contraseña actual no es correcta')
      } else {
        toast.show('Ha ocurrido un error. Intenta de nuevo')
      }
      return setLoading(false)
    }
    setLoading(false)
    navigation.goBack()
  }

  const onError = (errors: any) => {
    console.log(control.getValues())
    if (errors?.current) {
      toast.show('Debes ingresar tu actual contraseña.')
    } else if (errors?.password) {
      toast.show('Formato de contraseña invalido.')
    } else if (errors?.confirmPassword) {
      toast.show('Las contraseñas no coinciden.')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false} style={{ flex: 1 }}>
      <View style={{ paddingTop: 20 }}>
        <View style={{ marginBottom: 30 }}>
          <View>
            <ListItem pad={6}>
              <ListItem.Content style={[{ flex: 0 }]}>
                <ListItem.Title>Actual:</ListItem.Title>
              </ListItem.Content>
              <Controller
                control={control}
                name='current'
                rules={{ required: true }}
                defaultValue={''}
                render={({ onChange, value }) => (
                  <ListItem.Input
                    clearButtonMode='while-editing'
                    onChangeText={onChange}
                    inputStyle={[{ textAlign: 'left', fontSize: 16 }]}
                    placeholder='Contraseña actual'
                    value={value}
                  />
                )}
              />
            </ListItem>
            <Text
              style={{
                backgroundColor: '#fff',
                paddingBottom: 10,
                paddingHorizontal: 20,
                color: colors.grey2,
              }}>
              Para cambiar tu contraseña debes proporcionar tu contraseña actual para verificar el cambio.
            </Text>
          </View>
          <View>
            <ListItem pad={6} topDivider>
              <ListItem.Content style={[{ flex: 0 }]}>
                <ListItem.Title>Nueva:</ListItem.Title>
              </ListItem.Content>
              <Controller
                control={control}
                name='password'
                rules={{ pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, required: true }}
                defaultValue={''}
                render={({ onChange, value }) => (
                  <ListItem.Input
                    clearButtonMode='while-editing'
                    onChangeText={onChange}
                    inputStyle={[{ textAlign: 'left', fontSize: 16 }]}
                    placeholder='Nueva contraseña'
                    value={value}
                  />
                )}
              />
            </ListItem>
            <Text
              style={{
                backgroundColor: '#fff',
                paddingBottom: 10,
                paddingHorizontal: 20,
                color: colors.grey2,
              }}>
              La contraseña debe tener entre 8-20 caracteres, al menos una letra mayúscula, una minúscula y un
              dígito.
            </Text>
          </View>
          <ListItem bottomDivider topDivider pad={6}>
            <ListItem.Content style={[{ flex: 0 }]}>
              <ListItem.Title>Confirmar:</ListItem.Title>
            </ListItem.Content>
            <Controller
              control={control}
              name='confirmPassword'
              rules={{ validate: (value) => value === password, required: true }}
              defaultValue={''}
              render={({ onChange, value }) => (
                <ListItem.Input
                  clearButtonMode='while-editing'
                  onChangeText={onChange}
                  inputStyle={[{ textAlign: 'left', fontSize: 16 }]}
                  placeholder='Confirmar contraseña'
                  value={value}
                />
              )}
            />
          </ListItem>
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

export default ChangePasswordScreen
