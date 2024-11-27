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
import { colors } from "../global/colors";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsByCategoryQuery } from "../services/shopServices";
import { useGetReviewsByProductQuery } from "../services/reviewService"; // Para obtener reviews
import { setProductId } from "../feactures/shop/shopSlice";

const ProductScreen = ({ navigation }) => {
  const [productsWithReviews, setProductsWithReviews] = useState([]); // Productos con datos de reseñas
  const [search, setSearch] = useState("");

  const category = useSelector(
    (state) => state.shopReducer.value.categorySelected
  );

  const { data: productsFilteredByCategory, error, isLoading } =
    useGetProductsByCategoryQuery(category);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productsFilteredByCategory) {
      // Traer todas las reseñas de los productos
      const fetchReviews = async () => {
        const productsWithRatings = await Promise.all(
          productsFilteredByCategory.map(async (product) => {
            const { data: reviews = [] } = useGetReviewsByProductQuery(
              product.id
            );

            const totalReviews = reviews.length;
            const averageRating =
              totalReviews > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) /
                  totalReviews
                : 0;

            return {
              ...product,
              averageRating,
              totalReviews,
            };
          })
        );
        setProductsWithReviews(productsWithRatings);
      };

      fetchReviews();
    }
  }, [productsFilteredByCategory]);

  useEffect(() => {
    if (search) {
      const filtered = productsWithReviews.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setProductsWithReviews(filtered);
    }
  }, [search]);

  const renderProductItem = ({ item }) => (
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
            <Text style={styles.tagText}>Tags: </Text>
            {item.tags?.map((tag) => (
              <Text key={tag} style={styles.tagText}>
                {tag}
              </Text>
            ))}
          </View>
          <View style={styles.ratingContainer}>
            <StarsRating rating={item.averageRating} size={16} interactive={false} />
            <Text>({item.totalReviews} reseñas)</Text>
          </View>
          {item.discount > 0 && (
            <View style={styles.discount}>
              <Text style={styles.discountText}>
                Descuento: {item.discount}%
              </Text>
            </View>
          )}
          {item.stock <= 0 && (
            <Text style={styles.noStockText}>Sin Stock</Text>
          )}
          <Text style={styles.price}>Precio: ${item.price}</Text>
        </View>
      </FlatCard>
    </Pressable>
  );

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.verdeNeon} />
      ) : error ? (
        <Text>Error al cargar las categorías</Text>
      ) : (
        <>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
          </Pressable>
          <Search setSearch={setSearch} />
          <FlatList
            data={productsWithReviews}
            keyExtractor={(item) => item.id.toString()}
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
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    gap: 10,
    margin: 5,
    alignItems: "center",
    width: "100%",
  },
  productImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  productDescription: {
    flex: 1,
    padding: 5,
    gap: 5,
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
    flexDirection: "row",
    flexWrap: "wrap",
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
