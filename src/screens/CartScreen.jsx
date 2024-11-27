import { Pressable, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService';
import { clearCart, removeItem } from '../feactures/cart/cartSilce';
import { useUpdateUserPurchaseMutation } from "../services/reviewService";

const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [triggerPost] = usePostReceiptMutation();

    const cart = useSelector((state) => state.cartReducer.value.cartItems);
    const total = useSelector((state) => state.cartReducer.value.total);
    const user = useSelector((state) => state.authReducer.value);
    const [updateUserPurchase] = useUpdateUserPurchaseMutation();

    // Manejar la confirmación del carrito
    const handleConfirm = async () => {
        if (!user?.email || !user?.localId) {
            navigation.navigate("Auth", { screen: "Login", params: { redirectTo: "Cart" } });
            return;
        }

        const receipt = {
            items: cart,
            total,
            createdAt: Date.now(),
            userId: user.localId, // UID del usuario logueado
        };

        try {
            const result = await triggerPost(receipt).unwrap();
            console.log("Recibo creado exitosamente:", result);
  // Actualizar el estado de las compras del usuario
  for (const item of cart) {
    await updateUserPurchase({ userId: user.localId, productId: item.id });
  }
            // Limpia el carrito
            dispatch(clearCart());

            // Navega a la pantalla de recibos
            navigation.navigate("Receipts");
        } catch (error) {
            console.error("Error al crear el recibo:", error);
        }
    };

    // Manejar la eliminación de un producto
    const handleDelete = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerTotal}>Total: ${total}</Text>
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
            </Pressable>
        </View>
    );
    const renderCartItem = ({ item }) => {
        // Validar que el item no sea nulo o undefined
        if (!item || !item.id) {
            console.error("El item no es válido:", item);
            return null;
        }
    
        return (
            <FlatCard style={styles.cartContainer}>
                <View>
                    <Image
                        source={{ uri: item.mainImage }}
                        style={styles.cartImage}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.cartDescription}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.shortDescription}</Text>
                    <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
                    <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                    <Text style={styles.total}>Total: ${item.quantity * item.price}</Text>
                    <Pressable onPress={() => handleDelete(item.id)}>
                        <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon} />
                    </Pressable>
                </View>
            </FlatCard>
        );
    };
    
    // Validar que los datos en `cart` son un array antes de pasarlos a `FlatList`
    return (
        <>
            {Array.isArray(cart) && cart.length > 0 ? (
                <FlatList
                    data={cart}
                    keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
                    renderItem={renderCartItem}
                    ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
                    ListFooterComponent={<FooterComponent />}
                />
            ) : (
                <View style={styles.cartEmpty}>
                    <Text style={styles.cartEmptyText}>Aún no hay productos en el carrito</Text>
                </View>
            )}
        </>
    );
    
    
};

export default CartScreen;

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10
    },
    cartImage: {
        width: 80,
        height: 80
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '700'
    },
    description: {
        marginBottom: 16,
    },
    total: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700'
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerContainer: {
        padding: 32,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTotal: {
        fontSize: 16,
        fontWeight: '700'
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginBottom: 24,
    },
    confirmButtonText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    cartScreenTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: "center",
        paddingVertical: 8
    },
    cartEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartEmptyText: {
        fontSize: 16
    }
});
