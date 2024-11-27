import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const receiptApi = createApi({
  reducerPath: "receiptsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  tagTypes: ["Receipts"],
  endpoints: (builder) => ({
    postReceipt: builder.mutation({
      queryFn: async (receipt, { dispatch }, extraOptions, baseQuery) => {
        // 1. Crear el recibo
        const receiptResult = await baseQuery({
          url: `receipt.json`,
          method: "POST",
          body: receipt,
        });

        if (receiptResult.error) return { error: receiptResult.error };

        // 2. Actualizar `userPurchases`
        const updates = {};
        receipt.items.forEach((item) => {
          updates[`userPurchases/${receipt.userId}/${item.id}`] = true;
        });

        const userPurchasesResult = await baseQuery({
          url: `.json`,
          method: "PATCH",
          body: updates,
        });

        if (userPurchasesResult.error) return { error: userPurchasesResult.error };

        return { data: receiptResult.data };
      },
      invalidatesTags: ["Receipts"],
    }),
    getReceipts: builder.query({
      query: (userId) =>
        `receipt.json?orderBy="userId"&equalTo="${userId}"`,
      transformResponse: (response) =>
        response
          ? Object.entries(response).map(([id, data]) => ({
              id,
              ...data,
            }))
          : [],
      providesTags: ["Receipts"],
    }),
  }),
});

export const { usePostReceiptMutation, useGetReceiptsQuery } = receiptApi;
