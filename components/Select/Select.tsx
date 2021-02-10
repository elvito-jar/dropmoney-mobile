import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { Modal, Platform, PlatformColor, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { VenezuelaState } from '../../types'

const States = [
  'Amazonas',
  'Anzoátegui',
  'Apure',
  'Barinas',
  'Aragua',
  'Carabobo',
  'Bolívar',
  'Cojedes',
  'Delta Amacura',
  'Falcón',
  'Distrito Capital',
  'Guárico',
  'Mérida',
  'Lara',
  'Miranda',
  'Monagas',
  'Nueva Esparta',
  'Portuguesa',
  'Sucre',
  'Táchira',
  'Trujillo',
  'Yaracuy',
  'La Guaira',
  'Zulia',
]

type Props = {
  visible: boolean
  state: VenezuelaState
  onDone: (state: VenezuelaState) => void
  onCancel: () => void
}

const Select: React.FC<Props> = ({ visible, state, onDone, onCancel }) => {
  const [venezuelaState, setVenezuelaState] = React.useState<VenezuelaState>(state)
  const onChange = (value: React.ReactText) => {
    const state = value.toString() as VenezuelaState
    setVenezuelaState(state)
  }

  return (
    <Modal animationType='slide' visible={visible} transparent={true}>
      <View style={Styles.wrapper}>
        <View style={Styles.header}>
          <Button type='clear' onPress={onCancel} title='Cancelar' />
          <Button title='Listo' onPress={() => onDone(venezuelaState)} type='clear' />
        </View>
        <View style={Styles.container}>
          <Picker selectedValue={venezuelaState} onValueChange={onChange}>
            {States.map((state) => (
              <Picker.Item label={state} key={state} value={state} />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  )
}

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-end',
  },
  header: {
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor('systemBackground'),
      },
      android: {
        backgroundColor: PlatformColor('@android:color/background_light'),
      },
    }),
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    height: 200,
    width: '100%',
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor('secondarySystemBackground'),
      },
      android: {
        backgroundColor: PlatformColor('@android:color/background_light'),
      },
    }),
  },
})

export default React.memo(Select)
