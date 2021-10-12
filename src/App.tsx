import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Settings from "./settings/Settings";
import { IconButton, useMediaQuery } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NavBar from "./Navigation";
import { SelectedTheme } from "./settings/ThemeSelector";
import CssBaseline from "@mui/material/CssBaseline";
import Impact from "./impact/impact";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Donations from "./donations/Donations";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function getTheme(prefersDarkMode: boolean, selectedTheme: SelectedTheme) {
  if (
    (selectedTheme === "system" && prefersDarkMode) ||
    selectedTheme === "dark"
  ) {
    return darkTheme;
  } else {
    return lightTheme;
  }
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [selectedTheme, setSelectedTheme] =
    React.useState<SelectedTheme>("system");
  const [theme, setTheme] = React.useState(
    getTheme(prefersDarkMode, selectedTheme as SelectedTheme)
  );

  useEffect(() => {
    setTheme(getTheme(prefersDarkMode, selectedTheme));
  }, [prefersDarkMode, selectedTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar
          onChangeTheme={(selectedTheme: SelectedTheme) =>
            setSelectedTheme(selectedTheme)
          }
        />
        <Switch>
          <Route path="/impact" component={Impact} />
          <Route path="/donations" component={Donations} />
          <Route path="/" component={Impact} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
