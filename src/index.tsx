import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  h1 {
    margin: 0;
  }
`

ReactDOM.render(
    <>
        <GlobalStyle/>
        <App/>
    </>,
    document.getElementById('root')
);
