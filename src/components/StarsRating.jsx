import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const StarRating = ({
  maxStars = 5,
  rating = 0,
  onRatingChange,
  size = 24, // Tamaño configurable
  interactive = false, // Define si es interactivo o no
}) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  useEffect(() => {
    setSelectedRating(rating);
  }, [rating]);

  const handleStarPress = (index) => {
    if (interactive) {
      const newRating = index + 1;
      setSelectedRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating);
      }
    }
  };

  return (
    <View style={styles.starsContainer}>
      {Array.from({ length: maxStars }, (_, index) => (
        <Pressable
          key={index}
          onPress={() => handleStarPress(index)}
          disabled={!interactive} // Desactiva la interacción si no es interactivo
          style={({ pressed }) => [
            styles.star,
            pressed && interactive && { opacity: 0.7 },
          ]}
        >
          <Text
            style={[
              index < selectedRating ? styles.fullStar : styles.emptyStar,
              { fontSize: size }, // Tamaño dinámico
            ]}
          >
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default React.memo(StarRating);

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  star: {
    marginHorizontal: 2,
  },
  fullStar: {
    color: "orange",
  },
  emptyStar: {
    color: "gray",
  },
});


/*
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const StarRating = ({ maxStars = 5, rating = 0, onRatingChange, size = 32 }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  // Actualiza el estado interno si el prop `rating` cambia
  useEffect(() => {
    setSelectedRating(rating);
  }, [rating]);

  const handleStarPress = (index) => {
    const newRating = index + 1;
    setSelectedRating(newRating); // Actualiza el estado interno
    if (onRatingChange) {
      onRatingChange(newRating); // Notifica al componente padre
    }
  };

  return (
    <View style={styles.starsContainer}>
      {Array.from({ length: maxStars }, (_, index) => (
        <Pressable
          key={index}
          onPress={() => handleStarPress(index)}
          style={({ pressed }) => [
            styles.star,
            pressed && { opacity: 0.7 }, // Reduce la opacidad al presionar
          ]}
        >
          <Text
            style={[
              styles.starText,
              {
                fontSize: size, // Ajusta dinámicamente el tamaño de las estrellas
                color: index < selectedRating ? "orange" : "gray", // Colorea según la selección
              },
            ]}
          >
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default React.memo(StarRating);

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  star: {
    marginHorizontal: 4,
  },
  starText: {
    fontSize: 32, // Tamaño predeterminado
  },
});

*/