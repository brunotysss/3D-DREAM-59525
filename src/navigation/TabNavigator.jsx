import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ShopNavigation from "./ShopNavigation";
import CartNavigator from "./CartNavigator";
import ReceipstNavigator from "./ReceiptysNavigation";
import { StyleSheet, Text, View } from 'react-native'
import { colors } from "../global/colors";
import  Icon  from 'react-native-vector-icons/MaterialIcons'





const Tab = createBottomTabNavigator()


const TabNavigator = () => {
  return (
        <NavigationContainer>
                <Tab.Navigator initialRouteName="Shop"
                screenOptions={{
                    headerShown:false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar
                }}
                >
            <Tab.Screen 
            name ="Shop" 
            component={ShopNavigation}
            options={{
                tabBarIcon: ({focused})=>(<Icon name="storefront" size={32} color = {focused?colors.grisOscuro:colors.grisMedio} />)
            }}
            />
            <Tab.Screen 
            name = "Cart" 
            component={CartNavigator}
            options={{
                tabBarIcon: ({focused})=>(<Icon name="shopping-cart" size={32} color = {focused?colors.grisOscuro:colors.grisMedio} />)
            }}
            />
            <Tab.Screen 
            name = "Receipts" 
            component={ReceipstNavigator}
            options={{
                tabBarIcon: ({focused})=>(<Icon name="receipt" size={32} color = {focused?colors.grisOscuro:colors.grisMedio} />)
            }}
            />

                </Tab.Navigator>


        </NavigationContainer>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
        tabBar:{
            heigh:64 ,
            backgroundColor: colors.grisClaro
        },


})