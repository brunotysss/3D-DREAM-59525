import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CategoriesScreen, ProductScreen, ProductDetailScreen } from "../screens";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categorias" component={CategoriesScreen} />
        <Stack.Screen name="Productos" component={ProductScreen} />
        <Stack.Screen name="Producto Detalle" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
