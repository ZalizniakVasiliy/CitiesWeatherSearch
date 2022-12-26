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

type WeatherProps = {
  description: string;
};

const CityWeatherDetails = () => {
  const currentCityData = cityDataStorage.getCitiesDetailsData();
  const { id } = useParams();
  const navigate = useNavigate();

  cityDataStorage.getCitiesData()
    .find((city: PropsCity, index: number) => index === Number(id));

  const goBack = () => {
    cityDataStorage.removeTemporaryCityDetailDB();
    navigate(-1);
  };

  const secondsToTime = (duration: number): string => {
    let hour: number | string = parseInt(String((duration / (60 * 60)) % 24));
    let min: number | string = parseInt(String((duration / 60) % 60));

    hour = hour < 10 ? "0" + (hour.toFixed(0)) : hour.toFixed(0);
    min = min < 10 ? "0" + min.toFixed(0) : min.toFixed(0);
    return `${hour}:${min}`;
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Card sx={{ mb: 1, width: "100%" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>{currentCityData.name}</div>
            <div>{currentCityData.sys.country}</div>
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
            <div>
              {currentCityData.weather
                .map((w: WeatherProps) => w.description.toUpperCase())}
            </div>
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
            <div>Temperature</div>
            <div style={{ fontSize: "24px", color: "#88F4E2 " }}>
              {currentCityData.main.temp} &deg;C
            </div>
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
            <div>Feels like</div>
            <div style={{ fontSize: "24px", color: "#88F4E2 " }}>
              {currentCityData.main.feels_like}{" "}&deg;C
            </div>
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
            <div>Pressure</div>
            <div style={{ fontSize: "24px", color: "#88F4E2 " }}>
              {currentCityData.main.pressure} hPa
            </div>
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
            <div>Humidity</div>
            <div style={{ fontSize: "24px", color: "#88F4E2 " }}>
              {currentCityData.main.humidity} %
            </div>
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
            <div>Wind</div>
            <div style={{ fontSize: "24px", color: "#88F4E2 " }}>
              {currentCityData.wind.speed} m/s
            </div>
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
            <div>Visibility</div>
            <div style={{ fontSize: "24px", color: "#88F4E2 " }}>
              {(Number(currentCityData.visibility) / 1000)
                .toFixed(1)}km
            </div>
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
            <div>Sunrise:</div>
            <div style={{ color: "#EAF724" }}>
              {secondsToTime(Number(currentCityData.sys.sunrise)
                + Number(currentCityData.timezone))}
            </div>
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
            <div>Sunset:</div>
            <div style={{ color: "#EB9355" }}>
              {secondsToTime(Number(currentCityData.sys.sunset)
                + Number(currentCityData.timezone))}
            </div>
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
  );
};

export default CityWeatherDetails;
