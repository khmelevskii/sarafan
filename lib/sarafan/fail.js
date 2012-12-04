/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

var sarafan = require('../sarafan');

var fail = module.exports = {};

function writeln(e, mode) {
  sarafan.log.muted = false;

  // Pretty colors.
  var tags = {
    warn: ['<'.red + 'WARN'.yellow + '>'.red, '</'.red + 'WARN'.yellow + '>'.red],
    fatal: ['<'.red + 'FATAL'.yellow + '>'.red, '</'.red + 'FATAL'.yellow + '>'.red]
  },

      msg = String(e.message || e) + '\x07'; // Beep!
  
  sarafan.log.writeln([tags[mode][0], msg.yellow, tags[mode][1]].join(' '));
}

fail.fatal = function(e, errcode) {
  writeln(e, 'fatal');

  process.exit(typeof errcode === 'number' ? errcode : 1);
};
