import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { useToast } from '../../../components/ToastGlobal'
import { useAuth } from '../../../hooks/useAuth'
import { MenuParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<MenuParamList, 'Username'>
  route: RouteProp<MenuParamList, 'Username'>
}

type Fields = {
  username: string
}

const ChangeUsernameScreen: React.FC<Props> = ({ navigation, route }) => {
  const { control, handleSubmit } = useForm()
  const [loading, setLoading] = React.useState<boolean>(false)
  const toast = useToast()
  const { updateUser } = useAuth()

  const submit = async ({ username }: Fields) => {
    setLoading(true)

    const [res, err] = await updateUser({ username })
    if (err) {
      setLoading(false)
      return toast.show('Ha ocurrido un error. Intenta de nuevo')
    }
    setLoading(false)
    navigation.goBack()
  }

  const onError = (errors: any) => {
    if (errors?.email?.type === 'pattern') {
      toast.show('Por favor. Ingresa un usuario valido')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={{ paddingTop: 20 }}>
        <ListItem containerStyle={{ marginBottom: 30 }} bottomDivider>
          <ListItem.Content style={[{ flex: 0 }]}>
            <ListItem.Title>Usuario :</ListItem.Title>
          </ListItem.Content>
          <Controller
            control={control}
            name='username'
            rules={{ pattern: /^[a-zA-Z0-9._]{6,20}$/ }}
            defaultValue={route.params.username}
            render={({ onChange, value }) => (
              <ListItem.Input
                clearButtonMode='always'
                onChangeText={onChange}
                inputStyle={[{ textAlign: 'left' }]}
                placeholder='Usuario'
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

export default ChangeUsernameScreen
