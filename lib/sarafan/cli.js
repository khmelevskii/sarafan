var sarafan = require('../sarafan'),
    // External libs
    nopt = require('nopt');

// This is executed when run via command line
var cli = module.exports = function(options, done) {
  sarafan.task(cli.task, cli.options, done);
};

// Default options
var optlist = cli.optlist = {
  help: {
    short: 'h',
    info: 'Display this help.',
    type: Boolean
  },
  version: {
    short: 'v',
    info: 'Print the sarafan version.',
    type: Boolean
  },
  verbose: {
    info: 'Verbose mode. A lot more information output.',
    type: Boolean
  }
};

// Tasks
var taskslist = cli.taskslist = {
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
  }
};

var knownOptions = {},
    aliasesOptions = {};

Object.keys(optlist).forEach(function(key) {
  var short = optlist[key].short;

  if (short) {
    aliasesOptions[short] = '--' + key;
  }

  knownOptions[key] = optlist[key].type; 
});

var parsedOptions = nopt(knownOptions, aliasesOptions, process.argv, 2);
cli.task = parsedOptions.argv.remain[0] || sarafan.defaultTask;
cli.options = parsedOptions;
delete parsedOptions.argv;
