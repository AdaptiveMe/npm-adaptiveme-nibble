#!/usr/bin/env node

/**
 * This script can be run externally and returns the current
 * version of the script configured in the package.json
 */

'use strict';

var pJson = require('../package.json');

console.log(pJson.version);
