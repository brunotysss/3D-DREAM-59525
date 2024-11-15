import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignupScreen from "../screens/SignupScreen"
import LoginScreen from "../screens/LoginScreen"

const Stack = createNativeStackNavigator()
const AuthNavigation = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginScreen} />    
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigation