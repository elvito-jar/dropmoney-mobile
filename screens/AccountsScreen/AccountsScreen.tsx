import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import { URL } from '../../constants'
import useTheme from '../../hooks/useTheme'
import { AccountsParamList } from '../../types'
import makeRequest from '../../utils/makeRequest'

type Props = {
  navigation: StackNavigationProp<AccountsParamList, 'Accounts'>
}

type State = {
  currencyPrices: {
    DOLLAR_TODAY: number
    DOLLAR_BCV: number
    RELEVANT_CURRENCIES: { name: string; price: string }[]
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
      {
        name: 'Tether',
        price: '1.00',
      },
    ],
  },
}

const AccountsScreen: React.FC<Props> = ({ navigation }) => {
  const [state, setState] = React.useState<State>(() => initialState)
  const { colors } = useTheme()

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon={{ name: 'exit-outline', type: 'ionicon', color: colors.primary }} type='clear' />
      ),
    })
    const init = async () => {
      const [response, err] = await makeRequest(`${URL}/stats/dashboard`)
      const res = {
        currencyPrices: response,
      }
      let cacheStats = (await AsyncStorage.getItem('@stats_dashboard')) || initialState
      cacheStats = typeof cacheStats === 'string' ? JSON.parse(cacheStats) : cacheStats
      if (err) {
        return setState(cacheStats as State)
      }
      await AsyncStorage.setItem('@stats_dashboard', JSON.stringify(res))
      return setState(res)
    }
    init()
  }, [])
  return (
    <SafeAreaView>
      <ScrollView style={[]}>
        <Card containerStyle={[styles.cardContainer]} wrapperStyle={[{ padding: 0 }]}>
          <View style={[styles.cardHeader, { backgroundColor: colors.primary }]}>
            <Card.Title style={[styles.cardText]}>MONEDAS RELEVANTES</Card.Title>
          </View>
          <View>
            <ListItem bottomDivider>
              <Avatar
                rounded
                size='medium'
                icon={{ name: 'dollar', type: 'foundation', color: colors.primary, size: 50 }}
              />
              <ListItem.Content>
                <ListItem.Title>DOLLAR TODAY</ListItem.Title>
                <ListItem.Subtitle>Valor: {state.currencyPrices.DOLLAR_TODAY} Bsf</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider containerStyle={{ borderBottomWidth: 0.8 }}>
              <Avatar
                rounded
                size='medium'
                icon={{ name: 'bitcoin', type: 'font-awesome-5', color: '#f2a900', size: 50 }}
              />
              <ListItem.Content>
                <ListItem.Title>{state.currencyPrices.RELEVANT_CURRENCIES[0].name.toUpperCase()}</ListItem.Title>
                <ListItem.Subtitle>
                  Valor: {state.currencyPrices.RELEVANT_CURRENCIES[0].price} $ (Dolares){' '}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <Avatar
                rounded
                size='medium'
                icon={{ name: 'ethereum', type: 'font-awesome-5', color: '#3c3c3d', size: 40 }}
              />
              <ListItem.Content>
                <ListItem.Title>{state.currencyPrices.RELEVANT_CURRENCIES[1].name.toUpperCase()}</ListItem.Title>
                <ListItem.Subtitle>
                  Valor: {state.currencyPrices.RELEVANT_CURRENCIES[1].price} $ (Dolares)
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>
          <Button
            containerStyle={{ borderRadius: 0 }}
            buttonStyle={{ borderRadius: 0 }}
            title='MAS DETALLES...'
            titleStyle={{ color: 'white' }}
          />
        </Card>
        <Card containerStyle={[styles.cardContainer]} wrapperStyle={[{ padding: 0 }]}>
          <View style={[styles.cardHeader, { backgroundColor: colors.primary }]}>
            <Card.Title style={[styles.cardText]}>CUENTAS CRYPTOS</Card.Title>
          </View>
          <View>
            <ListItem onPress={() => navigation.navigate('AddressdetailsScreen')} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Wallet Label</ListItem.Title>
                <ListItem.Subtitle>Monto de la wallet adress disponible</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron size={35} />
            </ListItem>
          </View>
        </Card>
        <Card containerStyle={[styles.cardContainer]} wrapperStyle={[{ padding: 0 }]}>
          <View style={[styles.cardHeader, { backgroundColor: colors.primary }]}>
            <Card.Title style={[styles.cardText]}>TOP COIN MARKET CAP</Card.Title>
          </View>
          <View>
            {state.currencyPrices.RELEVANT_CURRENCIES.map((coin, i) => (
              <ListItem bottomDivider key={`${i}-${coin}`}>
                <ListItem.Content>
                  <ListItem.Title>{coin.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </Card>
        <View style={[{ height: 20 }]}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 0,
  },
  cardHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    margin: 0,
    marginBottom: 0,
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    textAlign: 'left',
    marginBottom: 0,
  },
})

export default AccountsScreen
