import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import FlatCard from "../components/FlatCard";
import { colors } from "../global/colors";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const ReceiptDetailScreen = ({ route }) => {
    const { receipt } = route.params;

    const handleDownloadPDF = async () => {
        const html = `
          <html>
            <body>
              <h1>Recibo #${receipt.id}</h1>
              <p>Fecha: ${new Date(receipt.createdAt).toLocaleString("es-Ar")}</p>
              <h2>Productos</h2>
              <ul>
                ${receipt.items
                  .map(
                    (item) =>
                      `<li>${item.title}: ${item.quantity} x $${item.price} = $${
                          item.quantity * item.price
                      }</li>`
                  )
                  .join("")}
              </ul>
              <h2>Total: $${receipt.total}</h2>
            </body>
          </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };

    const renderProductItem = ({ item }) => (
        <FlatCard style={styles.productCard}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDetails}>
                Cantidad: {item.quantity}
            </Text>
            <Text style={styles.productDetails}>
                Precio unitario: ${item.price}
            </Text>
            <Text style={styles.productTotal}>
                Total: ${item.quantity * item.price}
            </Text>
        </FlatCard>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recibo # {receipt.id}</Text>
            <Text style={styles.date}>
                Creado el {new Date(receipt.createdAt).toLocaleString("es-Ar")}
            </Text>
            <FlatList
                data={receipt.items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProductItem}
            />
            <Text style={styles.total}>Total: ${receipt.total}</Text>
            <Pressable style={styles.downloadButton} onPress={handleDownloadPDF}>
                <Text style={styles.downloadButtonText}>
                    Descargar recibo en PDF
                </Text>
            </Pressable>
        </View>
    );
};

export default ReceiptDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 16,
    },
    date: {
        fontSize: 16,
        marginBottom: 16,
    },
    productCard: {
        marginBottom: 16,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    productDetails: {
        fontSize: 14,
    },
    productTotal: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 8,
    },
    total: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "right",
        marginTop: 16,
    },
    downloadButton: {
        backgroundColor: colors.morado,
        padding: 16,
        borderRadius: 10,
        marginTop: 24,
    },
    downloadButtonText: {
        color: colors.blanco,
        fontWeight: "700",
        textAlign: "center",
    },
});
