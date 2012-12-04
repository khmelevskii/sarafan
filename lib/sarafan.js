/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

// Node.js libs.
var path = require('path'),
    colors = require('colors');

// The module to be exported.
var sarafan = module.exports = {};

// Name default task
sarafan.defaultTask = 'deploy';

// Expose internal sarafan libs
function fRequire(name) {
  return sarafan[name] = require('./sarafan/' + name);
}

var utils = fRequire('utils'),
    task = fRequire('task'),
    file = fRequire('file'),
    fail = fRequire('fail'),
    option = fRequire('option'),
    log = fRequire('log'),
    cli = fRequire('cli'),
    verbose = sarafan.verbose = log.verbose;

// Get version sarafan in package.json file
sarafan.version = file.readJSON( path.join(__dirname, '../package.json') )
  .version;

// Execute sarafan task
sarafan.task = function(task, options, done) {
  // Update options with passed-in options.
  option.init(options);

  if ( option('help') ) {
    // Load and display help if the user did --help or -h.
    require('./sarafan/help');
  } else if ( option('version') ) {
    // Display the current grunt version if the user did --version or -v.
    log.writeln('sarafan'.yellow + String(' v' + sarafan.version).green);
    return;
  }
};
