import * as Linking from 'expo-linking'

const prefix = Linking.makeUrl('/')

export default {
  prefixes: [prefix],
  config: {
    screens: {
      initialRouteName: 'Presentation',
      path: '',
      PasswordRecovery: 'passwordRecovery/:token/:username',
    },
  },
}
