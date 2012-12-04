/**
 * sarafan
 * http://sarafanjs.com/
 *
 * Copyright (c) 2012 Yurii Khmelevskii
 * Licensed under the MIT License.
 *
 */

var sarafan = require('../sarafan');

var log = module.exports = {};

// Temporarily suppress output.
var suppressOutput;

log.mutted = false;

var hasLogged;

function markup(str) {
  str = str || '';

  str = str.replace(/(\s|^)_([\s\S]+?)_(?=\s|$)/g, '$1' + '$2'.underline);

  str = str.replace(/(\s|^)\*([\s\S]+?)\*(?=\s|$)/g, '$1' + '$2'.bold);

  return str;  
}

// Write output
log.write = function(msg) {
  if ( !log.mutted && !suppressOutput) {
    hasLogged = true;
    process.stdout.write(markup(msg));
  }  

  return this;
};

log.writeln = function(msg) {
  this.write( (msg || '') + '\n' );

  return this;
};

// Write a line of a table.
log.writetableln = function(widths, texts) {
  return this.writeln( this.table(widths, texts) );
};

// Write header
log.header = function(msg) {
  if (hasLogged) {
    this.writeln();
  }

  return this.writeln(msg.cyan);  
};

// Write error
log.error = function(msg) {
  
};

// Write success
log.ok = function(msg) {
  
};

log.verbose = {};
log.notverbose = {};

// Iterate over all exported functions.
Object.keys(log).filter(function(key) {
  return typeof log[key] === 'function';
}).forEach(function(key) {
  log.verbose[key] = function() {
    suppressOutput = !sarafan.option('verbose');
    log[key].apply(this, arguments);
    suppressOutput = false;

    return this;
  };

  log.notverbose[key] = function() {
    suppressOutput = sarafan.option('verbose');
    log[key].apply(this, arguments);
    suppressOutput = false;

    return this;
  };
});

log.verbose.or = log.notverbose;
log.notverbose.or = log.verbose;

// Return a string, uncolored (suitable for testing .length, etc).
log.uncolor = function(str) {
  return str.replace(/\x1B\[\d+m/g, '');
};
 
// Word-wrap text to a given width, permitting ANSI color codes.
log.wraptext = function(width, text) {
  // notes to self:
  // grab 1st character or ansi code from string
  // if ansi code, add to array and save for later, strip from front of string
  // if character, add to array and increment counter, strip from front of string
  // if width + 1 is reached and current character isn't space:
  //  slice off everything after last space in array and prepend it to string
  //  etc

  // This result array will be joined on \n.
  var result = [],
      matches, color, tmp,
      captured = [],
      charlen = 0;

  while (matches = text.match(/(?:(\x1B\[\d+m)|\n|(.))([\s\S]*)/)) {
    // Updated text to be everything not matched.
    text = matches[3];

    // Matched a color code?
    if (matches[1]) {
      // Save last captured color code for later use.
      color = matches[1];
      // Capture color code.
      captured.push(matches[1]);
      continue;

    // Matched a non-newline character?
    } else if (matches[2]) {
      // If this is the first character and a previous color code was set, push
      // that onto the captured array first.
      if (charlen === 0 && color) { captured.push(color); }
      // Push the matched character.
      captured.push(matches[2]);
      // Increment the current charlen.
      charlen++;
      // If not yet at the width limit or a space was matched, continue.
      if (charlen <= width || matches[2] === ' ') { continue; }
      // The current charlen exceeds the width and a space wasn't matched.
      // "Roll everything back" until the last space character.
      tmp = captured.lastIndexOf(' ');
      text = captured.slice(tmp === -1 ? tmp : tmp + 1).join('') + text;
      captured = captured.slice(0, tmp);
    }

    // The limit has been reached. Push captured string onto result array.
    result.push(captured.join(''));

    // Reset captured array and charlen.
    captured = [];
    charlen = 0;
  }

  result.push(captured.join(''));
  return result.join('\n');
};


log.table = function(widths, texts) {
  var rows = [];

  widths.forEach(function(width, i) {
    var lines = log.wraptext(width, texts[i]).split('\n');
    lines.forEach(function(line, j) {
      var row = rows[j];
      if (!row) {
        row = rows[j] = [];
      }

      row[i] = line;
    });
  });

  var lines = [];

  rows.forEach(function(row) {
    var txt = '',
        column;

    for (var i = 0; i < row.length; i++) {
      column = row[i] || '';
      txt += column;

      var diff = widths[i] - log.uncolor(column).length;
      if (diff > 0) {
        txt += sarafan.utils.repeat(diff);
      }
    }
    
    lines.push(txt);
  });

  return lines.join('\n');
};
