import { PropsCity } from "../components/CitiesList";
import { threeHourlyTemperatureAllData } from "../assets/threeHourlyTemperatureAllData";

class CityDataStorage {
  dataCitiesDBName: string | null = "cities";
  dataCityDetailsDBName: string | null = "citiesDetails";
  dataCityWeatherListDBName: string | null = "citiesWeatherList";

  getCitiesData() {
    const value = localStorage.getItem(this.dataCitiesDBName as string);
    return typeof value === "string" ? JSON.parse(value) : [];
  }

  setCitiesData(cityData: PropsCity[]) {
    const localCitiesData = [...cityData];

    if (typeof this.dataCitiesDBName === "string") {
      localStorage.setItem(
        this.dataCitiesDBName,
        JSON.stringify(localCitiesData)
      );
    }

    return localCitiesData;
  }

  getCitiesDetailsData() {
    const value = localStorage.getItem(this.dataCityDetailsDBName as string);
    return typeof value === "string" ? JSON.parse(value) : {};
  }

  setCityDetailData(cityDetailData: PropsCity) {
    const localCityDetailData = { ...cityDetailData };

    if (typeof this.dataCityDetailsDBName === "string") {
      localStorage.setItem(
        this.dataCityDetailsDBName,
        JSON.stringify(localCityDetailData)
      );
    }

    return localCityDetailData;
  }

  getCityWeatherListData() {
    const value = localStorage.getItem(this.dataCityWeatherListDBName as string);
    return typeof value === "string" ? JSON.parse(value) : {};
  }

  setCityWeatherListData(cityWeatherList: threeHourlyTemperatureAllData) {
    const localCityDetailData = { ...cityWeatherList };

    if (typeof this.dataCityWeatherListDBName === "string") {
      localStorage.setItem(
        this.dataCityWeatherListDBName,
        JSON.stringify(localCityDetailData)
      );
    }

    return localCityDetailData;
  }

  removeTemporaryCityDetailDB() {
    if (typeof this.dataCityDetailsDBName === "string") {
      localStorage.removeItem(this.dataCityDetailsDBName);
    }
    if (typeof this.dataCityWeatherListDBName === "string") {
      localStorage.removeItem(this.dataCityWeatherListDBName);
    }
  }
}

export default new CityDataStorage();
