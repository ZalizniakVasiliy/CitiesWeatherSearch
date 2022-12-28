import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OPEN_WEATHER_API_BASE_URL } from "../../utils/API_CONFIG";
import { API_KEY } from "../../utils/API_CONFIG";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: OPEN_WEATHER_API_BASE_URL
  }),
  keepUnusedDataFor: 5,

  endpoints: (build) => ({
    getCityListData: build.query({
      query: (cityName) =>
        `geo/1.0/direct?q=${cityName}&limit=100&appid=${API_KEY}`

    }),

    getSpecifiedCityWeather: build.query({
      query: (coordinatesCity) =>
        `data/2.5/weather?lat=${coordinatesCity.lat}&lon=${coordinatesCity.lon}&units=metric&appid=${API_KEY}`
    }),

    getSpecifiedCityHourlyWeather: build.query({
      query: (coordinatesCity) =>
        `data/2.5/forecast?lat=${coordinatesCity.lat}&lon=${coordinatesCity.lon}&appid=${API_KEY}&units=metric`
    })
  })
});

export const {
  useLazyGetCityListDataQuery,
  useGetSpecifiedCityWeatherQuery,
  useGetSpecifiedCityHourlyWeatherQuery
} = weatherApi;
