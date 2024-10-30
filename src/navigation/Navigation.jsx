import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import ProductScreen from '../screens/ProductScreen';
import Header from "../components/Header";
import { CategoriesScreen, ProductScreen, ProductDetailScreen } from "../screens/index";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ 
        header: ({route})=> <Header subtitle={route.name}/>
       }}
      
      >
        <Stack.Screen name="Categorias" component={CategoriesScreen} />
        <Stack.Screen name="Productos" component={ProductScreen} />
        <Stack.Screen name="Producto" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
