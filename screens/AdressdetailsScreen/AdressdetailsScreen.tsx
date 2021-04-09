import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Icon, Text } from 'react-native-elements'
import TransactionMovement from '../../components/TransactionMovement'
import useTheme from '../../hooks/useTheme'
import { RootStackParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AddressDetailsScreen'>
  route: RouteProp<RootStackParamList, 'AddressDetailsScreen'>
}

const AdressdetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors } = useTheme()
  const [movements, setMovements] = React.useState<any[]>(Array.from(Array(10).keys()))

  React.useEffect(() => {
    navigation.setOptions({
      title: `${route.params.asset} (${route.params.short})`,
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
      },
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.tint }}>
      <ScrollView>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Text style={[styles.amount, { color: colors.textTint }]}>0.00</Text>
          <Text style={[{ color: colors.grey4 }, styles.dollarAmount]}>≈ 0.00</Text>
          <View style={{ flexDirection: 'row', padding: 5, marginTop: 20 }}>
            <Button
              icon={{ name: 'qrcode', type: 'font-awesome-5', color: colors.tint, iconStyle: { marginRight: 10 } }}
              containerStyle={[styles.btnContainer]}
              buttonStyle={[{ backgroundColor: '#393E46' }, styles.btn]}
              title='Recibir'
            />
            <Button
              icon={{
                name: 'paper-plane',
                type: 'font-awesome',
                color: colors.tint,
                iconStyle: { marginRight: 10 },
              }}
              containerStyle={[styles.btnContainer]}
              buttonStyle={[{ backgroundColor: colors.secondary }, styles.btn]}
              title='Transferir'
            />
          </View>
        </View>
        <Text style={[{ fontSize: 18, padding: 20 }]}>Movimientos recientes</Text>
        {movements.map((v, i) => (
          <TransactionMovement key={i} />
        ))}
        {movements.length === 0 && (
          <View style={{ marginTop: 50 }}>
            <Icon
              name='exchange-alt'
              type='font-awesome-5'
              color={colors.grey3}
              iconStyle={{ transform: [{ rotate: '90deg' }] }}
            />
            <Text style={[{ textAlign: 'center', marginTop: 15, fontSize: 18, color: colors.grey3 }]}>
              No hay movimientos
            </Text>
          </View>
        )}
      </ScrollView>
      <Button
        title='Ver todos los movimientos'
        type='clear'
        onPress={() =>
          navigation.navigate('AssetTotalMovements', { asset: route.params.asset, short: route.params.short })
        }
        containerStyle={{ elevation: 20, backgroundColor: colors.tint }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  amount: {
    textAlign: 'center',
    fontSize: 49,
    height: 42,
    lineHeight: 55,
  },
  dollarAmount: {
    fontSize: 16,
    textAlign: 'center',
  },
  btnContainer: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  btn: {
    borderRadius: 10,
  },
})

export default AdressdetailsScreen
