import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
//import products from '../data/products.json'
import { useEffect, useState } from "react";
import StarsRating from "../components/StarsRating";
import useProductRating from "../hooks/useProductRating"; // Importamos el hook para calcular el rating
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../feactures/cart/cartSilce";
import { useGetProductQuery } from "../services/shopServices";

const ProductDetailScreen = ({ route, navigation }) => {
  //const productId = route.params; // Destructura el productId desde el objeto params
  const productId = useSelector((state) => state.shopReducer.value.productId);
  console.log(productId);
  //const [productFound, setProductFound] = useState({});

  const { width, height } = useWindowDimensions();

  /*
    useEffect(()=>{

      setProductFound(products.find(product=>product.id === productId))
    }, [productId] )*/
  /*useEffect(() => {
      const product = products.find(product => product.id === productId);
    //  console.log("Producto encontrado:", product); // Verifica el resultado de la búsqueda
      setProductFound(product || {}); // Usa un objeto vacío en caso de que no se encuentre el producto
    }, [productId]);
*/

  const {
    data: productFound,
    error,
    isLoading,
  } = useGetProductQuery(productId);

  const dispatch = useDispatch();

  const [promedioRating, totalResenas] = useProductRating(productId); // Obtenemos el promedio de rating y cantidad de reseñas

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.verdeNeon} />
      ) : error ? (
        <Text>Error al cargar las categorias</Text>
      ) : (
        <ScrollView style={styles.productContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
          </Pressable>
          <Text style={styles.textBrand}>{productFound.brand}</Text>
          <Text styles={styles.textTitle}>{productFound.title}</Text>

          <Image
            source={{ uri: productFound.mainImage }}
            alt={productFound.title}
            width="100%"
            height={width * 0.7} // Calcula la altura basada en el ancho
            resizeMode="contain"
          />
          <Text style={styles.longDescription}>
            {" "}
            {productFound.longDescription}
          </Text>

          <View style={styles.tagsContainer}>
            <Text style={styles.tagText}>Tags : </Text>
            {
              /*<FlatList
                                    style={styles.tags}
                                    data={productFound.tags}
                                    keyExtractor={() => Math.random()}
                                    
                                    renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                                />*/
              productFound.tags?.map((tag) => (
                <Text key={Math.random()} style={styles.tagText}>
                  {" "}
                  {tag}
                </Text>
              ))
            }

            {productFound.discount > 0 && (
              <View style={styles.discount}>
                <Text styles={styles.discountText}>
                  - {productFound.discount} %
                </Text>
              </View>
            )}
          </View>
          {productFound.stock <= 0 && (
            <Text style={styles.noStockText}> Sin Stock</Text>
          )}
          <View>
            {/* Envolver las estrellas y el texto de reseñas en un Pressable */}
            <Pressable
              style={styles.ratingContainer}
              onPress={() => navigation.navigate("Review", { productId })}
            >
              <StarsRating rating={promedioRating} />
              <Text>({totalResenas} reseñas)</Text>
            </Pressable>
          </View>

          <Text style={styles.price}>Precio: ${productFound.price}</Text>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.95 : 1 },
              styles.addToCartButton,
            ]}
            onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))}
          >
            <Text style={styles.textAddCToCart}> Agregar al Carrito</Text>
          </Pressable>
        </ScrollView>
      )}
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  goBack: {
    padding: 8,
    color: colors.grisMedio,
  },
  productContainer: {
    paddingHorizontal: 16,
  },
  textBrand: {
    color: colors.grisOscuro,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  longDescription: {
    fontSize: 14,
    textAlign: "justify",
    paddingVertical: 8,
  },
  tag: {
    flexDirection: "row",
    gap: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-around",
    alignItems: "center",
    //  marginVertical: 8,
  },
  price: {
    fontWeight: "400",
    fontSize: 10,
    alignSelf: "center",
    paddingVertical: 10,
  },

  tagText: {
    fontWeight: "600",
    fontSize: 12,
    color: colors.morado,
  },
  discount: {
    backgroundColor: colors.naranjaBrillante,
    width: 64,
    height: 48,
    padding: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  discountText: {
    color: colors.blanco,
    position: "absolute",
    top: 24,
    textAlign: "center",
    alignItems: "center",
  },
  noStockText: {
    color: "red",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    alignSelf: "center",
    paddingVertical: 8,
  },
  addToCartButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.morado,
    borderRadius: 16,
    marginVertical: 16,
  },
  textAddCToCart: {
    color: colors.blanco,
    fontSize: 24,
    textAlign: "center",
  },
});
