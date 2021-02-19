import React from 'react'
import { Modal, ScrollView, StyleSheet, View } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'
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
  const { theme } = useTheme()
  const [venezuelaState, setVenezuelaState] = React.useState<VenezuelaState>(state)
  const onChange = (value: string) => {
    const state = value as VenezuelaState
    setVenezuelaState(state)
  }

  return (
    <Modal animationType='slide' presentationStyle='pageSheet' visible={visible}>
      <View style={Styles.wrapper}>
        <View style={Styles.header}>
          <Button type='clear' onPress={onCancel} title='Cancelar' />
          <Button title='Listo' onPress={() => onDone(venezuelaState)} type='clear' />
        </View>
        <ScrollView style={Styles.container}>
          {States.map((state, i) => (
            <ListItem key={i} onPress={() => onChange(state)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{state}</ListItem.Title>
              </ListItem.Content>
              {state === venezuelaState && (
                <ListItem.Chevron name='check' type='font-awesome' color={theme.colors?.primary} />
              )}
            </ListItem>
          ))}
        </ScrollView>
      </View>
    </Modal>
  )
}

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    height: 200,
    width: '100%',
  },
})

export default React.memo(Select)
