import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopNavigation from "./ShopNavigation";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigation";
import { StyleSheet, Text, View } from 'react-native'
import { colors } from "../global/colors";
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import ProfileNavigator from "./ProfileNavigator";
import MyPlacesNavigator from "./MyPlacesNavigation";



const Tab = createBottomTabNavigator()


const TabNavigator = () => {
  return (
   
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
            component={ReceiptsNavigator}
            options={{
                tabBarIcon: ({focused})=>(<Icon name="receipt" size={32} color = {focused?colors.grisOscuro:colors.grisMedio} />)
            }}
            />
             <Tab.Screen 
                name="Profile"
                component={ProfileNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="account-circle" size={32} color={focused?colors.grisOscuro:colors.grisMedio} />)
                }}
            />
          
                </Tab.Navigator>


   
  )
}

export default TabNavigator

const styles = StyleSheet.create({
        tabBar:{
            heigh:64 ,
            backgroundColor: colors.grisClaro
        },


})