import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SearchBar, Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import TransactionMovement from '../../components/TransactionMovement'
import useTheme from '../../hooks/useTheme'
import { RootStackParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AssetTotalMovements'>
  route: RouteProp<RootStackParamList, 'AssetTotalMovements'>
}

const AssetTotalMovementsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors } = useTheme()
  const [movements, setMovements] = React.useState<any[]>(Array.from(Array(10).keys()))
  const [search, setSearch] = React.useState<string>('')
  const searchBar = React.useRef<SearchBar>(undefined!)

  const closeKeyboard = () => {
    searchBar.current.blur()
  }

  React.useEffect(() => {
    navigation.setOptions({
      title: `Movimientos (${route.params.short})`,
      headerStyle: { elevation: 0 },
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.tint }}>
      <View style={[styles.panelTop, { backgroundColor: colors.primary }]}>
        <SearchBar
          ref={searchBar}
          value={search}
          onChangeText={(value) => setSearch(value)}
          placeholder='Buscar movimiento'
          containerStyle={{ backgroundColor: colors.primary, borderTopWidth: 0, borderBottomWidth: 0 }}
          inputContainerStyle={{ backgroundColor: 'rgba(88, 147, 212, .4)' }}
          searchIcon={{ color: colors.textTint, size: 30, iconStyle: { transform: [{ translateX: 5 }] } }}
          inputStyle={{ color: colors.textTint }}
          placeholderTextColor={colors.grey4}
          selectionColor={colors.textTint}
          clearIcon={{ color: colors.textTint }}
          lightTheme={false}
          round={true}
        />
        <View style={{ flexDirection: 'row', minHeight: 55, paddingHorizontal: 20, paddingVertical: 5 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={[{ fontFamily: 'Poppins-Regular', transform: [{ translateY: 2 }], color: colors.textTint }]}>
              Saldo disponible
            </Text>
            <Text
              style={[{ fontFamily: 'Poppins-Regular', transform: [{ translateY: 2 }], color: colors.textTint }]}>
              0.00 ≈ 140.00$
            </Text>
          </View>
          <Text
            style={[
              {
                height: '100%',
                textAlignVertical: 'center',
                color: colors.textTint,
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                lineHeight: 23,
              },
            ]}>
            {route.params.short}
          </Text>
        </View>
      </View>
      <ScrollView onScroll={closeKeyboard}>
        {movements.map((v, i) => (
          <TransactionMovement key={i} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  panelTop: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
})

export default AssetTotalMovementsScreen
