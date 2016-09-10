/**
 * Job store.
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import JobApiUtils from '../utils/JobApiUtils';

import EventEmitter from 'events';

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

/**
 * Private storage.
 *
 * @type       {Object}
 */
var _data = {
  jobs: [],
  keywords: '',
  job: null,
  jobMetrics: null,
  jobBuild: null,
  jobTests: null,
  jobFuncTests: null
};

class JobStore extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * Adds a change listener.
   *
   * @param      {function}  callback  The callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * Removes a change listener.
   *
   * @param      {Function}  callback  The callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAll() {
    var jobs = _data.jobs;
    if (_data.keywords && _data.keywords.trim() !== '') {
      // filtering jobs
      let keywords = _data.keywords.toLowerCase();
      jobs = jobs.filter((j) => {
        if (j.id.toLowerCase().indexOf(keywords) >= 0) {
          return true;
        }
        if (j.title && j.title.toLowerCase().indexOf(keywords) >= 0) {
          return true;
        }
        if (j.author && j.author.toLowerCase().indexOf(keywords) >= 0) {
          return true;
        }

        return false;
      });
    }

    return jobs;
  }

  getJob() {
    return _data.job;
  }

  getMetrics() {
    return _data.jobMetrics;
  }

  getBuild() {
    return _data.jobBuild;
  }

  getTests() {
    return _data.jobTests;
  }

  getFuncTests() {
    return _data.jobFuncTests;
  }

}

// single instance
let store = new JobStore();

// dispatch token
JobStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.RECEIVE_JOBS:
      _data.jobs = action.jobs;
      this.emitChange();
      break;

    case ActionTypes.FILTER_JOBS:
      _data.keywords = action.keywords;
      this.emitChange();
      break;

    case ActionTypes.RECEIVE_JOB:
      _data.job = action.job;
      _data.jobMetrics = null;
      _data.jobTests = null;
      _data.jobBuild = null;
      this.emitChange();
      break;

    case ActionTypes.REQUEST_JOB_METRICS:
      _data.jobMetrics = null;
      JobApiUtils.getJobMetrics(action.id);
      this.emitChange();
      break;

    case ActionTypes.RECEIVE_JOB_METRICS:
      _data.jobMetrics = action.jobMetrics;
      this.emitChange();
      break;

    case ActionTypes.REQUEST_JOB_BUILD:
      _data.jobBuild = null;
      JobApiUtils.getJobBuild(action.id);
      this.emitChange();
      break;

    case ActionTypes.RECEIVE_JOB_BUILD:
      _data.jobBuild = action.jobBuild;
      this.emitChange();
      break;

    case ActionTypes.REQUEST_JOB_TESTS:
      _data.jobTests = null;
      JobApiUtils.getJobTests(action.id);
      this.emitChange();
      break;

    case ActionTypes.RECEIVE_JOB_TESTS:
      _data.jobTests = action.jobTests;
      this.emitChange();
      break;

    case ActionTypes.REQUEST_JOB_FUNCTESTS:
      _data.jobFuncTests = null;
      JobApiUtils.getJobFuncTests(action.id);
      this.emitChange();
      break;

    case ActionTypes.RECEIVE_JOB_FUNCTESTS:
      _data.jobFuncTests = action.jobFuncTests;
      this.emitChange();
      break;

    default:
      // do nothing
  }

}.bind(store));

export default store;
