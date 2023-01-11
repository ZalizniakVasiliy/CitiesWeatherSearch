import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";
import { useGetSpecifiedCityHourlyWeatherQuery, useGetSpecifiedCityWeatherQuery }
  from "../store/citiesWeatherApi";
import ProgressLoader from "../assets/ProgressLoader";
import { useNavigate } from "react-router-dom";
import RoutesToPages from "../utils/RoutesToPages";
import cityDataStorage from "../utils/CityDataStorage";
import { PropsCity } from "./CitiesList";

type Props = {
  city: PropsCity;
  index: number;
  handleRemoveCityCard: (indexCity: number) => void;
};

type WeatherProps = {
  id: number;
  description: string;
};

const City = ({ city, index, handleRemoveCityCard }: Props) => {
  const {
    data: cityData,
    isLoading,
    isFetching,
    refetch
  } = useGetSpecifiedCityWeatherQuery({
    lat: city.lat,
    lon: city.lon
  });

  const { data: cityWeatherThreeHourly } = useGetSpecifiedCityHourlyWeatherQuery(
    { lat: city.lat, lon: city.lon });

  const navigate = useNavigate();

  const showWeatherDetails = (id: number) => {
    cityDataStorage.setCityDetailData({ ...cityData });
    cityDataStorage.setCityWeatherListData({ ...cityWeatherThreeHourly });
    navigate(RoutesToPages.selectedCity + id);
  };

  return (
    isLoading ? <ProgressLoader /> :
      (
        <ListItem sx={{ p: 0, listStyle: "none" }}>
          <Card sx={{ mb: 1, width: "100%" }}>
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={refetch}
              >
                <UpdateIcon />
              </Button>
              {isFetching ? <Typography color="#66BB6A">Updating...</Typography> : null}
            </CardActions>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>{city.name}</div>
                <div>{city.country}</div>
              </Typography>
              <Divider />
              <Typography
                variant="h4"
                color="text.secondary"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "15px"
                }}
              >
                <div>{cityData.main.temp} &deg;C</div>
                <div style={{ fontSize: "24px", textAlign: "right" }}>
                  {cityData.weather.map((w: WeatherProps) => (
                    <div key={w.id}>{w.description}</div>
                  ))}
                </div>
              </Typography>
              <Divider />
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button size="small"
                      variant="outlined"
                      color="success"
                      onClick={() => showWeatherDetails(index)}
              >
                More details
              </Button>
              <Button size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveCityCard(index)}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      )
  );
};

export default City;
