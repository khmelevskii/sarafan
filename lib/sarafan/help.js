/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

var sarafan = require('../sarafan');

// Node.js libs.
var path = require('path');

// Build 2-column array for table view.
var col1len = 0;

var options = Object.keys(sarafan.cli.optlist).map(function(long) {
  var o = sarafan.cli.optlist[long],
      col1 = '--' + long + (o.short ? ', -' + o.short : '');

  col1len = Math.max(col1len, sarafan.log.uncolor(col1).length);

  return [col1, o.info];
});

var tasks = Object.keys(sarafan.cli.taskslist).map(function(name) {
  var t = sarafan.cli.taskslist[name];

  col1len = Math.max(col1len, sarafan.log.uncolor(name).length);

  return [name, t.info];
});

// Actually write out help screen.
sarafan.log.writeln('sarafan'.yellow + ': command line deploy tool. (' +
                    String('v' + sarafan.version).green + ')');

sarafan.log.header('Usage');
sarafan.log.writeln(' ' + path.basename(process.argv[1]) + ' [options] task');

// Widths for options/tasks table output.
var widths = [1, col1len, 2, 76 - col1len];

sarafan.log.header('Options');
options.forEach(function(a) { 
  sarafan.log.writetableln(widths, 
    ['', sarafan.utils._.pad(a[0], col1len), '', a[1]]); 
});

sarafan.log.header('Tasks');
tasks.forEach(function(a) { 
  sarafan.log.writetableln(widths, 
    ['', sarafan.utils._.pad(a[0], col1len), '', a[1]]); 
});

sarafan.log.writeln('\nFor more information, see ' 
                    + 'http://sarafanjs.com/'.blue.underline + '\n');
process.exit();
