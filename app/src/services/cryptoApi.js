import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com";
const apiKey = process.env.REACT_APP_RAPID_KEY;

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", apiKey);
      headers.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),
    getCryptoDetails: builder.query({
      query: (currUUID) => `/coin/${currUUID}`,
    }),
    getCryptoHistory: builder.query({
      query: ({ currUUID, timePeriod }) =>
        `/coin/${currUUID}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`,
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
