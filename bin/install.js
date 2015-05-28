/**
 * This script runs the installation of the nibble software. The script
 * checks if it's necesary to install or reinstall the nibble and
 * downloads the nibble if it's necessari to (re)install.
 */

'use strict';

var colors = require('colors/safe'),
    trycatch = require('trycatch'),
    exit = require('exit'),
    lib = require('../lib/lib.js'),
    async = require('async'),
    wget = require('wget-improved'),
    Progress = require('progress'),
    fs = require('fs'),
    path = require('path'),
    tarball = require('tarball-extract'),
    AdmZip = require('adm-zip'),
    osenv = require('osenv'),
    mkdirp = require('mkdirp');

trycatch(function () {

    // Current Platform
    var platform = lib.getPlatform();

    async.series({

            nibble: function (callback) {

                var isDownload = false;
                var percentStatus = -1;
                var adaptive_dir = osenv.home() + path.sep + '.adaptive';
                var nibble_dir = adaptive_dir + path.sep + '.nibble';
                var nibble_file = nibble_dir + platform.nibble_file;

                var bar = new Progress('[:bar] :percent :elapseds :etas ', {
                    complete: '=',
                    incomplete: ' ',
                    total: 101,
                    width: 50
                });

                // Check if its necessary to download the nibble
                if (fs.existsSync(nibble_dir)) {

                    // If the nibble directory exists, check the version
                    if (fs.existsSync(nibble_file)) {
                        // Same version
                        console.log(colors.green('[nibble] Your current version of nibble is the latest. Skipping nibble download...'));
                        isDownload = false;
                    } else {
                        // Different version
                        console.log(colors.red('[nibble] Your current version of nibble is an old one.'));
                        lib.deleteFolderRecursive(nibble_dir);
                        isDownload = true;
                    }

                } else {
                    // If the nibble directory doesn't exist, download it
                    isDownload = true;
                }

                if (isDownload) {

                    console.log(colors.magenta('[nibble] Downloading nibble... %s'), platform.nibble_url);

                    mkdirp(nibble_dir, function (err) {
                        if (err) {
                            console.log(colors.red.bold('[nibble] Error creating .nibble folder: %s'), err);
                            exit(-1);
                        }
                    });

                    var download = wget.download(platform.nibble_url, nibble_file, null);

                    download.on('error', function (err) {
                        callback(err);
                    });

                    download.on('end', function () {

                        console.log(colors.magenta('[nibble] Extracting nibble: %s'), nibble_file);

                        if (platform.nibble_ext === 'tgz') {

                            tarball.extractTarball(nibble_file, nibble_dir, function (err) {
                                if (err) {
                                    callback(err);
                                }
                                console.log(colors.magenta('[nibble] Succesfully extracted nibble'));
                                callback(null);
                            });

                        } else if (platform.nibble_ext === 'zip') {

                            var zip = new AdmZip(nibble_file);
                            zip.extractAllTo(nibble_dir, true);

                            console.log(colors.magenta('[nibble] Succesfully extracted nibble'));
                            callback(null);

                        }
                    });

                    download.on('progress', function (progress) {
                        var percent = (progress * 100).toFixed(0);
                        if (percent !== percentStatus) {
                            percentStatus = percent;
                            bar.tick();
                        }
                    });

                }
            }
        },
        // optional callback
        function (err) {

            if (err) {
                console.log(colors.red.bold('[nibble] Error: %s'), err);
                exit(-1);
            } else {
                exit(0);
            }
        });


}, function (err) {

    console.log(colors.red.bold('[nibble] Error: %s'), err);
    exit(-1);
});
