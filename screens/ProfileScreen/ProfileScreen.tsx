import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import React from 'react'
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { useToast } from '../../components/ToastGlobal'
import { useAuth } from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'
import { MenuParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<MenuParamList, 'Menu'>
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme()
  const { state, updateUser, dispatch, signout } = useAuth()
  const toast = useToast()

  const publicChange = async () => {
    dispatch({ type: 'UPDATE_TOKEN', user: { ...state.user, isPublic: !state.user.isPublic } })
    const [, err] = await updateUser({ isPublic: !state.user.isPublic })
    if (err) {
      dispatch({ type: 'UPDATE_TOKEN', user: { ...state.user, isPublic: state.user.isPublic } })
      return toast.show('Ha ocurrido un error. Intentalo de nuevo')
    }
  }

  return (
    <ScrollView>
      <View style={[{ paddingTop: 10 }]}>
        <View>
          <Text style={[styles.titleSeparator]}>Informacion personal</Text>
          <ListItem
            containerStyle={{ padding: 10, paddingLeft: 20 }}
            pad={10}
            topDivider
            bottomDivider
            onPress={() => navigation.navigate('Username', { username: state.user.username })}>
            <ListItem.Content>
              <ListItem.Title>Usuario</ListItem.Title>
            </ListItem.Content>
            <Text>{state.user.username}</Text>
            <ListItem.Chevron size={24} />
          </ListItem>
          <ListItem
            containerStyle={{ padding: 10, paddingLeft: 20 }}
            bottomDivider
            onPress={() => navigation.navigate('Email', { email: state.user.email })}>
            <ListItem.Content>
              <ListItem.Title>Email</ListItem.Title>
            </ListItem.Content>
            <Text>{state.user.email}</Text>
            <ListItem.Chevron size={24} />
          </ListItem>
          <ListItem
            containerStyle={{ padding: 10, paddingLeft: 20 }}
            bottomDivider
            onPress={() => navigation.navigate('PhoneNumber', { phone: state.user.phones[0].number.slice(3) })}>
            <ListItem.Content>
              <ListItem.Title>Numero celular</ListItem.Title>
            </ListItem.Content>
            <Text>{state.user.phones[0].number}</Text>
            <ListItem.Chevron size={24} />
          </ListItem>
          <ListItem
            containerStyle={{ padding: 10, paddingLeft: 20 }}
            bottomDivider
            onPress={() => navigation.navigate('Birthday', { birthday: state.user.dateOfBirth })}>
            <ListItem.Content>
              <ListItem.Title>Fecha de nacimiento</ListItem.Title>
            </ListItem.Content>
            <Text>{moment(state.user.dateOfBirth).format('DD/MM/YYYY')}</Text>
            <ListItem.Chevron size={24} />
          </ListItem>
          <ListItem containerStyle={{ padding: 10, paddingLeft: 20 }} bottomDivider onPress={() => {}}>
            <ListItem.Content>
              <ListItem.Title>Dirección de envió</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron size={24} />
          </ListItem>
          <ListItem
            containerStyle={{ padding: 10, paddingLeft: 20 }}
            bottomDivider
            onPress={() => navigation.navigate('Password')}>
            <ListItem.Content>
              <ListItem.Title>Contraseña</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron size={24} />
          </ListItem>
        </View>
        <View>
          <Text style={[styles.titleSeparator]}>Dato generales</Text>
          <View>
            <ListItem containerStyle={{ padding: 10, paddingLeft: 20 }} onPress={() => {}}>
              <ListItem.Content>
                <ListItem.Title>Perfil publico</ListItem.Title>
              </ListItem.Content>
              <Switch
                style={{ transform: [{ scale: 0.9 }] }}
                trackColor={{ false: '#767577', true: '#2E86AB' }}
                thumbColor={'#fff'}
                onValueChange={publicChange}
                ios_backgroundColor='#3e3e3e'
                value={state.user.isPublic}
              />
            </ListItem>
            <Text
              style={[
                {
                  color: colors.grey2,
                  backgroundColor: '#fff',
                  fontWeight: '500',
                  paddingHorizontal: 15,
                  lineHeight: 18,
                  paddingBottom: 10,
                },
              ]}>
              Al cambiar el perfil a público las personas podrán ver tu número celular y capaz de realizar
              transferencias a través de su lista de contactos, si no deseas que esto pase desactiva esta opción.
            </Text>
          </View>
          <ListItem containerStyle={{ padding: 10, paddingLeft: 20 }} bottomDivider topDivider onPress={() => {}}>
            <ListItem.Content>
              <ListItem.Title>Sobre DropMoney</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron size={24} />
          </ListItem>
        </View>
        <View style={[{ marginTop: 40 }]}>
          <ListItem topDivider containerStyle={{ padding: 10, paddingLeft: 20 }} bottomDivider onPress={signout}>
            <ListItem.Content style={[{ alignItems: 'center' }]}>
              <ListItem.Title style={[{ color: colors.error, textAlign: 'center' }]}>Cerrar sesión</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
        <View style={[{ height: 40 }]}></View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleSeparator: {
    paddingLeft: 15,
    fontSize: 17,
    fontWeight: '700',
    marginVertical: 8,
    marginTop: 12,
  },
})

export default ProfileScreen
