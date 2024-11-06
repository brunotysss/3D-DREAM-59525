import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ReceiptsScreen from "../screens/ReceiptsScreen.jsx"
import { StyleSheet, Text, View } from 'react-native'

const Stack = createNativeStackNavigator()

const ReceipstNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen component={ReceiptsScreen} name="Recibos" />

    </Stack.Navigator>
  )
}

export default ReceipstNavigator

const styles = StyleSheet.create({})