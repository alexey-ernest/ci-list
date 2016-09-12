/**
 * Job Metrics Details component.
 */


// React
import React, {Component, PropTypes} from 'react';

// Material UI
import CircularProgress from 'material-ui/CircularProgress';

// Chart.js
import {Line} from 'react-chartjs';

import moment from 'moment';

import JobActionCreators from '../actions/JobActionCreators';

export default class MetricsDetails extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    metrics: PropTypes.object
  };

  componentWillMount() {
    JobActionCreators.requestJobMetrics(this.props.job.id);
  }

  render() {
    var chart;
    if (this.props.metrics && Object.keys(this.props.metrics).length > 0) {
      chart = <Line
                redraw
                data={this.props.metrics}
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
