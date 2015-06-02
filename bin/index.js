#!/usr/bin/env node

/**
 * Script for running the nibble as a global program defined by node.
 * The definition of the script is in package.json.
 *
 * This script passes all the parameters to nibble executable
 */

'use strict';

var exit = require('exit'),
    path = require('path'),
    lib = require('../lib/lib.js'),
    colors = require('colors/safe'),
    fs = require('fs'),
    trycatch = require('trycatch'),
    osenv = require('osenv');

trycatch(function () {

    // Current Platform
    var platform = lib.getPlatform();

    var nibble_dir = osenv.home() + path.sep + '.adaptive/.nibble';

    if (!fs.existsSync(nibble_dir)) {
        nibble_dir = path.dirname(fs.realpathSync(__dirname)) + platform.nibble_dir;
    }

    if (!fs.existsSync(nibble_dir)) {
        console.log(colors.red.bold('[nibble] The nibble executable is not founded in folder: '), nibble_dir);
        exit(-1);
    }

    var myArgs = '';
    var myArgsArray = process.argv.slice(2);
    for (var i = 0; i < myArgsArray.length; i++) {
        myArgs = myArgs + myArgsArray[i] + ' ';
    }

    lib.runNibble(myArgs, nibble_dir);

}, function (err) {
    console.log(colors.red.bold('[nibble] Error: '), err);
    exit(-1);
});
