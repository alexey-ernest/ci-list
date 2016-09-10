/**
 * Job list component.
 */

// CSS
import styles from '../../sass/modules/job-list.sass';

// React
import React, {Component, PropTypes} from 'react';

// Material UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import JobListItem from './JobListItem.react';
import MetricsDetails from './MetricsDetails.react';
import TestDetails from './TestDetails.react';
import BuildDetails from './BuildDetails.react';


import keyMirror from 'keymirror';

const DetailsTypes = keyMirror({
  METRICS: null,
  BUILD: null,
  TESTS: null
});

export default class JobList extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  state = {
    showDetails: false,
    detailsType: null
  };

  renderJobDetails(job) {
    job = job || {};

    var dialogTitle = (job.title || job.id);
    switch (this.state.detailsType)
    {
      case DetailsTypes.METRICS:
        dialogTitle += ' Metrics';
        break;
      case DetailsTypes.BUILD:
        dialogTitle += ' Build';
        break;
      case DetailsTypes.TESTS:
        dialogTitle += ' Tests';
        break;
    }

    var dialogContent;
    switch (this.state.detailsType)
    {
      case DetailsTypes.METRICS:
        dialogContent = <MetricsDetails job={job} metrics={this.props.data.jobMetrics} />;
        break;
      case DetailsTypes.BUILD:
        dialogContent = <BuildDetails job={job} build={this.props.data.jobBuild} />;
        break;
      case DetailsTypes.TESTS:
        dialogContent = <TestDetails job={job} tests={this.props.data.jobTests} />;
        break;
    }

    const actions = [
      <FlatButton
        label="Got It"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._handlePopupClose}
      />,
    ];

    return (
      <Dialog
        title={dialogTitle + ' Details'}
        actions={actions}
        modal={false}
        open={this.state.showDetails}
        onRequestClose={this._handlePopupClose}
      >
        {dialogContent}
      </Dialog>
    );
  }

  render() {
    var content;
    if (this.props.data.jobs && this.props.data.jobs.length > 0) {
      let items = this.props.data.jobs.map(function (job) {
        return (
          <JobListItem
            key={job.id}
            job={job}
            selectedJob={this.props.data.job}
            onMetricsClick={this._onMetricsClick}
            onBuildClick={this._onBuildClick}
            onTestsClick={this._onTestsClick}
          />
        );
      }.bind(this));

      content = (
        <ul className={styles['job-list']}>
          {items}
        </ul>
      );
    } else {
      content = <CircularProgress />;
    }

    var jobDetails = this.renderJobDetails(this.props.data.job);

    return (
      <div>
        {content}
        {jobDetails}
      </div>
    );
  }

  _handlePopupClose = () => {
    this.setState({
      showDetails: false
    });
  };

  _onMetricsClick = (job) => {
    this.setState({
      showDetails: true,
      detailsType: DetailsTypes.METRICS
    });
  };

  _onBuildClick = (job) => {
    this.setState({
      showDetails: true,
      detailsType: DetailsTypes.BUILD
    });
  };

  _onTestsClick = (job) => {
    this.setState({
      showDetails: true,
      detailsType: DetailsTypes.TESTS
    });
  };

};
