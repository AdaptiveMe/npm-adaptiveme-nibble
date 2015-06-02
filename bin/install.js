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

                var bar = new Progress('[:bar] :percent :elapseds :etas ', {
                    complete: '=',
                    incomplete: ' ',
                    total: 101,
                    width: 50
                });

                // Folder allocation

                var adaptive_dir, nibble_dir, nibble_file;

                if (parseInt(process.env.SUDO_UID) &&
                    (platform.name === 'darwin' || platform.name.lastIndexOf('linux', 0) === 0)) {

                    // sudo (mac or linux)

                    nibble_dir = path.dirname(fs.realpathSync(__dirname)) + platform.nibble_dir;
                    nibble_file = nibble_dir + platform.nibble_file;

                } else {

                    // not sudo (mac, linux or windows)

                    adaptive_dir = osenv.home() + path.sep + '.adaptive';
                    nibble_dir = adaptive_dir + path.sep + '.nibble';
                    nibble_file = nibble_dir + platform.nibble_file;
                }

                //console.log(colors.green('[nibble] Nibble file: %s'), nibble_dir);

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

                    // Create a folder to download the nibble. If the environment is lin or mac
                    // and the program is executed with sudo, on the creation we have to specify the
                    // user

                    mkdirp(nibble_dir, function (err) {
                        if (err) {
                            console.log(colors.red.bold('[nibble] Error creating .nibble folder: %s'), err);
                            exit(-1);
                        }
                    });

                    /*if (parseInt(process.env.SUDO_UID) &&
                     (platform.name === 'darwin' || platform.name.lastIndexOf('linux', 0) === 0)) {
                     // sudo (mac or linux)

                     var user_dir = osenv.home();
                     var username = user_dir.substr(user_dir.lastIndexOf('/'), user_dir.length);

                     if (!fs.existsSync(adaptive_dir)) {
                     exec('sudo -u ' + username + ' mkdir ' + adaptive_dir, function (error, stdout, stderr) {
                     if (error !== null) {
                     console.log(colors.red.bold('[nibble] Error creating .adaptive folder: %s'), error);
                     exit(-1);
                     }
                     });
                     }
                     if (!fs.existsSync(nibble_dir)) {
                     exec('sudo -u ' + username + ' mkdir ' + nibble_dir, function (error, stdout, stderr) {
                     if (error !== null) {
                     console.log(colors.red.bold('[nibble] Error creating .nibble folder: %s'), error);
                     exit(-1);
                     }
                     });
                     }

                     } else {
                     // not sudo

                     mkdirp(nibble_dir, function (err) {
                     if (err) {
                     console.log(colors.red.bold('[nibble] Error creating .nibble folder: %s'), err);
                     exit(-1);
                     }
                     });
                     }*/

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
