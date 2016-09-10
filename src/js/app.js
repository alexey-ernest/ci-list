/**
 * This file bootstraps the entire application.
 */

// CSS
import * as styles from '../sass/base.sass';

// React
import React from 'react';
import ReactDOM from 'react-dom';

// App
import App from './components/App.react';

// Theme
import ThemeWrapper from './ThemeWrapper';

// App initial data
import AppData from './AppData';

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
  <ThemeWrapper><App /></ThemeWrapper>,
  document.getElementById('react')
);

// init data
AppData.init();
