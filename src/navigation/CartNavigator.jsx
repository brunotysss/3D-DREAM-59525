import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";

const CartStack = createNativeStackNavigator();

const CartNavigator = () => {
    return (
        <CartStack.Navigator screenOptions={{ headerShown: false }}>
            <CartStack.Screen component={CartScreen} name="Carrito" />
        </CartStack.Navigator>
    );
};

export default CartNavigator;
