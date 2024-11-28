import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getReviewsByProduct: builder.query({
      query: (productId) => `reviews/${productId}/reviews.json`,
      transformResponse: (response) => {
       // console.log("Response from Firebase:", response);
        return response ? Object.values(response) : []; // Transforma los datos de Firebase
      },
    }),
    postReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `reviews/${productId}/reviews.json`,
        method: "POST",
        body: review,
      }),
    }),
  }),
});

export const { useGetReviewsByProductQuery, usePostReviewMutation } = reviewApi;
