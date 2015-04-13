#!/usr/bin/env node

'use strict';

var program = require('commander'),
  exit = require('exit'),
  path = require('path'),
  lib = require('../lib/lib.js'),
  colors = require('colors/safe'),
  fs = require('fs'),
  trycatch = require('trycatch');

trycatch(function () {

  // Get the current dir
  var dir = path.dirname(fs.realpathSync(__filename));

  // Define program
  program
    .on('--help', function () {
      console.log(colors.green(lib.runNibble('-h', dir)));
    }).parse(process.argv);

  console.log(colors.green('[nibble] Running Adaptive Nibble...'));

  // Run nibble
  lib.runNibble(process.argv, dir);

}, function (err) {
  console.log(colors.red.bold('[nibble] Error: '), err);
  exit(-1);
});
