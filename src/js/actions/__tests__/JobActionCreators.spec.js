
import AppConstants from '../../constants/AppConstants';

var ActionTypes = AppConstants.ActionTypes;

jest.mock('../../dispatcher/AppDispatcher', () => {
  return {
    dispatch: jest.fn()
  };
});

import JobActionCreators from '../JobActionCreators';

describe('JobActionCreators', () => {

  describe('#receiveJobs()', () => {

    it('should exists', () => {
      expect(JobActionCreators.receiveJobs).toBeDefined();
      expect(typeof(JobActionCreators.receiveJobs)).toEqual('function');
    });

    it('should dispatch RECEIVE_JOBS event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var jobs = [{
        id: 5
      }];

      JobActionCreators.receiveJobs(jobs);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.RECEIVE_JOBS);
      expect(action.jobs).toBe(jobs);
    });
  });

  describe('#filterJobs()', () => {

    it('should exists', () => {
      expect(JobActionCreators.filterJobs).toBeDefined();
      expect(typeof(JobActionCreators.filterJobs)).toEqual('function');
    });

    it('should dispatch FILTER_JOBS event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var keywords = 'alex';

      JobActionCreators.filterJobs(keywords);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.FILTER_JOBS);
      expect(action.keywords).toBe(keywords);
    });
  });

  describe('#receiveJob()', () => {

    it('should exists', () => {
      expect(JobActionCreators.receiveJob).toBeDefined();
      expect(typeof(JobActionCreators.receiveJob)).toEqual('function');
    });

    it('should dispatch RECEIVE_JOB event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var job = {
        id: 3
      };

      JobActionCreators.receiveJob(job);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.RECEIVE_JOB);
      expect(action.job).toBe(job);
    });
  });

  describe('#requestJobMetrics()', () => {

    it('should exists', () => {
      expect(JobActionCreators.requestJobMetrics).toBeDefined();
      expect(typeof(JobActionCreators.requestJobMetrics)).toEqual('function');
    });

    it('should dispatch REQUEST_JOB_METRICS event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var id = 7;

      JobActionCreators.requestJobMetrics(id);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.REQUEST_JOB_METRICS);
      expect(action.id).toBe(id);
    });
  });

  describe('#receiveJobMetrics()', () => {

    it('should exists', () => {
      expect(JobActionCreators.receiveJobMetrics).toBeDefined();
      expect(typeof(JobActionCreators.receiveJobMetrics)).toEqual('function');
    });

    it('should dispatch RECEIVE_JOB_METRICS event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var metrics = [{
        data: []
      }];

      JobActionCreators.receiveJobMetrics(metrics);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.RECEIVE_JOB_METRICS);
      expect(action.jobMetrics).toBe(metrics);
    });
  });

  describe('#requestJobBuild()', () => {

    it('should exists', () => {
      expect(JobActionCreators.requestJobBuild).toBeDefined();
      expect(typeof(JobActionCreators.requestJobBuild)).toEqual('function');
    });

    it('should dispatch REQUEST_JOB_BUILD event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var id = 12;

      JobActionCreators.requestJobBuild(id);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.REQUEST_JOB_BUILD);
      expect(action.id).toBe(id);
    });
  });

  describe('#receiveJobBuild()', () => {

    it('should exists', () => {
      expect(JobActionCreators.receiveJobBuild).toBeDefined();
      expect(typeof(JobActionCreators.receiveJobBuild)).toEqual('function');
    });

    it('should dispatch RECEIVE_JOB_BUILD event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var data = {
        version: '1',
        type: 'debug'
      };

      JobActionCreators.receiveJobBuild(data);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.RECEIVE_JOB_BUILD);
      expect(action.jobBuild).toBe(data);
    });
  });

  describe('#requestJobTests()', () => {

    it('should exists', () => {
      expect(JobActionCreators.requestJobTests).toBeDefined();
      expect(typeof(JobActionCreators.requestJobTests)).toEqual('function');
    });

    it('should dispatch REQUEST_JOB_TESTS event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var id = 9;

      JobActionCreators.requestJobTests(id);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.REQUEST_JOB_TESTS);
      expect(action.id).toBe(id);
    });
  });

  describe('#receiveJobTests()', () => {

    it('should exists', () => {
      expect(JobActionCreators.receiveJobTests).toBeDefined();
      expect(typeof(JobActionCreators.receiveJobTests)).toEqual('function');
    });

    it('should dispatch RECEIVE_JOB_TESTS event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var data = {
        passed: [],
        failed: []
      };

      JobActionCreators.receiveJobTests(data);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.RECEIVE_JOB_TESTS);
      expect(action.jobTests).toBe(data);
    });
  });

  describe('#requestJobFuncTests()', () => {

    it('should exists', () => {
      expect(JobActionCreators.requestJobFuncTests).toBeDefined();
      expect(typeof(JobActionCreators.requestJobFuncTests)).toEqual('function');
    });

    it('should dispatch REQUEST_JOB_FUNCTESTS event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var id = 9;

      JobActionCreators.requestJobFuncTests(id);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.REQUEST_JOB_FUNCTESTS);
      expect(action.id).toBe(id);
    });
  });

  describe('#receiveJobFuncTests()', () => {

    it('should exists', () => {
      expect(JobActionCreators.receiveJobFuncTests).toBeDefined();
      expect(typeof(JobActionCreators.receiveJobFuncTests)).toEqual('function');
    });

    it('should dispatch RECEIVE_JOB_FUNCTESTS event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var data = {
        passed: [],
        failed: []
      };

      JobActionCreators.receiveJobFuncTests(data);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.RECEIVE_JOB_FUNCTESTS);
      expect(action.jobFuncTests).toBe(data);
    });
  });

  describe('#deployBuild()', () => {

    it('should exists', () => {
      expect(JobActionCreators.deployBuild).toBeDefined();
      expect(typeof(JobActionCreators.deployBuild)).toEqual('function');
    });

    it('should dispatch DEPLOY_BUILD event', () => {
      const dispatcher = require('../../dispatcher/AppDispatcher');
      const spy = jest.fn();
      dispatcher.dispatch = spy;

      var id = 13;

      JobActionCreators.deployBuild(id);

      expect(spy.mock.calls.length).toBe(1);

      const action = spy.mock.calls[0][0];
      expect(action.type).toBe(ActionTypes.DEPLOY_BUILD);
      expect(action.id).toBe(id);
    });
  });

});
