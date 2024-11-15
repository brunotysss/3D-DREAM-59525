import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyPlaceScreen from '../screens/my-places/MyPlaceScreen'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const MyPlacesNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{ 
        header: ({ route }) => (<Header title="3D DREAM" subtitle={route.name}   />)
}}>
    <Stack.Screen name = "Mis lugares"  component={MyPlaceScreen}/>

    </Stack.Navigator>


  )
}

export default MyPlacesNavigator

const styles = StyleSheet.create({})