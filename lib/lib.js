'use strict';

var constants = require('../lib/constants.js'),
    colors = require('colors/safe'),
    path = require('path'),
    shell = require('shelljs'),
    exit = require('exit'),
    fs = require('fs'),
    os = require('os');

/**
 * Obtains a platform by a node os platform
 * @param platform Platform obtained by node platform
 * @param arch Current architecture
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

/**
 * Returns the current running platform
 * @returns {*} Platfor object
 */
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
 * @param dir Nibble's directory
 */
var runNibble = function (params, dir) {

    var platform = getPlatform();

    if (shell.exec(dir + path.sep + 'bin' + path.sep + 'adaptive-nibble-emulator ' + params).code !== 0) {
        console.log(colors.red.bold('[nibble] Error running the emulator. Exiting'));
        exit(-1);
    } else {
        exit(0);
    }
};
exports.runNibble = runNibble;

/**
 * Deletes a folder recursively
 * @param path Folder's path
 */
var deleteFolderRecursive = function (folder_path) {
    if (fs.existsSync(folder_path)) {
        fs.readdirSync(folder_path).forEach(function (file, index) {
            var curPath = folder_path + path.sep + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folder_path);
    }
};
exports.deleteFolderRecursive = deleteFolderRecursive;
