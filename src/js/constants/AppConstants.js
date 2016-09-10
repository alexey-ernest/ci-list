/**
 * React app constants.
 */

import keyMirror from 'keymirror';

const AppConstants = {

  ActionTypes: keyMirror({
    RECEIVE_JOBS: null,
    FILTER_JOBS: null,
    RECEIVE_JOB: null,
    REQUEST_JOB_METRICS: null,
    RECEIVE_JOB_METRICS: null,
    REQUEST_JOB_BUILD: null,
    RECEIVE_JOB_BUILD: null,
    REQUEST_JOB_TESTS: null,
    RECEIVE_JOB_TESTS: null,
    REQUEST_JOB_FUNCTESTS: null,
    RECEIVE_JOB_FUNCTESTS: null,
    DEPLOY_BUILD: null
  }),

  JobTypes: keyMirror({
    FIREWALL: null,
    BUILD: null
  }),

  JobStatuses: keyMirror({
    ACCEPTED: null,
    REJECTED: null,
    SUCCEED: null,
    FAILED: null,
    IN_PROGRESS: null,
    QUEUED: null,
    CANCELLED: null
  }),

  BuildTypes: keyMirror({
    DEBUG: null,
    RELEASE: null
  }),

  DialogTypes: keyMirror({
    METRICS: null,
    BUILD: null,
    TESTS: null,
    FUNCTESTS: null
  }),

  Colors: {
    green: '#4caf50',
    red: '#f44336'
  }

};

export default AppConstants;
