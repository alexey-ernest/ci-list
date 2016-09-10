/**
 * Wraps component with theme provider to avoid Material UI errors.
 */

import React, {Component, PropTypes} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  lightBlue500,
  lightBlue700,
  grey400,
  pinkA200,
  grey200,
  grey500,
  darkBlack,
  white,
  grey300,
  fullBlack
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';


// More on Colors: http://www.material-ui.com/#/customization/colors
var muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey300,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: lightBlue500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
});

export default class ThemeWrapper extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return {muiTheme: muiTheme};
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
