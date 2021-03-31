import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'
import { RootStackParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Transaction'>
}

const Transaction: React.FC<Props> = (props) => {
  const { colors } = useTheme()

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20, paddingTop: 30, flex: 1 }}>
      <View style={{ width: '100%', position: 'relative' }}>
        <Input
          multiline={true}
          numberOfLines={5}
          textAlignVertical='top'
          label='Direccion de recibo'
          containerStyle={{ paddingHorizontal: 0 }}
          inputContainerStyle={[{ backgroundColor: colors.grey5, paddingTop: 10 }, styles.inputContainer]}
        />
        <Button
          containerStyle={[styles.pasteBtnContainer]}
          buttonStyle={[
            { borderRadius: 50, backgroundColor: colors.secondary, paddingVertical: 0, paddingHorizontal: 20 },
          ]}
          titleStyle={[{ fontFamily: 'Poppins-Regular', fontSize: 14 }]}
          title='Pegar'
        />
      </View>
      <View style={{ width: '100%', position: 'relative' }}>
        <Input
          label='Monto'
          renderErrorMessage={false}
          containerStyle={{ paddingHorizontal: 0 }}
          inputContainerStyle={[{ backgroundColor: colors.grey5, paddingVertical: 10 }, styles.inputContainer]}
        />
        <Button
          containerStyle={[styles.pasteBtnContainer, { top: 27, right: 0, height: 60 }]}
          buttonStyle={[{ height: '100%', paddingHorizontal: 10 }]}
          type='clear'
          titleStyle={[{ fontFamily: 'Poppins-Regular', fontSize: 16, color: colors.text }]}
          icon={{ name: 'chevron-down', type: 'feather', color: colors.text, size: 25 }}
          iconRight
          title='ETH'
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
        <Text>= $ 0.00</Text>
        <Text>Saldo disponible: 0.000 ETH</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
          borderRadius: 15,
          backgroundColor: colors.grey5,
          padding: 10,
          paddingVertical: 15,
        }}>
        <Text>Tasa actual de Bs en $</Text>
        <Text>1.354.000 BsS</Text>
      </View>
      <Button
        title='Siguiente'
        buttonStyle={{ borderRadius: 15 }}
        containerStyle={{
          width: '100%',
          marginTop: 20,
          borderRadius: 15,
          backgroundColor: '#0000',
          elevation: 10,
        }}
      />
      <View style={{ padding: 20 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 15,
    borderColor: '#0000',
    borderBottomColor: '#0000',
    borderBottomWidth: 0,
    paddingHorizontal: 10,
  },
  pasteBtnContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
})

export default Transaction
