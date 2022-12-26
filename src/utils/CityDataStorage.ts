import { PropsCity } from "../components/CitiesList";

class CityDataStorage {
  dataCitiesDBName: string | null = "cities";
  dataCityDetailsDBName: string | null = "citiesDetails";

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

  removeTemporaryCityDetailDB() {
    if (typeof this.dataCityDetailsDBName === "string") {
      localStorage.removeItem(this.dataCityDetailsDBName);
    }
  }
}

export default new CityDataStorage();