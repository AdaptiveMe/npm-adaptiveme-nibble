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
    trycatch = require('trycatch'),
    osenv = require('osenv');

trycatch(function () {

    var nibble_dir = osenv.home() + path.sep + '.adaptive/.nibble';

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
