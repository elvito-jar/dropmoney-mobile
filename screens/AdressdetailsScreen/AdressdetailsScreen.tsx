import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import { AccountsParamList } from '../../types'

type Props = {
  navigation: StackNavigationProp<AccountsParamList, 'AddressdetailsScreen'>
}

const AdressdetailsScreen: React.FC<Props> = (props) => (
  <SafeAreaView>
    <ScrollView>
      <Text>Contenido</Text>
    </ScrollView>
  </SafeAreaView>
)

const styles = StyleSheet.create({})

export default AdressdetailsScreen
