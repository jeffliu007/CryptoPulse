import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const apiKey = process.env.REACT_APP_RAPID_KEY;

export const cryptoApiNews = createApi({
  reducerPath: "cryptoApiNews",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("X-BingApis-SDK", "true");
      headers.set("X-RapidAPI-Host", "bing-news-search1.p.rapidapi.com");
      headers.set("X-RapidAPI-Key", apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoApiNews;
