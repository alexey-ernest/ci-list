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

import JobActionCreators from '../actions/JobActionCreators';
import JobListItem from './JobListItem.react';
import MetricsDetails from './MetricsDetails.react';
import BuildDetails from './BuildDetails.react';
import TestDetails from './TestDetails.react';
import FuncTestDetails from './FuncTestDetails.react';
import AppConstants from '../constants/AppConstants';

const DialogTypes = AppConstants.DialogTypes;



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
      case DialogTypes.METRICS:
        dialogTitle += ' Metrics';
        break;
      case DialogTypes.BUILD:
        dialogTitle += ' Build';
        break;
      case DialogTypes.TESTS:
        dialogTitle += ' Tests';
        break;
      case DialogTypes.FUNCTESTS:
        dialogTitle += ' Functional Tests';
        break;
    }

    var dialogContent;
    switch (this.state.detailsType)
    {
      case DialogTypes.METRICS:
        dialogContent = <MetricsDetails job={job} metrics={this.props.data.jobMetrics} />;
        break;
      case DialogTypes.BUILD:
        dialogContent = <BuildDetails job={job} build={this.props.data.jobBuild} />;
        break;
      case DialogTypes.TESTS:
        dialogContent = <TestDetails job={job} tests={this.props.data.jobTests} />;
        break;
      case DialogTypes.FUNCTESTS:
        dialogContent = <FuncTestDetails job={job} tests={this.props.data.jobFuncTests} />;
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
            onFuncTestsClick={this._onFuncTestsClick}
            onDeployClick={this._onDeployClick}
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
      detailsType: DialogTypes.METRICS
    });
  };

  _onBuildClick = (job) => {
    this.setState({
      showDetails: true,
      detailsType: DialogTypes.BUILD
    });
  };

  _onTestsClick = (job) => {
    this.setState({
      showDetails: true,
      detailsType: DialogTypes.TESTS
    });
  };

  _onFuncTestsClick = (job) => {
    this.setState({
      showDetails: true,
      detailsType: DialogTypes.FUNCTESTS
    });
  };

  _onDeployClick = (job) => {
    JobActionCreators.deployBuild(job.id);
  };

};
