import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { HashRouter } from 'react-router-dom'
import Routes from './routes'
ReactDOM.render(
  <HashRouter>
    <Routes />
  </HashRouter>, document.getElementById('root')
);

WebFont.load({
    google: {
        families: ['Montserrat:300,400,700', 'sans-serif', 'Yellowtail']
    }
});
