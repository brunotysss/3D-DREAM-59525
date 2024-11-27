import { useSelector } from "react-redux";
import { useGetReceiptsQuery } from "../services/receiptsService";
import { FlatList, Text, StyleSheet, View, Pressable } from "react-native";
import FlatCard from "../components/FlatCard";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const ReceiptsScreen = ({ navigation }) => {
    const user = useSelector(state => state.authReducer.value);

    // Fetch receipts data
    const {
        data: receipts = [],
        error,
        isLoading,
        refetch
    } = useGetReceiptsQuery(user.localId);

    // Refetch receipts whenever the screen is focused
    useFocusEffect(
        useCallback(() => {
            refetch(); // This ensures the receipts list updates when returning to this screen
        }, [refetch])
    );

    const renderReceiptItem = ({ item }) => (
        <Pressable
            onPress={() =>
                navigation.navigate("ReceiptDetail", { receipt: item })
            }
        >
            <FlatCard style={styles.receiptContainer}>
                <Text style={styles.title}>Recibo nro: {item.id}</Text>
                <Text style={styles.date}>
                    Creado el {new Date(item.createdAt).toLocaleString("es-Ar")}
                </Text>
                <Text style={styles.total}>Total: ${item.total}</Text>
                <Icon
                    name="visibility"
                    size={24}
                    color={colors.grisOscuro}
                    style={styles.viewIcon}
                />
            </FlatCard>
        </Pressable>
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando recibos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error al cargar los recibos.</Text>
            </View>
        );
    }

    if (receipts.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay recibos disponibles.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={receipts}
            keyExtractor={(item) => item.id}
            renderItem={renderReceiptItem}
        />
    );
};

export default ReceiptsScreen;

const styles = StyleSheet.create({
    receiptContainer: {
        padding: 20,
        margin: 16,
        backgroundColor: colors.grisClaro,
        borderRadius: 10,
    },
    title: {
        fontWeight: "700",
    },
    total: {
        fontSize: 16,
        fontWeight: "700",
    },
    viewIcon: {
        alignSelf: "flex-end",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 16,
        color: colors.grisOscuro,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 16,
        color: "red",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: colors.grisOscuro,
    },
});
