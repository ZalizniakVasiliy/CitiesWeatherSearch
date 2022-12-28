import List from "@mui/material/List";
import City from "./City";
import cityDataStorage from "../utils/CityDataStorage";
import * as React from "react";

export type PropsCity = {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
  id: number;
}

type Props = {
  cities: PropsCity[];
  setCitiesList: (city: PropsCity[]) => void;
}

const CitiesList = ({ cities = [], setCitiesList }: Props) => {

  const handleRemoveCityCard = (indexCity: number) => {
    const cities = cityDataStorage.getCitiesData();
    const newCitiesList = cities
      .filter((city: PropsCity, index: number) => index !== indexCity);
    cityDataStorage.setCitiesData(newCitiesList);
    setCitiesList(newCitiesList);
  };

  return (
    <List>
      {cities.map((city: PropsCity, index: number) => (
        <City key={index}
              city={city}
              index={index}
              handleRemoveCityCard={handleRemoveCityCard}
        />))}
    </List>
  );
};

export default CitiesList;
