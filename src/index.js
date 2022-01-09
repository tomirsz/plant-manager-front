import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#84a9c6',
      main: '#557a95',
      dark: '#274e67',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#e3d3c7',
      main:'#b1a296',
      dark: '#817368',
      contrastText: '#000000'
    },
    background: {
      paper: '#938E94',
      default: '#5d5c61'
    }
  }
})

ReactDOM.render(
  
  <React.Fragment>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
