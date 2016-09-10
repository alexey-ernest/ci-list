/**
 * Utilities for working with Job API.
 */

import JobActionCreators from '../actions/JobActionCreators';
import AppConstants from '../constants/AppConstants';

import moment from 'moment';

const JobTypes = AppConstants.JobTypes;
const JobStatuses = AppConstants.JobStatuses;
const BuildTypes = AppConstants.BuildTypes;

export default {

  /**
   * Gets all jobs.
   */
  getJobs: function () {
    var data = [
    {
      id: '9a5c82b',
      type: JobTypes.FIREWALL,
      author: 'evgeny.karlov',
      date: new Date(),
      started: new Date(),
      status: JobStatuses.REJECTED,
      metrics: {
        test: 63,
        maintainability: 51,
        security: 32,
        workmanship: 45
      },
      build: {
        type: BuildTypes.DEBUG,
        version: '0.1.1'
      },
      tests: {
        total: 150,
        passed: 102,
        failed: 48,
        coverage: 33.1
      },
      functests: {
        total: 50,
        passed: 33,
        failed: 17,
        coverage: 12.8
      }
    },
    {
      id: 'fe328ac',
      type: JobTypes.FIREWALL,
      author: 'alexey.ernest',
      date: new Date(),
      started: new Date(),
      status: JobStatuses.IN_PROGRESS,
      metrics: {
        test: 65,
        maintainability: 55,
        security: 71,
        workmanship: 73
      },
      build: {
        type: BuildTypes.DEBUG,
        version: '0.1.1'
      },
      tests: {
        total: 150,
        passed: 95,
        failed: 48,
        coverage: 36.4
      },
      functests: {
        total: 51,
        passed: 34,
        failed: 17,
        coverage: 14.5
      }
    },
    {
      id: '67awd87',
      type: JobTypes.FIREWALL,
      author: 'evgeny.karlov',
      date: new Date(),
      started: new Date(),
      status: JobStatuses.CANCELLED,
      metrics: {
        test: 60,
        maintainability: 20,
        security: 10,
        workmanship: 50
      },
      build: {
        type: BuildTypes.DEBUG,
        version: '0.1.1'
      }
    },
    {
      id: '4jds87s',
      type: JobTypes.FIREWALL,
      author: 'alexey.ernest',
      date: new Date(),
      started: new Date(),
      status: JobStatuses.ACCEPTED,
      metrics: {
        test: 62,
        maintainability: 52,
        security: 60,
        workmanship: 70
      },
      build: {
        type: BuildTypes.DEBUG,
        version: '0.1.1'
      },
      tests: {
        total: 150,
        passed: 99,
        failed: 51,
        coverage: 38.4
      },
      functests: {
        total: 55,
        passed: 34,
        failed: 21,
        coverage: 15.0
      }
    },
    {
      id: '87a23s3',
      type: JobTypes.FIREWALL,
      author: 'evgeny.karlov',
      date: new Date(),
      started: new Date(),
      status: JobStatuses.QUEUED,
      build: {
        type: BuildTypes.DEBUG,
        version: '0.1.1'
      }
    },
    {
      id: '45a42f',
      title: 'Tenrox-R1',
      type: JobTypes.BUILD,
      started: new Date(),
      status: JobStatuses.SUCCEED,
      metrics: {
        test: 56,
        maintainability: 79,
        security: 65,
        workmanship: 33
      },
      build: {
        type: BuildTypes.RELEASE,
        version: '1.0.1'
      },
      tests: {
        total: 300,
        passed: 300,
        failed: 0,
        coverage: 41.8
      },
      functests: {
        total: 55,
        passed: 55,
        failed: 0,
        coverage: 18.3
      }
    },
    {
      id: '37hga6',
      title: 'Tenrox-R1',
      type: JobTypes.BUILD,
      started: new Date(),
      status: JobStatuses.FAILED,
      metrics: {
        test: 45,
        maintainability: 78,
        security: 56,
        workmanship: 30
      },
      build: {
        type: BuildTypes.RELEASE,
        version: '1.0.1'
      },
      tests: {
        total: 300,
        passed: 275,
        failed: 25,
        coverage: 42.7
      },
      functests: {
        total: 55,
        passed: 54,
        failed: 1,
        coverage: 17.2
      }
    },
    {
      id: '3b5d17a',
      title: 'Tenrox-R1',
      type: JobTypes.BUILD,
      started: new Date(),
      status: JobStatuses.IN_PROGRESS,
      metrics: {
        test: 48,
        maintainability: 77,
        security: 58,
        workmanship: 34
      },
      build: {
        type: BuildTypes.RELEASE,
        version: '1.0.1'
      },
      tests: {
        total: 300,
        passed: 275,
        failed: 25,
        coverage: 38.4
      },
      functests: {
        total: 55,
        passed: 31,
        failed: 0,
        coverage: 9.1
      }
    }
    ];

    setTimeout(function () {
      JobActionCreators.receiveJobs(data);
    }, 2000);
  },

  /**
   * Gets job metrics.
   *
   * @param      {string}  id      Job id.
   */
  getJobMetrics(id) {
    var labels = [];
    var i, len = 7;
    for (i = len - 1; i >= 0; i-=1) {
      labels.push(moment().add(-i, 'days').format('DD-MM-YY'));
    }

    var data = {
      labels: labels,
      datasets: []
    };


    // Test data
    var testData = [];
    for (i = 0; i < len; i+=1) {
      testData[i] = Math.random() * 100 | 0;
    }
    data.datasets.push({
      label: 'Test',
      data: testData,
      fillColor: 'rgba(3, 169, 244, 0.2)',
      strokeColor: 'rgba(3, 169, 244, 0.8)',
      highlightFill: 'rgba(3, 169, 244, 0.75)',
      highlightStroke: 'rgba(3, 169, 244, 1)'
    });

    // Maintainability data
    var maintData = [];
    for (i = 0; i < len; i+=1) {
      maintData[i] = Math.random() * 100 | 0;
    }
    data.datasets.push({
      label: 'Maintainability',
      data: maintData
    });

    // Security data
    var securityData = [];
    for (i = 0; i < len; i+=1) {
      securityData[i] = Math.random() * 100 | 0;
    }
    data.datasets.push({
      label: 'Security',
      data: securityData
    });

    // Workmanship
    var workmanshipData = [];
    for (i = 0; i < len; i+=1) {
      workmanshipData[i] = Math.random() * 100 | 0;
    }
    data.datasets.push({
      label: 'Workmanship',
      data: workmanshipData
    });

    setTimeout(function () {
      JobActionCreators.receiveJobMetrics(data);
    }, 1000);
  },

  /**
   * Gets job tests data.
   *
   * @param      {string}  id      Job id.
   */
  getJobTests(id) {
    var labels = [];
    var i, len = 7;
    for (i = len - 1; i >= 0; i-=1) {
      labels.push(moment().add(-i, 'days').format('DD-MM-YY'));
    }

    var data = {
      labels: labels,
      datasets: []
    };


    // Passed data
    var passedData = [];
    for (i = 0; i < len; i+=1) {
      passedData[i] = Math.random() * 100 | 0;
    }
    data.datasets.push({
      label: 'Passed, %',
      data: passedData,
      fillColor: 'rgba(139, 195, 74, 0.2)',
      strokeColor: 'rgba(139, 195, 74, 0.8)',
      highlightFill: 'rgba(139, 195, 74, 0.75)',
      highlightStroke: 'rgba(139, 195, 74, 1)'
    });

    // Failed data
    var failedData = [];
    for (i = 0; i < len; i+=1) {
      failedData[i] = 100 - passedData[i];
    }
    data.datasets.push({
      label: 'Failed, %',
      data: failedData
    });

    // Coverage data
    var coverageData = [];
    for (i = 0; i < len; i+=1) {
      coverageData[i] = Math.round(Math.random() * 40 * 10) / 10;
    }
    data.datasets.push({
      label: 'Coverage, %',
      data: coverageData
    });

    setTimeout(function () {
      JobActionCreators.receiveJobTests(data);
    }, 1000);
  },

  /**
   * Gets job func tests data.
   *
   * @param      {string}  id      Job id.
   */
  getJobFuncTests(id) {
    var labels = [];
    var i, len = 7;
    for (i = len - 1; i >= 0; i-=1) {
      labels.push(moment().add(-i, 'days').format('DD-MM-YY'));
    }

    var data = {
      labels: labels,
      datasets: []
    };


    // Passed data
    var passedData = [];
    for (i = 0; i < len; i+=1) {
      passedData[i] = Math.random() * 100 | 0;
    }
    data.datasets.push({
      label: 'Passed, %',
      data: passedData,
      fillColor: 'rgba(139, 195, 74, 0.2)',
      strokeColor: 'rgba(139, 195, 74, 0.8)',
      highlightFill: 'rgba(139, 195, 74, 0.75)',
      highlightStroke: 'rgba(139, 195, 74, 1)'
    });

    // Failed data
    var failedData = [];
    for (i = 0; i < len; i+=1) {
      failedData[i] = 100 - passedData[i];
    }
    data.datasets.push({
      label: 'Failed, %',
      data: failedData
    });

    // Coverage data
    var coverageData = [];
    for (i = 0; i < len; i+=1) {
      coverageData[i] = Math.round(Math.random() * 20 * 10) / 10;
    }
    data.datasets.push({
      label: 'Coverage, %',
      data: coverageData
    });

    setTimeout(function () {
      JobActionCreators.receiveJobFuncTests(data);
    }, 1000);
  },

  /**
   * Gets job build details.
   *
   * @param      {string}  id      Job id.
   */
  getJobBuild(id) {
    var types = [BuildTypes.DEBUG, BuildTypes.RELEASE];

    var data = {
      type: types[Math.round(Math.random() * (types.length - 1))],
      version: '1.0.' + (Math.random() * 5 | 0),
      package: {
        uri: 'goo.gl/packagelink',
        size: Math.random() * 1024 * 1024 * 100 | 0
      }
    };

    setTimeout(function () {
      JobActionCreators.receiveJobBuild(data);
    }, 1000);
  }
};
