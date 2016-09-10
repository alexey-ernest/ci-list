/**
 * Job Build Details component.
 */

// CSS
import styles from '../../sass/modules/build-details.sass';

// React
import React, {Component, PropTypes} from 'react';

// Material UI
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';

import moment from 'moment';

import JobActionCreators from '../actions/JobActionCreators';

const iconStyles = {
  fontSize: 48,
  display: 'block'
};

export default class BuildDetails extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    build: PropTypes.object
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  componentWillMount() {
    JobActionCreators.requestJobBuild(this.props.job.id);
  }

  render() {
    var build = this.props.build;

    var style = Object.assign({}, iconStyles, {
      color: this.context.muiTheme.palette.accent2Color
    });

    var content;
    if (build && Object.keys(build).length > 0) {
      var mbs = (build.package.size / 1024 / 1024).toFixed(1);
      content = (
        <div className={styles['build-details-container']}>
          <div className={styles['build-details-section']}>
            <FontIcon className={'material-icons ' + styles['icon']} style={style}>build</FontIcon>
            {build.type}
          </div>
          <div className={styles['build-details-section']}>
            <FontIcon className={'material-icons ' + styles['icon']} style={style}>plus_one</FontIcon>
            v{build.version}
          </div>
          <div className={styles['build-details-section']}>
            <FontIcon className={'material-icons ' + styles['icon']} style={style}>cloud_download</FontIcon>
            <a href={build.package.uri} target="_blank">Download ({mbs}MB)</a>
          </div>
        </div>
      );
    } else {
      content = <CircularProgress />;
    }

    return (
      <div>
        {content}
      </div>
    );
  }

};
