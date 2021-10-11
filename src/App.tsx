import React from 'react';
import logo from './logo.svg';
import './App.css';
import MiniDrawer from './drawer/drawer';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <MiniDrawer />
      Hello World</div>
    </ThemeProvider>

  );
}

export default App;
