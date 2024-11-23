import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigation";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* TabNavigator para navegación principal */}
                <Stack.Screen name="Tab" component={TabNavigator} />
                {/* AuthNavigator para pantallas de autenticación */}
                <Stack.Screen name="Auth" component={AuthNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
