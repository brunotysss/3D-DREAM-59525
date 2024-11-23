import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const receiptApi = createApi({
    reducerPath: "receiptsApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        postReceipt: builder.mutation({
            query: (receipt) => ({
                url: `receipt.json`,
                method: "POST",
                body: receipt,
            }),
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
        }),
    }),
});

export const { usePostReceiptMutation, useGetReceiptsQuery } = receiptApi;
