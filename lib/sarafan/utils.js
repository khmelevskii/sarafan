/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

var utils = module.exports = {};

utils.task = require('./task');

var _ = utils._ = require('underscore');

// Mixin Underscore.string methods.
_.str = require('underscore.string');
_.mixin( _.str.exports() );

// Return the string `str` repeated `n` times.
utils.repeat = function(n, str) {
  return new Array(n + 1).join(str || ' ');  
};
