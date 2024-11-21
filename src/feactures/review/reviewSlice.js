import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    value: {
      reviews: [], // Lista de reseñas cargadas
      productId: null, // Producto actual
    },
  },
  reducers: {
    setReviews: (state, action) => {
      state.value.reviews = action.payload; // Carga las reseñas desde Firebase
    },
    setProductId: (state, action) => {
      state.value.productId = action.payload; // Establece el producto actual
    },
    clearReviews: (state) => {
      state.value.reviews = []; // Limpia las reseñas del estado
    },
  },
});

export const { setReviews, setProductId, clearReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
