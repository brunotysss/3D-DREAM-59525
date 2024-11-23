import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import { base_url } from "../firebase/database";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    putUser: builder.mutation({
      query: ({ localId, userData }) => ({
        url: `users/${localId}.json`, // Guarda todos los datos en el nodo "users"
        method: "PUT",
        body: userData, // Información completa del usuario
      }),
    }),
    getUser: builder.query({
      query: (localId) => `users/${localId}.json`, // Obtiene los datos del usuario
    }),
  }),
});

export const { usePutUserMutation, useGetUserQuery } = userApi;
