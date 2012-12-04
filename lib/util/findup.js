/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

var path = require('path'),
    fs = require('fs');

module.exports = function findup(dirpath, filename) {
  var filepath = path.join(dirpath, filename);

  if ( fs.existsSync(filepath) ) {
    return filepath;
  }

  var parentpath = path.resolve(dirpath, '..');

  return parentpath === dirpath ? null : findup(parentpath, filename);
};
