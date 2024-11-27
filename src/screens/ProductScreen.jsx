import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import FlatCard from "../components/FlatCard";
import StarsRating from "../components/StarsRating";
import useProductRating from "../hooks/useProductRating"; // Importamos el hook para calcular el rating
import { colors } from "../global/colors";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsByCategoryQuery } from "../services/shopServices";
import { setProductId } from "../feactures/shop/shopSlice";

//const ProductScreen = ({category , setCategory , setProductId}) => {
const ProductScreen = ({ navigation, route }) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [search, setSearch] = useState("");

  //const  category  = route.params // Agrega un valor por defecto para evitar errores si no hay params
  //const category = useSelector(state=> state.shopReducer.value.categorySelected)

  //  const productsFilteredByCategory = useSelector(state=>state.shopReducer.value.productsFilteredByCategory)

  const category = useSelector(
    (state) => state.shopReducer.value.categorySelected
  );

  const {
    data: productsFilteredByCategory,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(category);
  dispatch = useDispatch();

  /*useEffect(() => {
        setProductsFiltered(productsFilteredByCategory)
        if (search) {
            setProductsFiltered(productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search,productsFilteredByCategory])*/
  useEffect(() => {
    console.log("Productos sin filtrar:", productsFilteredByCategory);
    console.log("Valor del search:", search);
    if (productsFilteredByCategory) {
      const filtered = search
        ? productsFilteredByCategory.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
        : productsFilteredByCategory;
      console.log("Productos filtrados:", filtered);
      setProductsFiltered(filtered);
    }
  }, [search, productsFilteredByCategory]);

  /*
    useEffect(() =>{    
     
        const productsTempFiltered = products.filter(prodruct=> product.category.toLowerCase() === category.toLowerCase())
        setProductsFiltered(productsTempFiltered)
       if(search){
            const productsTempSearched = productsFiltered.filter(product=>product.title.includes(search.toLowerCase()))
            setProductsFiltered(productsTempSearched)
        }
    },[category, search])*/

  const renderProductItem = ({ item }) => {
    const [promedioRating, totalResenas] = useProductRating(item.id); // Obtenemos el promedio de rating y cantidad de reseñas
    return (
      <Pressable
        onPress={() => {
          dispatch(setProductId(item.id));
          navigation.navigate("Producto");
        }}
      >
        <FlatCard style={styles.productContainer}>
          <View>
            <Image
              source={{ uri: item.mainImage }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.productDescription}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.shortDescription}>{item.shortDescription}</Text>
            <View style={styles.tags}>
              <Text style={styles.tagText}>Tags : </Text>
              {
              /*<FlatList
                                    style={styles.tags}
                                    data={productFound.tags}
                                    keyExtractor={() => Math.random()}
                                    
                                    renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                                />*/
              item.tags?.map((tag) => (
                <Text key={Math.random()} style={styles.tagText}>
                  {" "}
                  {tag}
                </Text>
              ))
            }
              <View>
                <StarsRating rating={promedioRating} />
                <Text>({totalResenas} reseñas)</Text>
              </View>
            </View>

            {item.discount > 0 && (
              <View style={styles.discount}>
                <Text styles={styles.discount}>
                  Descuento : {item.discount} %
                </Text>
              </View>
            )}
            {item.stock <= 0 && (
              <Text style={styles.noStockText}> Sin Stock</Text>
            )}
            <Text style={styles.price}>Precio: ${item.price}</Text>
          </View>
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.verdeNeon} />
      ) : error ? (
        <Text>Error al cargar las categorias</Text>
      ) : (
        <>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
          </Pressable>
          <Search setSearch={setSearch} />
          <FlatList
            data={productsFiltered}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
          />
        </>
      )}
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row", // Alinea la imagen y la descripción horizontalmente
    padding: 10, // Espacio interno
    justifyContent: "flex-start",
    gap: 10, // Espacio entre la imagen y la descripción
    margin: 5, // Espacio externo
    alignItems: "center", // Centra verticalmente
    width: "100%", // Ocupa todo el ancho disponible
  },
  productImage: {
    width: 80, // Tamaño ajustado
    height: 80,
    alignSelf: "center", // Centrado vertical
  },
  productDescription: {
    flex: 1, // Asegura que este elemento ocupe todo el espacio disponible
    padding: 5, // Espacio interno
    gap: 5, // Espaciado entre los elementos de la descripción
  },
  productTitle: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 16,
  },
  shortDescription: {
    fontSize: 12,
    color: colors.grisMedioOscuro,
  },
  tags: {
    flexDirection: "row", // Alineación horizontal
    flexWrap: "wrap", // Permite que los elementos pasen a la siguiente línea si es necesario
    gap: 5,
  },
  tagText: {
    fontWeight: "600",
    fontSize: 10,
    color: colors.morado,
  },
  price: {
    fontWeight: "800",
    fontSize: 16,
    color: colors.verdeNeon,
  },
  discount: {
    backgroundColor: colors.naranjaBrillante,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  discountText: {
    color: colors.blanco,
    fontSize: 12,
  },
  noStockText: {
    color: "red",
    fontSize: 12,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  goBack: {
    padding: 8,
    color: colors.grisMedio,
  },
});
