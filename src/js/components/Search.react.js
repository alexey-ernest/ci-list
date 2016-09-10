/**
 * Search component.
 */

// React
import React, {Component, PropTypes} from 'react';

// Material UI
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import JobActionCreators from '../actions/JobActionCreators';

const ENTER_KEY_CODE = 13;

export default class Search extends Component {

  static propTypes = {
    onSubmit: PropTypes.func
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  state = {
    keywords: ''
  };

  render() {
    return (
      <Card>
        <CardText>
          <TextField
            id="keywords"
            hintText="Filter builds"
            fullWidth={true}
            value={this.state.keywords}
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
          />
        </CardText>
      </Card>
    );
  }

  _onChange = (event) => {
    this.setState({
      keywords: event.target.value
    });
  };

  _onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._onSubmit();
    }
  };

  _onSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.keywords);
    }
  };

};
