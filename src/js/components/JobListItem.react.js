/**
 * Job list item component.
 */

// CSS
import styles from '../../sass/modules/job-list-item.sass';

// React
import React, {Component, PropTypes} from 'react';

// Material UI
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';

import moment from 'moment';
import classnames from 'classnames';

import JobActionCreators from '../actions/JobActionCreators';
import AppConstants from '../constants/AppConstants';

const JobTypes = AppConstants.JobTypes;
const JobStatuses = AppConstants.JobStatuses;

const iconStyles = {
  fontSize: 50
};

const cardTitleStyles = {
  paddingBottom: 0
};

const cardTitleTitleStyles = {
  fontSize: 16,
  fontWeight: 400
};

const cardTextStyles = {
  paddingTop: 6,
  lineHeight: 1.5
};

const statusIconStyles = {
  fontSize: '48px',
  lineHeight: '56px'
};

export default class JobListItem extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    selectedJob: PropTypes.object,
    onMetricsClick: PropTypes.func,
    onBuildClick: PropTypes.func,
    onTestsClick: PropTypes.func,
    onFuncTestsClick: PropTypes.func
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  renderAvatar(job) {
    var icon;
    if (job.type === JobTypes.FIREWALL) {
      icon = 'security';
    } else if (job.type === JobTypes.BUILD) {
      icon = 'settings';
    }

    var style = Object.assign({}, iconStyles, {
      color: this.context.muiTheme.palette.accent2Color
    });

    var avatar;
    if (icon) {
      avatar = <FontIcon className="material-icons" style={style}>{icon}</FontIcon>;
    }

    return avatar;
  }

  renderStatus(job) {
    var status;

    var style = Object.assign({}, statusIconStyles, {
      color: this.context.muiTheme.palette.accent2Color
    });

    switch (job.status) {
      case JobStatuses.IN_PROGRESS:
        status = <LinearProgress mode="indeterminate" />;
        break;

      case JobStatuses.QUEUED:
        status = <FontIcon className="material-icons" style={style} title="Scheduled">schedule</FontIcon>;
        break;

      case JobStatuses.CANCELLED:
        status = <FontIcon className="material-icons" style={style} title="Cancelled">block</FontIcon>;
        break;

      case JobStatuses.ACCEPTED:
        status = <LinearProgress mode="determinate" value={100} color="#4caf50" />;
        break;

      case JobStatuses.SUCCEED:
        status = <LinearProgress mode="determinate" value={100} color="#4caf50" />;
        break;

      case JobStatuses.REJECTED:
        status = <LinearProgress mode="determinate" value={100} color="#f44336" />;
        break;

      case JobStatuses.FAILED:
        status = <LinearProgress mode="determinate" value={100} color="#f44336" />;
        break;
    }

    return status;
  }

  renderMetricsCard(job) {
    if (!job.metrics) {
      return null;
    }

    return (
      <Card key={job.id + '-metrics'} className={styles['item-card']}>
        <CardMedia>
          <img
            src="images/analytics.png"
            onClick={this._onMetricsClick}
            className={styles['item-media']}
          />
        </CardMedia>
        <CardTitle
          title="Metrics"
          style={cardTitleStyles}
          titleStyle={cardTitleTitleStyles}
        />
        <CardText style={cardTextStyles}>
          Test: {job.metrics.test}, <br/>
          Maintainability: {job.metrics.maintainability}, <br/>
          Security: {job.metrics.security}, <br/>
          Workmanship: {job.metrics.workmanship}
        </CardText>
      </Card>
    );
  }

  renderBuildCard(job) {
    if (!job.build) {
      return null;
    }

    return (
      <Card key={job.id + '-build'} className={styles['item-card']}>
        <CardMedia>
          <img
            src="images/release.png"
            onClick={this._onBuildClick}
            className={styles['item-media']}
          />
        </CardMedia>
        <CardTitle
          title="Build"
          style={cardTitleStyles}
          titleStyle={cardTitleTitleStyles}
        />
        <CardText style={cardTextStyles}>
          {job.build.type} v{job.build.version}
        </CardText>
      </Card>
    );
  }

  renderTestsCard(job) {
    if (!job.tests) {
      return null;
    }

    var testPassRate = (job.tests.passed / job.tests.total * 100).toFixed(1);

    return (
      <Card key={job.id + '-tests'} className={styles['item-card']}>
        <CardMedia>
          <img
            src="images/crash.png"
            onClick={this._onTestsClick}
            className={styles['item-media']}
          />
        </CardMedia>
        <CardTitle
          title="Tests"
          style={cardTitleStyles}
          titleStyle={cardTitleTitleStyles}
        />
        <CardText style={cardTextStyles}>
          Pass rate: {testPassRate}%,
          Coverage: {job.tests.coverage}%
        </CardText>
      </Card>
    );
  }

  renderFuncTestsCard(job) {
    if (!job.functests) {
      return null;
    }

    var testPassRate = (job.functests.passed / job.functests.total * 100).toFixed(1);

    return (
      <Card key={job.id + '-functests'} className={styles['item-card']}>
        <CardMedia>
          <img
            src="images/crash.png"
            onClick={this._onFuncTestsClick}
            className={styles['item-media']}
          />
        </CardMedia>
        <CardTitle
          title="FuncTests"
          style={cardTitleStyles}
          titleStyle={cardTitleTitleStyles}
        />
        <CardText style={cardTextStyles}>
          Pass rate: {testPassRate}%, <br/>
          Coverage: {job.functests.coverage}%
        </CardText>
      </Card>
    );
  }

  renderCards(job) {
    var metricsCard = this.renderMetricsCard(job);
    var buildCard = this.renderBuildCard(job);
    var testsCard = this.renderTestsCard(job);
    var functestsCard = this.renderFuncTestsCard(job);

    return [metricsCard, buildCard, testsCard, functestsCard];
  }

  render() {
    var job = this.props.job;

    var title = job.title || job.id;
    if (job.author) {
      title += ' (' + job.author + ')';
    }

    var avatar = this.renderAvatar(job);

    var startedTime = moment(job.started).fromNow();

    var status = this.renderStatus(job);

    var cards = this.renderCards(job);

    var detailsTitle;
    switch (job.type) {
      case JobTypes.FIREWALL:
        detailsTitle = 'Firewall job details';
        break;

      case JobTypes.BUILD:
        detailsTitle = 'Build job details';
        break;

      default:
        detailsTitle = 'Job details';
    }

    detailsTitle += ' (' + job.status + ')';

    var isExpanded = !!this.props.selectedJob && this.props.selectedJob.id === job.id;

    return (
      <li>
        <Card
          className={isExpanded ? styles['item-expanded'] : ''}
          onExpandChange={this._handleExpandChange}
          expanded={isExpanded}
        >
          <CardHeader
            title={title}
            subtitle={startedTime}
            actAsExpander={true}
            showExpandableButton={true}
            avatar={avatar}
          >
            {status}
          </CardHeader>
          <CardText expandable={true}>
            <div className={styles['item-container']}>
              <h2>{detailsTitle}</h2>
              <div className={styles['item-content']}>
                {cards}
              </div>
            </div>
          </CardText>
        </Card>
      </li>
    );
  }

  _handleExpandChange = (newExpandedState) => {
    // selecting current job
    if (newExpandedState) {
      JobActionCreators.receiveJob(this.props.job);
    } else {
      JobActionCreators.receiveJob();
    }
  };

  _onMetricsClick = () => {
    if (this.props.onMetricsClick) {
      this.props.onMetricsClick(this.props.job);
    }
  };

  _onBuildClick = () => {
    if (this.props.onBuildClick) {
      this.props.onBuildClick(this.props.job);
    }
  };

  _onTestsClick = () => {
    if (this.props.onTestsClick) {
      this.props.onTestsClick(this.props.job);
    }
  };

  _onFuncTestsClick = () => {
    if (this.props.onFuncTestsClick) {
      this.props.onFuncTestsClick(this.props.job);
    }
  };

};
