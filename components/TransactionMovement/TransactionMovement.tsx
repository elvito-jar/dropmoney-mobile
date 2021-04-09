import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'

const TransactionMovement = () => {
  const { colors } = useTheme()

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        padding: 10,
        flex: 1,
        borderBottomWidth: 0.5,
        borderColor: colors.divider,
      }}
      android_ripple={{ color: colors.grey4 }}>
      <View style={styles.left}>
        <Text style={[{ color: colors.grey2 }]}>Direccion</Text>
        <Text numberOfLines={2} style={[{ lineHeight: 26 }]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores minus nemo aperiam sunt possimus
          accusantium delectus reprehenderit repellendus eaque placeat? Non deleniti enim sit quas cum in, ratione
          pariatur laudantium!
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.rightText, { color: colors.grey2 }]}>Monto</Text>
        <Text style={[styles.rightText]}>-120 ≈ $140.00</Text>
        <Text style={[styles.rightText, { color: colors.grey2 }]}>24 ≈ $240.00</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  left: { flex: 3 },
  right: { flex: 2 },
  rightText: {
    textAlign: 'right',
  },
})

export default TransactionMovement
