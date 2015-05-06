#!/usr/bin/env node

'use strict';

var exit = require('exit'),
  path = require('path'),
  lib = require('../lib/lib.js'),
  colors = require('colors/safe'),
  fs = require('fs'),
  trycatch = require('trycatch');

trycatch(function () {

  // Get the current dir
  var dir = path.dirname(fs.realpathSync(__dirname)) + path.sep + '..';

  var myArgs = '';
  var myArgsArray = process.argv.slice(2);
  for (var i = 0; i < myArgsArray.length; i++) {
    myArgs = myArgs + myArgsArray[i] + ' ';
  }

  console.log(colors.green('[nibble] Running Adaptive Nibble...'));

  // Run nibble
  lib.runNibble(myArgs, dir);

}, function (err) {
  console.log(colors.red.bold('[nibble] Error: '), err);
  exit(-1);
});
