var sarafan = require('../sarafan'),
    // Node.js libs
    path = require('path');
    // External libs

// This is executed when run via command line
var cli = module.exports = function(options, done) {
  
};

// Default options
var optlist = cli.optlist = {
  help: {
    short: 'h',
    info: 'Display this help.',
    type: Boolean
  },
  deploy: {
    info: 'Deploy project.',
    type: Boolean
  },
  cleanup: {
    info: 'Clean up all releases.',
    type: Boolean
  },
  history: {
    info: 'Display all deployments.',
    type: Boolean
  },
  rollback: {
    info: 'Rollback to previous version.',
    type: Boolean
  },
  version: {
    short: 'v',
    info: 'Print the sarafan version.',
    type: Boolean
  }

};
