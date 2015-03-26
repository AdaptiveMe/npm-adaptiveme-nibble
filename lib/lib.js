'use strict';

var constants = require('../lib/constants.js');

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
