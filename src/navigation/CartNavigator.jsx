import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CartScreen from "../screens/CartScreen.jsx"
import { StyleSheet, Text, View } from 'react-native'

const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
  return (
    <CartStack.Navigator>
        <CartStack.Screen component={CartScreen} name="Carrito" />

    </CartStack.Navigator>
  )
}

export default CartNavigator

const styles = StyleSheet.create({})