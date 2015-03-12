#!/usr/bin/env node

var lib= require('../lib/index.js');
var greeting = lib.sayHello('Bret');

console.log(greeting);
