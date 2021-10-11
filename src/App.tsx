import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Settings from "./settings/Settings";
import {IconButton, useMediaQuery} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Navigation from './Navigation';
import {SelectedTheme} from './settings/ThemeSelector';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// const useThemeDetector = () => {
//   const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
//   const [isDarkTheme, setIsDarkTheme] = React.useState(getCurrentTheme());
//   const mqListener = (e => {
//     setIsDarkTheme(e.matches);
//   });

//   React.useEffect(() => {
//     const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
//     darkThemeMq.addListener(mqListener);
//     return () => darkThemeMq.removeListener(mqListener);
//   }, []);
//   return isDarkTheme;
// }

function getTheme(prefersDarkMode: boolean, selectedTheme: SelectedTheme) {
  if (selectedTheme === 'system' && prefersDarkMode || selectedTheme === 'dark') {
    return darkTheme;
  } else {
    return lightTheme;
  }
}

function App() {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = React.useState(prefersDarkMode);

  // const theme = React.useMemo(() =>
  //   createMuiTheme({
  //     palette: {
  //       type: darkMode ? "dark" : "light"
  //     }
  //   })
  // );

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  // const isDarkTheme = useThemeDetector();
  const [theme, setTheme] = React.useState(getTheme(prefersDarkMode, 'system'));

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Settings onChangeTheme={(selectedTheme) => setTheme(getTheme(prefersDarkMode, selectedTheme))}/>
    </ThemeProvider>

  );
}

export default App;
