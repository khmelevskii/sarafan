/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

Task = module.exports = {};

  function PrintError(message) {
    Error.captureStackTrace(this, PrintError);

    this.message = message; 
  }

  PrintError.prototype = Object.create(Error.prototype);
  PrintError.prototype.name = 'PrintError';

  Task.printError = function(message, e) {
    var error = new PrintError(message);
    error.origError = e;

    return error;
  };
// var util = require('util'),
//     utils = module.exports = {};

// util.inherits(utils.printError, Error);
// utils.printError.name = 'printError';

// console.log(utils.printError);
