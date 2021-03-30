import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import DateTimeModalPicker from 'react-native-modal-datetime-picker'
import AuthLayout from '../../../components/AuthLayout'
import useSignupState from '../../../hooks/useSignupState'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'StepTwo'>
}

const StepTwo: React.FC<Props> = ({ navigation }) => {
  const [date, setDate] = React.useState<Date>(new Date(2000, 0, 1))
  const [show, setShow] = React.useState<boolean>(false)
  const theme = useTheme()
  const state = useSignupState()
  const handleConfirm = (date: Date) => {
    setDate(date)
    setShow(false)
  }

  const handleSubmit = () => {
    state.current = { ...state.current, birthday: date }
    navigation.navigate('StepThree')
  }

  return (
    <AuthLayout>
      <View style={Styles.container}>
        <Text style={[Styles.title, { color: theme.colors?.primary }]}>Cual es tu Fecha de Nacimiento?</Text>
        <Button
          raised
          accessibilityLabel='Date field'
          type='outline'
          containerStyle={Styles.dateContainerBtn}
          buttonStyle={[Styles.dateBtn, { borderColor: theme.colors?.grey3 }]}
          titleStyle={{ color: theme.colors?.grey1 }}
          title={moment(date).format('DD/MM/YYYY')}
          iconRight
          icon={{ name: 'chevron-down', type: 'font-awesome', size: 15 }}
          onPress={() => setShow(!show)}
        />
        <Button containerStyle={{ width: '100%', marginTop: 20 }} onPress={handleSubmit} title='Siguiente' />
        <DateTimeModalPicker
          isVisible={show}
          date={date}
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
    </AuthLayout>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  dateContainerBtn: {
    width: '100%',
    marginTop: 20,
  },
  dateBtn: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
})

export default StepTwo
