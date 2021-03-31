import { useFocusEffect } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { BackHandler, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Icon, Overlay, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import BalanceCryptoItem from '../../components/BalanceCryptoItem'
import useTheme from '../../hooks/useTheme'
import { AccountsParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<AccountsParamList, 'Accounts'>
}

type State = {
  currencyPrices: {
    DOLLAR_TODAY: number
    DOLLAR_BCV: number
    RELEVANT_CURRENCIES: { name: string; price: string }[]
    TOP_CURRENCIES: { name: string; price: string; percent_change_24h: number; logo: string }[]
  }
}

const initialState: State = {
  currencyPrices: {
    DOLLAR_TODAY: 1897012.81,
    DOLLAR_BCV: 1865849.29,
    RELEVANT_CURRENCIES: [
      {
        name: 'Bitcoin',
        price: '47273.00',
      },
      {
        name: 'Ethereum',
        price: '1483.09',
      },
    ],
    TOP_CURRENCIES: [],
  },
}

const AccountsScreen: React.FC<Props> = ({ navigation }) => {
  const [state, setState] = React.useState<State>(() => initialState)
  const [overlay, setOverlay] = React.useState<boolean>(false)
  const { colors } = useTheme()

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (overlay) {
          setOverlay(false)
          return true
        } else {
          return false
        }
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [overlay])
  )

  React.useEffect(() => {
    // const init = async () => {
    //   const [response, err] = await makeRequest(`${URL}/stats/dashboard`)
    //   const res = {
    //     currencyPrices: response,
    //   }
    //   let cacheStats = (await AsyncStorage.getItem('@stats_dashboard')) || initialState
    //   cacheStats = typeof cacheStats === 'string' ? JSON.parse(cacheStats) : cacheStats
    //   if (err) {
    //     return setState(cacheStats as State)
    //   }
    //   await AsyncStorage.setItem('@stats_dashboard', JSON.stringify(res))
    //   return setState(res)
    // }
    // init()
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={[{ alignSelf: 'center', fontSize: 28 }]}>Saldo disponible</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={[{ fontSize: 59, height: 65, marginBottom: 5 }]}>$0.00</Text>
          <Text style={[{ color: colors.grey3, fontFamily: 'Poppins-Regular' }]}>Total en dolares</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <View style={styles.btnContainer}>
            <Button
              titleStyle={[styles.btnTitle]}
              buttonStyle={[{ backgroundColor: colors.secondary }, styles.btn]}
              icon={{
                name: 'qrcode',
                type: 'font-awesome-5',
                color: colors.textTint,
                size: 25,
                iconStyle: { marginRight: 5 },
              }}
              title='Recibir'
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              onPress={() => setOverlay(true)}
              containerStyle={styles.btnShadow}
              titleStyle={[styles.btnTitle]}
              buttonStyle={[styles.btn]}
              icon={{ name: 'paper-plane', type: 'font-awesome', color: colors.textTint, size: 20 }}
              title='Transferir fondos'
            />
          </View>
        </View>
        <View style={[styles.balanceWrapper, { backgroundColor: colors.tint, marginTop: 40 }]}>
          <Text style={[{ fontSize: 18, textAlign: 'center' }]}>Estado de cuentas</Text>
          <View style={{ marginBottom: 15 }}>
            <Text style={[{ fontSize: 18 }]}>Fiat</Text>
            <View style={[styles.fiatContainer, { borderBottomColor: colors.divider }]}>
              <Text style={[{ flex: 1 }]}>Bolivares Soberanos</Text>
              <Text style={[styles.fiatValueText]}>0.00</Text>
            </View>
            <View style={[styles.fiatContainer, { borderBottomColor: colors.divider }]}>
              <Text style={[{ flex: 1 }]}>Dolares</Text>
              <Text style={[styles.fiatValueText]}>0.00</Text>
            </View>
          </View>
          <View>
            <Text style={[{ marginBottom: 5, fontSize: 18 }]}>Crypto</Text>
            <BalanceCryptoItem
              name='Bitcoin'
              shortName='BTC'
              valueOnMerch='56839.12'
              balance='0.00'
              variancy={0.007}
            />
            <BalanceCryptoItem
              name='Ethereum'
              shortName='ETH'
              valueOnMerch='56839.12'
              balance='0.00'
              variancy={-0.007}
            />
          </View>
          <View style={{ alignItems: 'center', paddingTop: 30 }}>
            <Text>Estas buscando otra moneda?</Text>
            <Text style={[{ textAlign: 'center', fontSize: 14, marginTop: 5, paddingHorizontal: 10 }]}>
              En dropmoney soportamos una gran variedad de monedas. Añade la que prefieras!
            </Text>
            <Button
              containerStyle={{ elevation: 5, backgroundColor: colors.tint, borderRadius: 50, marginVertical: 17 }}
              buttonStyle={{ borderRadius: 50, height: 36, paddingHorizontal: 15 }}
              icon={{ name: 'plus', type: 'font-awesome-5', color: colors.textTint, size: 16 }}
              titleStyle={[{ fontSize: 14 }]}
              title='Añadir moneda'
            />
          </View>
        </View>
      </ScrollView>
      <Overlay
        isVisible={overlay}
        animationType='fade'
        onBackdropPress={() => setOverlay(false)}
        overlayStyle={styles.overlayContainer}>
        <View style={[styles.overlay, { backgroundColor: colors.tint }]}>
          <Text style={[{ textAlign: 'center', marginBottom: 10 }]}>
            De que manera quieres realizar la transferencia?
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() => {
                setOverlay(false)
                navigation.navigate('Transaction')
              }}
              style={{ alignItems: 'center', padding: 10 }}
              android_ripple={{ color: colors.grey5 }}>
              <View
                style={{
                  backgroundColor: colors.terciary,
                  height: 80,
                  borderRadius: 100,
                  width: 80,
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                <Icon name='wallet' type='font-awesome-5' color={colors.textTint} size={30} />
              </View>
              <Text style={[{ fontSize: 14 }]}>Direccion de Wallet</Text>
            </Pressable>
            <Pressable style={{ alignItems: 'center', padding: 10 }} android_ripple={{ color: colors.grey5 }}>
              <View
                style={{
                  backgroundColor: colors.primary,
                  height: 80,
                  borderRadius: 100,
                  width: 80,
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                <Icon name='qrcode' type='font-awesome-5' color={colors.textTint} size={30} />
              </View>
              <Text style={[{ fontSize: 14 }]}>Escanear codigo QR</Text>
            </Pressable>
          </View>
        </View>
      </Overlay>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  btnShadow: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  btn: {
    borderRadius: 10,
  },
  btnTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  balanceWrapper: {
    marginTop: 30,
    padding: 20,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  fiatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  fiatValueText: {
    fontSize: 24,
  },
  overlayContainer: {
    backgroundColor: '#0000',
    elevation: 0,
    position: 'absolute',
    width: '100%',
    top: 80,
    paddingHorizontal: 20,
  },
  overlay: {
    padding: 20,
    elevation: 10,
    borderRadius: 15,
  },
})

export default AccountsScreen
