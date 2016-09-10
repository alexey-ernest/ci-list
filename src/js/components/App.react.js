/**
 * App main component.
 */

// CSS
import styles from '../../sass/modules/app.sass';

// React
import React, {Component, PropTypes} from 'react';

import JobActionCreators from '../actions/JobActionCreators';

import Search from './Search.react';
import JobList from './JobList.react';

import {
  JobStore
} from '../stores';

const getStateFromStores = () => {
  return {
    jobs: JobStore.getAll(),
    job: JobStore.getJob(),
    jobMetrics: JobStore.getMetrics(),
    jobTests: JobStore.getTests(),
    jobBuild: JobStore.getBuild()
  };
};

export default class App extends Component {

  state = getStateFromStores();

  componentDidMount() {
    JobStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    JobStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className={styles['app']}>
        <h1>CI Job List</h1>
        <div className={styles['search-section']}>
          <Search onSubmit={this._onSearchSubmit} />
        </div>
        <div className={styles['job-section']}>
          <JobList data={this.state} />
        </div>
      </div>
    );
  }

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange = () => {
    this.setState(getStateFromStores());
  };

  _onSearchSubmit = (keywords) => {
    JobActionCreators.filterJobs(keywords);
  };

};
