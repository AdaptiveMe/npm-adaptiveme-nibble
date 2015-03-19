#!/usr/bin/env node

'use strict';

var program = require('commander');

// Define program
program
    .version('1.0.7')
    .option('-a, --api <version>', 'Adaptive API level to emulate. Default: 2.2.0')
    .option('-d, --device <id>', 'Launch emulator with given device id (id retrieved from --list option). Default: Will launch a cool smartphone.')
    .option('-l, --list <type>', 'List devices for type [all, generic, wearable, smartphone, tablet, browser, desktop, television]. Default: all')
    .option('-p, --path <uri>', 'Launch emulator with given URI (if URI is file://, you can combine this with the -w option. Default: file:///<localdir>/index.html')
    .option('-w, --watch <boolean>', 'Watch local resources and reload emulator on changes.Default: false')
    .parse(process.argv);

// Custom Dependencies
var lib = require('../lib/index.js');
var constants_jre = require('../node_modules/npm-adaptiveme-jre/lib/constants.js');
var lib_jre = require('../node_modules/npm-adaptiveme-jre/lib/index.js');

// Global Dependencies
var program = require('commander');
var colors = require('colors');
var os = require('os');
var async = require("async");
var jre = require('npm-adaptiveme-jre');
var fs = require('fs-sync');
var fsa = require('fs');
var path = require('path');


if (!program.path) {
    console.log(colors.red("You have to pass the -p argument <uri> Launch emulator with given URI "));
    return 0;
}

var params = " ";
if (program.api) params = params + "-a " + program.api + " ";
if (program.device) params = params + "-d " + program.device + " ";
if (program.list) params = params + "-l " + program.list + " ";
if (program.path) params = params + "-p " + program.path + " ";
if (program.watch) params = params + "-w " + program.watch + " ";


console.log(colors.green("Running Adaptive Nibble..."));

// Set the JAVA_HOME
var platform = lib.getPlatformByNodePlatform(os.platform());

async.series([
        function (callback) {
            jre.execute(callback);
        }
    ],
    // optional callback
    function (err, results) {

        var installDir = path.dirname(fsa.realpathSync(__filename));

        console.log(colors.green("Setting JAVA_HOME = " + installDir + platform.java_home));
        process.env['JAVA_HOME'] = installDir + platform.java_home;

        if (!fs.exists(installDir + platform.nibble_folder)) {

            if (fs.exists(installDir + platform.nibble_name)) {
                // If exists the file, remove it
                fs.remove(installDir + platform.nibble_name);
            }

            // If there is no folder, download the file
            lib.downloadNibble(platform, params, installDir);

        } else {

            console.log(process.cwd());

            console.log(colors.green("Running the emulator..."));
            if (exec(installDir + '/../' + platform.nibble_folder + '/bin/adaptive-nibble-emulator' + params).code !== 0) {
                console.log(colors.red("Error running the emulator. Exiting"));
                return -1
            }

            return 0;
        }
    });

