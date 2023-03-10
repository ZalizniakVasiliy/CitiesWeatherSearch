import {
  useLazyGetCityListDataQuery
} from "../store/citiesWeatherApi";
import Container from "@mui/material/Container";
import React, { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ProgressLoader from "../assets/ProgressLoader";
import SearchLocations from "../components/SearchLocations";
import CitiesList, { PropsCity } from "../components/CitiesList";
import cityDataStorage from "../utils/CityDataStorage";

const MainPage = () => {
  const currentSearchValue = useRef<string>();

  const [searchCities, { data: searchList, isLoading }] = useLazyGetCityListDataQuery();
  const [userCities, setUserCities] = useState<PropsCity[]>(cityDataStorage.getCitiesData());

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    currentSearchValue.current = e.target.value;
  };

  const handleSearch = () => {
    if (!currentSearchValue.current) return;
    searchCities(currentSearchValue.current);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      currentSearchValue.current = (event.target as HTMLInputElement).value;
      handleSearch()
    }
  };

  const handleSpecifiedCity = (city: PropsCity) => {
    currentSearchValue.current = "";
    const newCities = [city, ...userCities];
    cityDataStorage.setCitiesData(newCities);
    setUserCities(newCities);
  };

  return (
    isLoading ? <ProgressLoader /> :
      (<Container style={{ display: "flex", marginTop: "30px" }}>
        <Container
          maxWidth="sm"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Paper
            component="form"
            onSubmit={(event) => event.preventDefault()}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%"
            }}
          >
            <InputBase
              sx={{ ml: 1, pl: "4px", flex: 1 }}
              placeholder="Search city"
              defaultValue={currentSearchValue.current}
              onChange={handleInput}
              onKeyUp={handleKeyUp}
            />
            <IconButton
              type="button"
              sx={{ p: "8px", m: "4px 4px 4px 0" }}
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          {<CitiesList cities={userCities} setCitiesList={setUserCities} />}
        </Container>
        <Container
          maxWidth="sm"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {currentSearchValue.current &&
            <SearchLocations
              onHandleSpecifiedCity={handleSpecifiedCity}
              citiesList={searchList || []}
            />}
        </Container>
      </Container>)
  );
};

export default MainPage;
