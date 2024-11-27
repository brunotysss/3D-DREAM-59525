import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import {
  useGetReviewsByProductQuery,
  usePostReviewMutation,
  useHasUserPurchasedProductQuery,
} from "../services/reviewService";
import { useSelector } from "react-redux";
import StarRating from "../components/StarsRating";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const ReviewScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const user = useSelector((state) => state.authReducer.value);

  // Fetch de las reseñas del producto
  const { data: reviews = [], isLoading } = useGetReviewsByProductQuery(
    productId
  );

  // Verifica si el usuario compró el producto
  const { data: hasPurchased = false, refetch: refetchHasPurchased } =
    useHasUserPurchasedProductQuery({
      userId: user.localId,
      productId,
    });

  // Mutation para enviar una reseña
  const [postReview] = usePostReviewMutation();

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [userHasCommented, setUserHasCommented] = useState(false);

  // Calculamos el promedio y el total de reseñas
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

  // Verifica si el usuario ya comentó
  useEffect(() => {
    if (reviews.some((review) => review.user === user.email)) {
      setUserHasCommented(true);
    } else {
      setUserHasCommented(false);
    }
  }, [reviews, user.email]);

  // Refetch automático cuando se monta la pantalla
  useEffect(() => {
    refetchHasPurchased();
  }, [refetchHasPurchased]);

  // Maneja el envío de la reseña
  const handlePostReview = async () => {
    if (!hasPurchased) {
      alert("Solo los usuarios que compraron este producto pueden comentar.");
      return;
    }

    if (userHasCommented) {
      alert("Ya has comentado este producto.");
      return;
    }

    if (newReview.trim() !== "" && rating > 0) {
      try {
        await postReview({
          productId,
          review: { user: user.email, comment: newReview, rating },
        });
        setNewReview("");
        setRating(0);

        // Actualizamos las reseñas y verificamos si el usuario puede comentar
        refetchHasPurchased();
      } catch (error) {
        console.error("Error al enviar la reseña:", error);
      }
    } else {
      alert("Por favor, completa tu reseña y selecciona una calificación.");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
        <Text style={styles.ratingSubText}>
          ({totalReviews} calificaciones)
        </Text>
      </View>

      {isLoading ? (
        <Text>Cargando reseñas...</Text>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
            </View>
          )}
        />
      )}

      {hasPurchased && !userHasCommented && (
        <>
          <StarRating
            maxStars={5}
            rating={rating}
            onRatingChange={setRating}
            size={32}
            interactive={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Escribe tu opinión..."
            value={newReview}
            onChangeText={setNewReview}
          />
          <Pressable style={styles.button} onPress={handlePostReview}>
            <Text style={styles.buttonText}>Enviar Opinión</Text>
          </Pressable>
        </>
      )}

      {!hasPurchased && (
        <Text style={styles.notice}>
          Solo los usuarios que compraron este producto pueden dejar reseñas.
        </Text>
      )}

      {userHasCommented && (
        <Text style={styles.notice}>
          Ya has comentado este producto. Gracias por tu opinión.
        </Text>
      )}
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "orange",
  },
  ratingSubText: {
    fontSize: 16,
    color: "gray",
  },
  reviewContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  user: {
    fontSize: 18,
    fontWeight: "bold",
  },
  comment: {
    fontSize: 16,
    marginVertical: 8,
  },
  rating: {
    fontSize: 16,
    color: "orange",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  goBack: {
    padding: 8,
    color: colors.grisMedio,
  },
  notice: {
    marginTop: 16,
    color: "red",
    textAlign: "center",
  },
});
