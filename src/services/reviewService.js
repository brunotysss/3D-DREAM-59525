import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  tagTypes: ["ProductReviews", "UserPurchases"], // Agregamos un tag para las compras del usuario
  endpoints: (builder) => ({
    getReviewsByProduct: builder.query({
      query: (productId) => `reviews/${productId}/reviews.json`,
      transformResponse: (response) =>
        response ? Object.values(response) : [],
      providesTags: (result, error, productId) => [
        { type: "ProductReviews", id: productId },
      ],
    }),
    postReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `reviews/${productId}/reviews.json`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "ProductReviews", id: productId },
      ],
    }),
    hasUserPurchasedProduct: builder.query({
      query: ({ userId, productId }) =>
        `userPurchases/${userId}/${productId}.json`,
      transformResponse: (response) => !!response, // Devuelve true si el producto existe
      providesTags: (result, error, { userId, productId }) => [
        { type: "UserPurchases", id: `${userId}-${productId}` },
      ],
    }),
    updateUserPurchase: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `userPurchases/${userId}/${productId}.json`,
        method: "PATCH",
        body: true, // Actualizamos la compra como verdadera
      }),
      invalidatesTags: (result, error, { userId, productId }) => [
        { type: "UserPurchases", id: `${userId}-${productId}` },
      ],
    }),
  }),
});

export const {
  useGetReviewsByProductQuery,
  usePostReviewMutation,
  useHasUserPurchasedProductQuery,
  useUpdateUserPurchaseMutation,
} = reviewApi;
