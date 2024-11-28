import React, { useState } from "react";
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
} from "../services/reviewService";

const ReviewScreen = ({ route }) => {
  const { productId } = route.params;
  const { data: reviews = [], isLoading } = useGetReviewsByProductQuery(productId);
  const [postReview] = usePostReviewMutation();
  const [newReview, setNewReview] = useState("");

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

  const handlePostReview = async () => {
    if (newReview.trim() !== "") {
      try {
        await postReview({
          productId,
          review: { user: "Anonymous", comment: newReview, rating: 5 },
        });
        setNewReview("");
      } catch (error) {
        console.error("Error al enviar la reseña:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con puntuación promedio */}
      <View style={styles.header}>
        <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
        <Text style={styles.ratingSubText}>
          ({totalReviews} calificaciones)
        </Text>
      </View>

      {/* Lista de reseñas */}
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

      {/* Input para añadir reseña */}
      <TextInput
        style={styles.input}
        placeholder="Escribe tu opinión..."
        value={newReview}
        onChangeText={setNewReview}
      />
      <Pressable style={styles.button} onPress={handlePostReview}>
        <Text style={styles.buttonText}>Enviar Opinión</Text>
      </Pressable>
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
});
