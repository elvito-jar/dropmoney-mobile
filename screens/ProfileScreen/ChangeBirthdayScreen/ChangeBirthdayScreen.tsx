import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import React from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import DateTimeModalPicker from 'react-native-modal-datetime-picker'
import { useToast } from '../../../components/ToastGlobal'
import { useAuth } from '../../../hooks/useAuth'
import { MenuParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<MenuParamList, 'Birthday'>
  route: RouteProp<MenuParamList, 'Birthday'>
}

type Fields = {
  username: string
}

const ChangeBirthdayScreen: React.FC<Props> = ({ navigation, route }) => {
  const [show, setShow] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [birthDay, setBirthDay] = React.useState<Date>(moment(route.params.birthday).toDate())
  const toast = useToast()
  const { updateUser } = useAuth()

  const handleConfirm = (date: Date) => {
    setBirthDay(date)
    setShow(false)
  }

  const submit = async () => {
    setLoading(true)

    const [res, err] = await updateUser({ dateOfBirth: moment(birthDay).valueOf() })
    if (err) {
      setLoading(false)
      return toast.show('Ha ocurrido un error. Intenta de nuevo')
    }
    setLoading(false)
    navigation.goBack()
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={{ paddingTop: 20 }}>
        <View style={{ marginBottom: 30 }}>
          <ListItem bottomDivider topDivider onPress={() => setShow(true)}>
            <ListItem.Content>
              <ListItem.Title>Fecha de nacimiento: {moment(birthDay).format('DD/MM/YYYY')}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron name='chevron-down' size={24} />
          </ListItem>
        </View>
        <Button title='Listo' containerStyle={{ paddingHorizontal: 20 }} loading={loading} onPress={submit} />
        <DateTimeModalPicker
          isVisible={show}
          date={birthDay}
          mode='date'
          display='spinner'
          minimumDate={new Date(1960, 0, 1)}
          maximumDate={moment().subtract(5, 'y').toDate()}
          onConfirm={handleConfirm}
          onCancel={() => setShow(false)}
          headerTextIOS='Fecha de Nacimiento'
          cancelTextIOS='Cancelar'
          confirmTextIOS='Confirmar'
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
export default ChangeBirthdayScreen
