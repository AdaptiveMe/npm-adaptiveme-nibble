'use strict';

var constants = require('../lib/constants.js'),
  colors = require('colors/safe'),
  path = require('path'),
  shell = require('shelljs'),
  exit = require('exit'),
  os = require('os');

/**
 * Obtains a platform by a node os platform
 * @param platform Platform obtained by node platform
 * @returns {*}
 */
var getPlatformByNodePlatformAndArch = function (platform, arch) {

  for (var i = 0; i < constants.platforms.length; i++) {
    if (constants.platforms[i].node_os === platform && constants.platforms[i].node_arch === arch) {
      return constants.platforms[i];
    }
  }
  return null;
};
exports.getPlatformByNodePlatformAndArch = getPlatformByNodePlatformAndArch;

var getPlatform = function () {

  var platform = getPlatformByNodePlatformAndArch(os.platform(), os.arch());

  if (!platform) {
    console.log(colors.red.bold('[nibble] There is no platform configured for the current operating system: %s %s'), os.platform(), os.arch());
    exit(-1);
  } else {
    return platform;
  }
};
exports.getPlatform = getPlatform;

/**
 * Function that runs the nibble software configured in the system
 * @param params Nibble parameters
 */
var runNibble = function (params, dir) {

  var platform = getPlatform();

  if (shell.exec(dir + path.sep + platform.nibble_dir + path.sep + 'bin' + path.sep + 'adaptive-nibble-emulator' + params).code !== 0) {
    console.log(colors.red.bold('[nibble] Error running the emulator. Exiting'));
    exit(-1);
  } else {
    exit(0);
  }
};
exports.runNibble = runNibble;
