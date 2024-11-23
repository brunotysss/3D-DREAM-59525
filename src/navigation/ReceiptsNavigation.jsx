import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReceiptsScreen from "../screens/ReceiptsScreen.jsx";
import ReceiptDetailScreen from "../screens/ReceiptDetailScreen.jsx"; // Asegúrate de importar esta pantalla
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

const ReceipstNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Pantalla de lista de recibos */}
      <Stack.Screen
        component={ReceiptsScreen}
        name="Receipts"
        options={{ title: "Recibos" }}
      />

      {/* Pantalla de detalles del recibo */}
      <Stack.Screen
        component={ReceiptDetailScreen}
        name="ReceiptDetail"
        options={{ title: "Detalle del Recibo" }}
      />
    </Stack.Navigator>
  );
};

export default ReceipstNavigator;

const styles = StyleSheet.create({});
