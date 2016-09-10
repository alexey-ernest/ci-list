/**
 * Initialize app's data.
 */

import JobApiUtils from './utils/JobApiUtils';

export default {

  init: function() {

    JobApiUtils.getJobs();
  }
};
