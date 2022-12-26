import {configureStore} from "@reduxjs/toolkit";
import {weatherApi} from "./citiesWeatherApi";

export default configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});
