import * as React from 'react';
import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CityWeatherDetails from "./pages/CityWeatherDetails";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="selectedCity/:id" element={<CityWeatherDetails/>}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
