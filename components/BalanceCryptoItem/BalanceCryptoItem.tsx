import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar, ListItem, ListItemProps, Text } from 'react-native-elements'
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

const BalanceCryptoItem: React.FC<Props & ListItemProps> = ({
  name,
  shortName,
  balance,
  valueOnMerch,
  variancy,
  ...props
}) => {
  const { colors } = useTheme()

  return (
    <ListItem {...props} containerStyle={{ padding: 0, paddingBottom: 10, paddingTop: 10 }} pad={2} bottomDivider>
      <Avatar rounded size='small' title='M' source={getIcon(shortName)} containerStyle={{ marginRight: 8 }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: 'Poppins-Light', height: 19 }}>{name}</ListItem.Title>
        <ListItem.Subtitle>
          <Text style={[{ fontSize: 14, color: colors.grey3 }]}>Val. {valueOnMerch} </Text>
          <Text style={[{ fontSize: 14, color: variancy > 0 ? '#9ADA96' : '#F17B7B' }]}>
            {variancy > 0 ? '+' : ''}
            {variancy}
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <Text style={[{ fontSize: 24, height: 26, transform: [{ translateY: 2 }] }]}>{balance}</Text>
      <Text style={[{ color: colors.grey3, transform: [{ translateY: 9 }] }]}>{shortName}</Text>
    </ListItem>
  )
}

const styles = StyleSheet.create({})

export default BalanceCryptoItem
