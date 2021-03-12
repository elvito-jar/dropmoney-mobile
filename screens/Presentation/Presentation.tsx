import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { RootStackParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Presentation'>
}

const Presentation: React.FC<Props> = ({ navigation }) => (
  <View style={Styles.container}>
    <View style={Styles.main}>
      <Text style={{ fontSize: 40 }}>Presentacion DropMoney</Text>
    </View>
    <View>
      <Button
        buttonStyle={Styles.btn}
        titleStyle={Styles.btnTitle}
        title='Crear una cuenta'
        onPress={() => navigation.navigate('PasswordRecovery')}
      />
      <Button
        buttonStyle={[Styles.btn, { backgroundColor: '#B9B7BD' }]}
        titleStyle={Styles.btnTitle}
        title='Iniciar Sesión'
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  </View>
)

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 20,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 40,
    marginVertical: 5,
  },
  btnTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})

export default Presentation
