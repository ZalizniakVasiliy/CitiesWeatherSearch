import * as React from "react";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import cityDataStorage from "../utils/CityDataStorage";
import { PropsCity } from "../components/CitiesList";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { threeHourlyTemperature } from "../assets/threeHourlyTemperature";
import { WeatherProps } from "../assets/WeatherProps";

const CityWeatherDetails = () => {
  const currentCityData = cityDataStorage.getCitiesDetailsData();

  const secondsToTime = (duration: number): string => {
    let hour: number | string = parseInt(String((duration / (60 * 60)) % 24));
    let min: number | string = parseInt(String((duration / 60) % 60));

    hour = hour < 10 ? "0" + (hour.toFixed(0)) : hour.toFixed(0);
    min = min < 10 ? "0" + min.toFixed(0) : min.toFixed(0);
    return `${hour}:${min}`;
  };

  const temperatureThreeHourlyList = cityDataStorage.getCityWeatherListData();

  const getTemperatureList = () => {
    return temperatureThreeHourlyList.list.slice(0, 8).map((item: threeHourlyTemperature) => {
      return item.main.temp;
    });
  };

  const getTemperatureTimeList = () => {
    return temperatureThreeHourlyList.list.slice(0, 8).map((item: threeHourlyTemperature) => {
      return secondsToTime(item.dt);
    });
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: `Three hourly temperature chart of the ${currentCityData.name}`
      }
    }
  };

  const labels = getTemperatureTimeList();
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: getTemperatureList().map((item: number) => item),
        backgroundColor: "lightgreen"
      }
    ]
  };

  const { id } = useParams();
  const navigate = useNavigate();

  cityDataStorage.getCitiesData()
    .find((city: PropsCity, index: number) => index === Number(id));

  const goBack = () => {
    cityDataStorage.removeTemporaryCityDetailDB();
    navigate(-1);
  };

  return (
    <Container sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Container maxWidth="sm">
        <Card sx={{ mb: 1, width: "100%" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{currentCityData.name}</span>
              <span>{currentCityData.sys.country}</span>
            </Typography>
            <Divider />
            <Typography
              color="text.secondary"
              sx={{
                mt: "20px",
                color: "#88F4E2 ",
                fontSize: "20px",
                textAlign: "center"
              }}
            >
              <span>
                {currentCityData.weather
                  .map((w: WeatherProps) => w.description.toUpperCase())}
              </span>
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mt: "20px",
                color: "lightgreen"
              }}
            >
              <span>Temperature</span>
              <span style={{ fontSize: "24px", color: "#88F4E2 " }}>
                {currentCityData.main.temp} &deg;C
              </span>
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mt: "5px",
                color: "lightgreen"
              }}
            >
              <span>Feels like</span>
              <span style={{ fontSize: "24px", color: "#88F4E2 " }}>
                {currentCityData.main.feels_like}{" "}&deg;C
              </span>
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mt: "5px",
                color: "lightgreen"
              }}
            >
              <span>Pressure</span>
              <span style={{ fontSize: "24px", color: "#88F4E2 " }}>
                {currentCityData.main.pressure} hPa
              </span>
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mt: "5px",
                color: "lightgreen"
              }}
            >
              <span>Humidity</span>
              <span style={{ fontSize: "24px", color: "#88F4E2 " }}>
                {currentCityData.main.humidity} %
              </span>
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mt: "5px",
                color: "lightgreen"
              }}
            >
              <span>Wind</span>
              <span style={{ fontSize: "24px", color: "#88F4E2 " }}>
                {currentCityData.wind.speed} m/s
              </span>
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mt: "5px",
                color: "lightgreen"
              }}
            >
              <span>Visibility</span>
              <span style={{ fontSize: "24px", color: "#88F4E2 " }}>
                {(Number(currentCityData.visibility) / 1000)
                  .toFixed(1)} km
              </span>
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mt: "30px",
                color: "lightgreen",
                fontSize: "24px"
              }}
            >
              <span>Sunrise:</span>
              <span style={{ color: "#EAF724" }}>
                {secondsToTime(Number(currentCityData.sys.sunrise)
                  + Number(currentCityData.timezone))}
              </span>
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mt: "5px",
                color: "lightgreen",
                fontSize: "24px"
              }}
            >
              <span>Sunset:</span>
              <span style={{ color: "#EB9355" }}>
                {secondsToTime(Number(currentCityData.sys.sunset)
                  + Number(currentCityData.timezone))}
              </span>
            </Typography>
            <Divider />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="warning"
              variant="contained"
              sx={{ p: "5px", m: "0 0 8px 8px" }}
              onClick={goBack}
            >
              Go Back
            </Button>
          </CardActions>
        </Card>
      </Container>
      <Container maxWidth="sm">
        <Bar data={data} options={options} />
      </Container>
    </Container>
  );
};

export default CityWeatherDetails;
