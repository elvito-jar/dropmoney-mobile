import { StackNavigationProp } from '@react-navigation/stack'
import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import useTheme from '../../../hooks/useTheme'
import { SignUpStackParamList } from '../../../types'

type Props = {
  navigation: StackNavigationProp<SignUpStackParamList, 'SuccessSignup'>
}

const SuccessSignup: React.FC<Props> = ({ navigation }) => {
  const animation = React.useRef<LottieView>(undefined!)
  const { theme } = useTheme()

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })
    setTimeout(() => {
      animation.current.play()
    }, 200)

    setTimeout(() => {
      navigation.removeListener('beforeRemove', () => {})
      navigation.navigate('Presentation')
    }, 5000)
  }, [])

  return (
    <View style={Styles.container}>
      <View>
        <Text style={Styles.title}>¡Registración completado!</Text>
        <Text style={[Styles.subtitle, { color: theme.colors?.grey1 }]}>
          Te hemos enviado un correo de verificación a tu correo electrónico. Por favor verifica tu cuenta para
          iniciar sesión.
        </Text>
      </View>
      <LottieView
        ref={animation}
        loop={false}
        style={Styles.successLottie}
        source={require('../../../assets/lottie/singupSuccess.json')}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  successLottie: {
    marginTop: 20,
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginVertical: 20,
  },
})

export default SuccessSignup
