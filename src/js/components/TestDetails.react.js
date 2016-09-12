/**
 * Job Test Details component.
 */


// React
import React, {Component, PropTypes} from 'react';

// Material UI
import CircularProgress from 'material-ui/CircularProgress';

// Chart.js
import {Line} from 'react-chartjs';

import moment from 'moment';

import JobActionCreators from '../actions/JobActionCreators';

export default class TestDetails extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    tests: PropTypes.object
  };

  componentWillMount() {
    JobActionCreators.requestJobTests(this.props.job.id);
  }

  render() {
    var chart;
    if (this.props.tests && Object.keys(this.props.tests).length > 0) {
      chart = <Line
                redraw
                data={this.props.tests}
                width="700"
                height="200"
              />;
    } else {
      chart = <CircularProgress />;
    }

    return (
      <div>
        {chart}
      </div>
    );
  }

};
