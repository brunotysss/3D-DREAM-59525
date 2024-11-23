import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from 'react-redux';
import ProfileScreen from "../screens/ProfileScreen";
import Header from "../components/Header";
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
    const isLoggedIn = useSelector(state => state.authReducer.value.isLoggedIn); // Verifica si el usuario está logueado

    return (
        <Stack.Navigator 
            screenOptions={{
                header: ({ route }) => (<Header title="3D DREAM" subtitle={route.name} />)
            }}
        >
            {isLoggedIn ? (
                <Stack.Screen 
                    name="Perfil" 
                    component={ProfileScreen} 
                />
            ) : (
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ title: "Iniciar Sesión" }} // Cambia el título si es necesario
                />
            )}
        </Stack.Navigator>
    );
};

export default ProfileNavigator;
