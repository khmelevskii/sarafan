/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

var sarafan = require('../sarafan'),
    // Node.js libs
    fs = require('fs');
    // path = require('path');

var file = module.exports = {};

// Read a file and return its content
file.read = function(filepath, encoding) {
  var src;
  sarafan.verbose.write('Reading ' + filepath + '...');

  try {
    src = fs.readFileSync( String(filepath), encoding ? null : 'utf8' );
    sarafan.verbose.ok();

    return src;
  } catch(e) {
    sarafan.verbose.error();
    throw sarafan.task.printError('Unable to read "' + filepath + '" file (' +
      'Error code: ' + e.code + ').', e);
  }
};

// Read a file, parse its content and return an object
file.readJSON = function(filepath) {
  var src = this.read( String(filepath) ),
      result;

  sarafan.verbose.write('Parsing ' + filepath + '...');
  
  try {
    result = JSON.parse(src);
    sarafan.verbose.ok();
   
    return result;
  } catch(e) {
    sarafan.verbose.error();
    throw sarafan.utils.printError('Unable to parse "' + filepath + '" file (' +
      e.message + '),', e);
  }
};
