import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
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
  }, [])
  return (
    <SafeAreaView>
      <ScrollView>
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
                <ListItem.Subtitle>{state.currencyPrices.DOLLAR_TODAY} Bsf</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
              <Avatar
                rounded
                size='medium'
                icon={{ name: 'bitcoin', type: 'font-awesome-5', color: colors.primary, size: 50 }}
              />
              <ListItem.Content>
                <ListItem.Title>{state.currencyPrices.RELEVANT_CURRENCIES[0].name.toUpperCase()}</ListItem.Title>
                <ListItem.Subtitle>{state.currencyPrices.RELEVANT_CURRENCIES[0].price} $</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <Avatar
                rounded
                size='medium'
                icon={{ name: 'ethereum', type: 'font-awesome-5', color: colors.primary, size: 40 }}
              />
              <ListItem.Content>
                <ListItem.Title>{state.currencyPrices.RELEVANT_CURRENCIES[1].name.toUpperCase()}</ListItem.Title>
                <ListItem.Subtitle>{state.currencyPrices.RELEVANT_CURRENCIES[1].price} $</ListItem.Subtitle>
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
            <ListItem bottomDivider>
              <Avatar
                rounded
                size='medium'
                icon={{ name: 'dollar', type: 'foundation', color: colors.primary, size: 50 }}
              />
              <ListItem.Content>
                <ListItem.Title>DOLLAR TODAY</ListItem.Title>
                <ListItem.Subtitle>{state.currencyPrices.DOLLAR_TODAY} Bsf</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </View>
        </Card>
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
