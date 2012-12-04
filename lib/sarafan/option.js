/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

var data = {};

var option = module.exports = function(key, value) {
  if (arguments.length === 2) {
    return (data[key] = value);
  }

  return data[key];
};

option.init = function(obj) {
  return (data = obj || {});
};
