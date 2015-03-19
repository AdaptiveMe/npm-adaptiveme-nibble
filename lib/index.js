var colors = require('colors');
var wget = require('wget-improved');
var tarball = require('tarball-extract');
var AdmZip = require('adm-zip');
require('shelljs/global');

// Matrix of constants for all the platforms
var platforms = [
    {
        name: "darwin",
        node_os: "darwin",
        nibble_url: "https://github.com/AdaptiveMe/npm-adaptiveme-nibble/releases/download/1.0.5/adaptive-nibble-emulator-1.0.tar",
        nibble_name: "adaptive-nibble-emulator-1.0.tar",
        nibble_folder: "adaptive-nibble-emulator-1.0",
        extension: "tar"
    }, {
        name: "windows",
        node_os: "win32",
        nibble_url: "https://github.com/AdaptiveMe/npm-adaptiveme-nibble/releases/download/1.0.5/adaptive-nibble-emulator-1.0.zip",
        nibble_name: "adaptive-nibble-emulator-1.0.zip",
        nibble_folder: "adaptive-nibble-emulator-1.0",
        extension: "zip"
    }, {
        name: "linux",
        node_os: "linux",
        nibble_url: "https://github.com/AdaptiveMe/npm-adaptiveme-nibble/releases/download/1.0.5/adaptive-nibble-emulator-1.0.tar",
        nibble_name: "adaptive-nibble-emulator-1.0.tar",
        nibble_folder: "adaptive-nibble-emulator-1.0",
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

var downloadNibble = function(platform, params){

    console.log(colors.green("Downloading Nibble: " + platform.nibble_url));

    var download = wget.download(platform.nibble_url, platform.nibble_name, null);

    download.on('error', function(err) {
        console.log(colors.red("Error: " + err));
        return -1;
    });
    download.on('end', function(output) {
        console.log(colors.green("\nSuccesfully download file: " + output));
        decompressNibble(platform, params);
    });
    var percentStatus = 0;
    download.on('progress', function(progress) {
        var out = "";
        var i;
        var percent = (progress * 100).toFixed(0);
        if (percent != percentStatus) {
            percentStatus = percent;
            for (i = percent.length; i < 3; i++) {
                out = out + (" ");
            }
            out = out + (percent + "% [");
            for (i = 1; i <= percent; i++) {
                out = out + ("=");
            }
            if(percent != 100) out = out + (">");
            for (i = percent; i < 100; i++) {
                out = out + (" ");
            }
            if(percent != 100) {
                out = out + ("]");
            } else {
                out = out + ("=]");
            }
            process.stdout.write(out + "\r");
        }
    });
}; exports.downloadNibble = downloadNibble;

var decompressNibble = function(platform, params){

    console.log(colors.green("Extracting emulator..."));

    if(platform.extension == "tar"){
        tarball.extractTarball(platform.nibble_name, ".", function(err){
            if(err) {
                console.log(colors.red("Error: " + err));
                return -1;
            }
            console.log(colors.green("Succesfully extracted file"));

            // Running the emulator

            console.log(colors.green("Running the emulator..."));

            if (exec(__dirname + '/' + platform.nibble_folder + '/bin/adaptive-nibble-emulator' + params).code !== 0) {
                console.log(colors.red("Error running the emulator. Exiting"));
                return -1
            }

            return 0;
        })
    } else if (platform.extension == "zip"){
        var zip = new AdmZip(platform.nibble_name);
        zip.extractAllTo(".", true);
        console.log(colors.green("Succesfully extracted file"));
        // Running the emulator

        console.log(colors.green("Running the emulator..."));

        if (exec(__dirname + '/' + platform.nibble_folder + '/bin/adaptive-nibble-emulator' + params).code !== 0) {
            console.log(colors.red("Error running the emulator. Exiting"));
            return -1
        }

        return 0;

    }

}; exports.decompressNibble = decompressNibble;
