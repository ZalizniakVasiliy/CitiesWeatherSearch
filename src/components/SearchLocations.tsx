import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { PropsCity } from "./CitiesList";

type Props = {
  citiesList: PropsCity[];
  onHandleSpecifiedCity: (city: PropsCity) => void;
}

const SearchLocations = ({ citiesList, onHandleSpecifiedCity }: Props) => {
  return (
    <List sx={{ p: "0", mt: "60px" }}>
      {citiesList.length > 0 && citiesList.map((currentCity, index) => (
        <ListItem key={index}
                  sx={{ p: 0, listStyle: "none" }}>
          <Button
            sx={{
              textAlign: "left",
              marginBottom: "8px",
              whiteSpace: "pre-line"
            }}
            type="button"
            onClick={() => onHandleSpecifiedCity(currentCity)}
            color="success"
            variant="contained"
          >
            {`city: ${currentCity.name},
              country: ${currentCity.country === "NO" ? `not specified`
              : currentCity.country
            },
              state: ${currentCity.state || `not specified`},
              latitude: ${currentCity.lat},
              longitude: ${currentCity.lon}`}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchLocations;