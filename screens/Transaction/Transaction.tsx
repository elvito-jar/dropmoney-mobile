import { StackNavigationProp } from '@react-navigation/stack'
import Clipboard from 'expo-clipboard'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Button, Input, ListItem, Text } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import { BALANCE_COINS } from '../../constants'
import useTheme from '../../hooks/useTheme'
import { CoinItem, RootStackParamList } from '../../types'
import getCryptoIcon from '../../utils/getCryptoIcon'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Transaction'>
}

type InputFields = {
  address: string
  amount: string
}

const AmounOptions: React.FC<{ selectCoin: (coin: CoinItem) => void }> = ({ selectCoin }) => {
  const { colors } = useTheme()
  return (
    <View style={styles.panel}>
      <View
        style={{
          height: 5,
          backgroundColor: colors.grey4,
          width: 40,
          marginBottom: 10,
          borderRadius: 50,
          alignSelf: 'center',
        }}></View>
      {BALANCE_COINS.map((coin, i) => (
        <ListItem
          key={coin.name + i}
          containerStyle={{ padding: 10, paddingHorizontal: 15 }}
          pad={2}
          bottomDivider
          onPress={() => selectCoin(coin)}>
          <Avatar
            rounded
            size='small'
            title={coin.name[0]}
            source={getCryptoIcon(coin.shortName)}
            containerStyle={{ marginRight: 8 }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontFamily: 'Poppins-Light', height: 19 }}>{coin.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  )
}

const NumberInput = React.forwardRef<TextInputMask>((props, ref) => (
  <TextInputMask
    {...props}
    ref={ref}
    type='money'
    options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
  />
))

const Transaction: React.FC<Props> = (props) => {
  const { colors } = useTheme()
  const botSheet = React.useRef<BottomSheet>(undefined!)
  const fall = new Animated.Value(1)
  const { control, formState, handleSubmit, watch } = useForm<InputFields>()
  const [coinSelected, setCoinSelected] = React.useState<CoinItem>(BALANCE_COINS[0])
  const address = watch('address')
  const selectCoin = (coin: CoinItem) => {
    setCoinSelected(coin)
    botSheet.current.snapTo(1)
  }

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync()
    control.setValue('address', text)
  }

  const submit = (fields: InputFields) => {
    console.log(fields)
  }

  return (
    <View style={{ height: '100%', backgroundColor: colors.tint }}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 30,
        }}>
        <View style={{ width: '100%', position: 'relative' }}>
          <Controller
            control={control}
            name='address'
            defaultValue=''
            rules={{
              required: { value: true, message: '' },
            }}
            render={({ onChange, value }) => (
              <Input
                multiline={true}
                numberOfLines={5}
                value={value}
                onChangeText={onChange}
                textAlignVertical='top'
                label='Direccion de recibo'
                containerStyle={{ paddingHorizontal: 0 }}
                inputContainerStyle={[{ backgroundColor: colors.grey5, paddingTop: 10 }, styles.inputContainer]}
              />
            )}
          />
          {!address && (
            <Button
              containerStyle={[styles.pasteBtnContainer]}
              buttonStyle={[
                { borderRadius: 50, backgroundColor: colors.secondary, paddingVertical: 0, paddingHorizontal: 20 },
              ]}
              titleStyle={[{ fontFamily: 'Poppins-Regular', fontSize: 14 }]}
              title='Pegar'
              onPress={handlePaste}
            />
          )}
        </View>
        <View style={{ width: '100%', position: 'relative' }}>
          <Controller
            control={control}
            name='amount'
            defaultValue='0.00'
            rules={{
              required: { value: true, message: '' },
            }}
            render={({ onChange, value }) => (
              <Input
                label='Monto'
                value={value}
                onChangeText={onChange}
                InputComponent={NumberInput}
                containerStyle={{ paddingHorizontal: 0 }}
                inputContainerStyle={[
                  { backgroundColor: colors.grey5, paddingVertical: 10, paddingLeft: 15 },
                  styles.inputContainer,
                ]}
              />
            )}
          />
          <Button
            containerStyle={[styles.pasteBtnContainer, { top: 27, right: 0, height: 60 }]}
            buttonStyle={[{ height: '100%', paddingHorizontal: 10 }]}
            type='clear'
            titleStyle={[{ fontFamily: 'Poppins-Regular', fontSize: 16, color: colors.text }]}
            icon={{ name: 'chevron-down', type: 'feather', color: colors.text, size: 25 }}
            iconRight
            onPress={() => botSheet.current.snapTo(0)}
            title={coinSelected.shortName}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
          <Text>≈ $ 0.00</Text>
          <Text>Saldo disponible: 0.000 {coinSelected.shortName}</Text>
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
          onPress={handleSubmit(submit)}
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
      <BottomSheet
        callbackNode={fall}
        ref={botSheet}
        initialSnap={1}
        snapPoints={['60%', '-100%']}
        borderRadius={10}
        enabledContentTapInteraction={false}
        renderContent={() => <AmounOptions selectCoin={selectCoin} />}
      />
      <Animated.View
        pointerEvents='none'
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: [0.5, 0],
          }),
        }}></Animated.View>
    </View>
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
  panel: {
    height: '100%',
    backgroundColor: '#ffffff',
    paddingBottom: 20,
    paddingTop: 15,
  },
})

export default Transaction
