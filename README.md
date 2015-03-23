# Adaptive Nibble for NodeJS (Device Simulator) 
[![Build Status](https://travis-ci.org/AdaptiveMe/npm-adaptiveme-nibble.svg?branch=master)](https://travis-ci.org/AdaptiveMe/npm-adaptiveme-nibble)
[![GitHub tag](https://img.shields.io/github/tag/AdaptiveMe/npm-adaptiveme-nibble.svg)](https://github.com/AdaptiveMe/npm-adaptiveme-nibble) 
[![Adaptive Nibble NodeJS](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/npm-adaptiveme-nibble) 
[![Adaptive Nibble NodeJS](https://img.shields.io/node/v/gh-badges.svg)](https://www.npmjs.com/package/npm-adaptiveme-nibble)
[![License](https://img.shields.io/badge/license-apache%202-blue.svg)](https://raw.githubusercontent.com/AdaptiveMe/adaptive-arp-api/master/LICENSE) 
[![Adaptive Nibble](https://img.shields.io/badge/devtools-nibble-yellow.svg)](https://github.com/AdaptiveMe/npm-adaptiveme-nibble)  [![adaptive.me](https://img.shields.io/badge/adaptive-me-fdcb0e.svg)](http://adaptive.me)
[![Adaptive Development Tools](https://raw.githubusercontent.com/AdaptiveMe/AdaptiveMe.github.io/master/assets/logos/transparent/Logo-adaptive-devtools.png)](#)

## Introduction

### About This Project

Adaptive Nibble is a mobile device simulator for hybrid-app development. It allows you to use the emulator during the development to preview your app as you develop it and it also emulates calls to the Adaptive Runtime Platform APIs.

This is the **stand-alone** Adaptive Nibble installer for NodeJS. 

If you want the **integrated** version for Adaptive Generator for Yeoman, please refer to the following repo: [AdaptiveMe App Generator for Yeoman](https://github.com/AdaptiveMe/generator-adaptiveme) for installation instructions.

## Installation


* You should NodeJS installed on your machine before proceeding with the installation. If you don't have it, please download it from [here](https://nodejs.org/download/) for your platform. 
	*	If you don't know whether you have it installed, open up a ```terminal```or ```cmd prompt``` and issue the following command ```node -v```.
	* The above command should respond with at least the following NodeJS version ```v0.12.0```.
* Install the ```npm-adaptiveme-nibble``` on your machine.
	* On **Windows** from ```cmd prompt```:
		
	```
  		npm i npm-adaptiveme-nibble -g 
  		nibble -r -p http://adaptiveme.github.io/ 
   ```
	* On **OS X** and **Linux** from ```terminal```:
	
	``` 
  		sudo npm i npm-adaptiveme-nibble -g
  		sudo nibble -r -p http://adaptiveme.github.io/
	```
*	The installer will download everything you need to run Adaptive Nibble.

## Running

* Run from a ```terminal``` or ```cmd prompt```:

	*	```nibble -h``` to launch nibble help message for parameters.

* You're ready to start developing! Enjoy.

* Please report issues/wants/needs [here](https://github.com/AdaptiveMe/npm-adaptiveme-nibble/issues) clearly stating your platform and screenshots (whenever possible).

## Updating
* Updating your ```npm-adaptiveme-nibble``` installation.
	* On **Windows** from ```cmd prompt```:
		
	```
  		npm up npm-adaptiveme-nibble -g 

   ```
	* On **OS X** and **Linux** from ```terminal```:
	
	``` 
  		sudo npm up npm-adaptiveme-nibble -g

	```


## About Adaptive Runtime Platform

Hybrid apps are applications that are built using HTML5/CSS3/JavaScript web technologies and use a native "containers" to package the app to enable access to the native functionalities of a device. In essence, you can write a rich mobile/wearable/tv application using HTML and JavaScript and package that application as a native app for multiple mobile/wearable/tv platforms and distribute them on the different app stores and markets.

The Adaptive Runtime Platform (ARP) provides these native "containers" to package apps for the main mobile, wearable and desktop platforms... and other platforms as they emerge. Adaptive Runtime Platform (ARP) and sub-projects are open-source under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). The Adaptive Runtime Platform (ARP) project was created by [Carlos Lozano Diez](https://github.com/carloslozano) as part of the [adaptive.me](http://adaptive.me) set of products.

Please refer to the [project site](http://adaptiveme.github.io) for more information.

## Work Backlog

#### Board: [![Stories in Ready](https://badge.waffle.io/AdaptiveMe/npm-adaptiveme-nibble.svg?label=ready&title=Ready)](https://waffle.io/AdaptiveMe/npm-adaptiveme-nibble)

[![Throughput Graph](https://graphs.waffle.io/AdaptiveMe/npm-adaptiveme-nibble/throughput.svg)](https://waffle.io/AdaptiveMe/npm-adaptiveme-nibble/metrics)

## Contributing

We'd *love to accept your patches and contributions to this project*.  There are a just a few small guidelines you need to follow to ensure that you and/or your company and our project are safeguarded from inadvertent copyright infringement. I know, this can be a pain but we want fair-play from the very start so that we're all on the same page. Please refer to the [project site](http://adaptiveme.github.io) for more information.

## Attributions

* Adaptive Runtime Platform (ARP) artwork by [Jennifer Lasso](https://github.com/Jlassob).
* Project badge artwork by [shields.io](http://shields.io/).
* All other logos are copyright of their respective owners.

## License
All the source code of the Adaptive Runtime Platform (ARP), including all Adaptive Runtime Platform (ARP) sub-projects curated by [Carlos Lozano Diez](https://github.com/carloslozano), are distributed, and must be contributed to, under the terms of the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). The [license](https://raw.githubusercontent.com/AdaptiveMe/adaptive-arp-api/master/LICENSE) is included in this [repository](https://raw.githubusercontent.com/AdaptiveMe/adaptive-arp-api/master/LICENSE).

Forged with :heart: in Barcelona, Catalonia · © 2013 - 2015 [adaptive.me](http://adaptive.me) / [Carlos Lozano Diez](http://google.com/+CarlosLozano).

