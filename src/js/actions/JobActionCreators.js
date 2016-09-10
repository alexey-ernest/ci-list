/*
 * Job action creators.
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var ActionTypes = AppConstants.ActionTypes;

export default {

  /**
   * @param      {Array}  Array of jobs.
   */
  receiveJobs(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_JOBS,
      jobs: data
    });
  },

  /**
   * @param      {string}  Keywords.
   */
  filterJobs(keywords) {
    AppDispatcher.dispatch({
      type: ActionTypes.FILTER_JOBS,
      keywords: keywords
    });
  },

  /**
   * @param      {Object}  Job object.
   */
  receiveJob(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_JOB,
      job: data
    });
  },

  /**
   * @param      {id}  Job id.
   */
  requestJobMetrics(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.REQUEST_JOB_METRICS,
      id: id
    });
  },

  /**
   * @param      {Object}  Job metrics details.
   */
  receiveJobMetrics(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_JOB_METRICS,
      jobMetrics: data
    });
  },

  /**
   * @param      {id}  Job id.
   */
  requestJobTests(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.REQUEST_JOB_TESTS,
      id: id
    });
  },

  /**
   * @param      {Object}  Job tests data.
   */
  receiveJobTests(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_JOB_TESTS,
      jobTests: data
    });
  },

  /**
   * @param      {id}  Job id.
   */
  requestJobBuild(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.REQUEST_JOB_BUILD,
      id: id
    });
  },

  /**
   * @param      {Object}  Job build details.
   */
  receiveJobBuild(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_JOB_BUILD,
      jobBuild: data
    });
  }

};
