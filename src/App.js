// import logo from './logo.svg';
import './App.css';

import Connection from './Web3Connection/Connection';
import './compnent/Project.css'
import { darkTheme, lightTheme } from './compnent/theme';

import React, { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import CustomThemeProvider from './Context/themeContext';
function App() {
  return (
   <CustomThemeProvider>
    <div className="App ">
      {/* <header className="App-header"> */}
      <Connection/>

      {/* </header> */}
    
    </div>
    </CustomThemeProvider>
  );
}

export default App;
