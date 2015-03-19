var colors = require('colors');
var wget = require('wget-improved');
var tarball = require('tarball-extract');
var AdmZip = require('adm-zip');
var ProgressBar = require('progress');
require('shelljs/global');

// Matrix of constants for all the platforms
var platforms = [
    {
        name: "darwin",
        node_os: "darwin",
        nibble_url: "https://github.com/AdaptiveMe/npm-adaptiveme-nibble/releases/download/1.0.5/adaptive-nibble-emulator-1.0.tar",
        nibble_name: "adaptive-nibble-emulator-1.0.tar",
        nibble_folder: "adaptive-nibble-emulator-1.0",
        java_home: "/../node_modules/npm-adaptiveme-jre/bin/jdk1.8.0_60/jdk1.8.0_60.jdk/Contents/Home",
        extension: "tar"
    }, {
        name: "windows",
        node_os: "win32",
        nibble_url: "https://github.com/AdaptiveMe/npm-adaptiveme-nibble/releases/download/1.0.5/adaptive-nibble-emulator-1.0.zip",
        nibble_name: "adaptive-nibble-emulator-1.0.zip",
        nibble_folder: "adaptive-nibble-emulator-1.0",
        java_home: "\\..\\node_modules\\npm-adaptiveme-jre\\bin\\jdk1.8.0_60\\jdk1.8.0_60.jdk\\",
        extension: "zip"
    }, {
        name: "linux",
        node_os: "linux",
        nibble_url: "https://github.com/AdaptiveMe/npm-adaptiveme-nibble/releases/download/1.0.5/adaptive-nibble-emulator-1.0.tar",
        nibble_name: "adaptive-nibble-emulator-1.0.tar",
        nibble_folder: "adaptive-nibble-emulator-1.0",
        java_home: "/../node_modules/npm-adaptiveme-jre/bin/jdk1.8.0_60/jdk1.8.0_60.jdk/",
        extension: "tar"
    }
];

var getPlatformByNodePlatform = function(platform) {

    for (var i=0; i<platforms.length; i++) {
        if (platforms[i].node_os == platform) {
            return platforms[i];
        }
    }
    console.log(colors.red("There is no platform configured for the current operating system: " + platform));
    return null
}; exports.getPlatformByNodePlatform = getPlatformByNodePlatform;

var downloadNibble = function(platform, params, installDir){

    console.log(colors.green("Downloading Nibble: " + platform.nibble_url));

    var download = wget.download(platform.nibble_url, installDir + "/" + platform.nibble_name, null);

    var bar = new ProgressBar('[:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        total: 100
    });

    download.on('error', function(err) {
        console.log(colors.red("Error: " + err));
        return -1;
    });
    download.on('end', function(output) {
        console.log(colors.green("\nSuccesfully download file: " + installDir + "/" + platform.nibble_name));
        decompressNibble(platform, params, installDir);
    });
    var percentStatus = -1;
    download.on('progress', function(progress) {
        var percent = (progress * 100).toFixed(0);
        if (percent != percentStatus) {
            percentStatus = percent;
            bar.tick();
        }
    });
}; exports.downloadNibble = downloadNibble;

var decompressNibble = function(platform, params, installDir){

    console.log(colors.green("Extracting emulator..."));

    if(platform.extension == "tar"){
        tarball.extractTarball(installDir + "/" + platform.nibble_name, installDir, function(err){
            if(err) {
                console.log(colors.red("Error: " + err));
                return -1;
            }
            console.log(colors.green("Succesfully extracted file"));

            // Running the emulator

            console.log(colors.green("Running the emulator..."));

            if (exec(installDir + '/' + platform.nibble_folder + '/bin/adaptive-nibble-emulator' + params).code !== 0) {
                console.log(colors.red("Error running the emulator. Exiting"));
                return -1
            }

            return 0;
        })
    } else if (platform.extension == "zip"){
        var zip = new AdmZip(platform.nibble_name);
        zip.extractAllTo(installDir, true);
        console.log(colors.green("Succesfully extracted file"));
        // Running the emulator

        console.log(colors.green("Running the emulator..."));

        if (exec(installDir + '/' + platform.nibble_folder + '/bin/adaptive-nibble-emulator' + params).code !== 0) {
            console.log(colors.red("Error running the emulator. Exiting"));
            return -1
        }

        return 0;

    }

}; exports.decompressNibble = decompressNibble;
