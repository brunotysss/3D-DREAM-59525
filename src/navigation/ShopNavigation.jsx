import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import ProductScreen from '../screens/ProductScreen';
import Header from "../components/Header";
import { CategoriesScreen, ProductScreen, ProductDetailScreen , ReviewScreen } from "../screens/index";

const Stack = createNativeStackNavigator();

const ShopNavigation = () => {
  return (

      <Stack.Navigator
      screenOptions={{ 
        header: ({route})=> <Header subtitle={route.name}/>
       }}
      
      >
        <Stack.Screen name="Categorias" component={CategoriesScreen} />
        <Stack.Screen name="Productos" component={ProductScreen} />
        <Stack.Screen name="Producto" component={ProductDetailScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
      </Stack.Navigator>

  );
};

export default ShopNavigation;
