import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignupScreen from "../screens/auth/SignupScreen"
import LoginScreen from "../screens/auth/LoginScreen"

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