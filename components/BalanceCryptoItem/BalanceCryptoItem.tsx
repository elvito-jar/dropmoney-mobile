import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar, ListItem, Text } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'

type Props = {
  name: string
  shortName: string
  balance: string
  valueOnMerch: string
  variancy: number
}

function getIcon(name: string) {
  switch (name) {
    case 'BTC':
      return require('cryptocurrency-icons/32@2x/color/btc.png')

    case 'ETH':
      return require('cryptocurrency-icons/32/color/eth.png')

    default:
      return require('cryptocurrency-icons/32/color/btc.png')
  }
}

const BalanceCryptoItem: React.FC<Props> = (props) => {
  const { colors } = useTheme()

  return (
    <ListItem containerStyle={{ padding: 0, paddingBottom: 10, paddingTop: 10 }} pad={2} bottomDivider>
      <Avatar
        rounded
        size='small'
        title='M'
        source={getIcon(props.shortName)}
        containerStyle={{ marginRight: 8 }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: 'Poppins-Light', height: 19 }}>{props.name}</ListItem.Title>
        <ListItem.Subtitle>
          <Text style={[{ fontSize: 14, color: colors.grey3 }]}>Val. {props.valueOnMerch} </Text>
          <Text style={[{ fontSize: 14, color: props.variancy > 0 ? '#9ADA96' : '#F17B7B' }]}>
            {props.variancy > 0 ? '+' : ''}
            {props.variancy}
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <Text style={[{ fontSize: 24, height: 26, transform: [{ translateY: 2 }] }]}>{props.balance}</Text>
      <Text style={[{ color: colors.grey3, transform: [{ translateY: 9 }] }]}>{props.shortName}</Text>
    </ListItem>
  )
}

const styles = StyleSheet.create({})

export default BalanceCryptoItem
