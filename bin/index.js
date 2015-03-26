#!/usr/bin/env node

'use strict';

var program = require('commander'),
  pJson = require('../package.json'),
  exit = require('exit'),
  lib = require('../lib/lib.js'),
  colors = require('colors/safe'),
  path = require('path'),
  os = require('os'),
  shell = require('shelljs'),
  fs = require('fs'),
  trycatch = require('trycatch');

trycatch(function () {

  // Define program
  program
    .version(pJson.version)
    //.option('-a, --api <version>', 'Adaptive API level to emulate. Default: 2.2.0')
    //.option('-d, --device <id>', 'Launch emulator with given device id (id retrieved from --list option). Default: Will launch a cool smartphone.')
    //.option('-l, --list <type>', 'List devices for type [all, generic, wearable, smartphone, tablet, browser, desktop, television]. Default: all')
    .option('-p, --path <uri>', 'Launch emulator with given URI (if URI is file://, you can combine this with the -w option. Default: file:///<localdir>/index.html')
    .option('-w, --watch', 'Watch local resources and reload emulator on changes.Default: false')
    .parse(process.argv);

  var params = ' ';

  if (program.path) {
    params = params + '-p ' + program.path + ' ';
  } else {
    console.log(colors.red.bold('[nibble] error: option -p, --path <uri> argument missing'));
    exit(-1);
  }
  if (program.watch) {
    params = params + '-w true ';
  }

  console.log(colors.green('[nibble] Running Adaptive Nibble...'));

  // Current Platform
  var platform = lib.getPlatformByNodePlatformAndArch(os.platform(), os.arch());

  if (!platform) {
    console.log(colors.red.bold('[nibble] There is no platform configured for the current operating system: %s %s'), os.platform(), os.arch());
    exit(-1);
  } else {
    console.log(colors.green('[nibble] Current platform: %s'), platform.name);
  }

  // Run nibble
  var dir = path.dirname(fs.realpathSync(__filename));

  if (shell.exec(dir + path.sep + platform.nibble_dir + path.sep + 'bin' + path.sep + 'adaptive-nibble-emulator' + params).code !== 0) {
    console.log(colors.red.bold('[nibble] Error running the emulator. Exiting'));
    exit(-1);
  }

  exit(0);

}, function (err) {

  console.log(colors.red.bold('[nibble] Error: '), err);
  exit(-1);
});
