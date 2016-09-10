/**
 * Job list item component.
 */

// CSS
import styles from '../../sass/modules/job-list-item.sass';
import cardStyles from '../../sass/modules/list-item-card.sass';

// React
import React, {Component, PropTypes} from 'react';

// Material UI
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';

import moment from 'moment';

import MetricsCard from './MetricsCard.react';
import BuildCard from './BuildCard.react';
import TestCard from './TestCard.react';
import FuncTestCard from './FuncTestCard.react';
import JobActionCreators from '../actions/JobActionCreators';
import AppConstants from '../constants/AppConstants';

const JobTypes = AppConstants.JobTypes;
const JobStatuses = AppConstants.JobStatuses;
const Colors = AppConstants.Colors;

const iconStyles = {
  fontSize: 50
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
        status = (
          <div className={styles['item-dashboard']}>
            <FontIcon className="material-icons" style={style} title="Job Scheduled">schedule</FontIcon>
          </div>
        );
        break;

      case JobStatuses.CANCELLED:
        status = (
          <div className={styles['item-dashboard']}>
            <FontIcon className="material-icons" style={style} title="Job Cancelled">block</FontIcon>
          </div>
        );
        break;

      case JobStatuses.ACCEPTED:
        style.color = Colors.green;
        status = (
          <div className={styles['item-dashboard']}>
            <FontIcon className="material-icons" style={style} title="Changes Merged">call_merge</FontIcon>
          </div>
        );
        break;

      case JobStatuses.SUCCEED:
        style.color = Colors.green;
        status = (
          <div className={styles['item-dashboard']}>
            <FontIcon className="material-icons" style={style} title="Build Done">done</FontIcon>
          </div>
        );
        break;

      case JobStatuses.REJECTED:
        style.color = Colors.red;
        status = (
          <div className={styles['item-dashboard']}>
            <FontIcon className="material-icons" style={style} title="Changes Rejected">error</FontIcon>
          </div>
        );
        break;

      case JobStatuses.FAILED:
        style.color = Colors.red;
        status = (
          <div className={styles['item-dashboard']}>
            <FontIcon className="material-icons" style={style} title="Build Failed">error</FontIcon>
          </div>
        );
        break;
    }

    return status;
  }

  renderCards(job) {
    return (
      <div className={styles['item-content']}>
        <MetricsCard
          job={job}
          onClick={this._onMetricsClick}
          styles={cardStyles}
        />
        <BuildCard
          job={job}
          onClick={this._onBuildClick}
          styles={cardStyles}
        />
        <TestCard
          job={job}
          onClick={this._onTestsClick}
          styles={cardStyles}
        />
        <FuncTestCard
          job={job}
          onClick={this._onFuncTestsClick}
          styles={cardStyles}
        />
      </div>
    );
  }

  render() {
    var job = this.props.job;

    var title = job.title || job.id;
    if (job.author) {
      title += ' (' + job.author + ')';
    }

    var startedTime = moment(job.started).fromNow();

    var avatar = this.renderAvatar(job);
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
              {cards}
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
