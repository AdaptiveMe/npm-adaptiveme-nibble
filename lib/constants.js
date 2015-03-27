'use strict';

var github_server = 'https://github.com/AdaptiveMe/adaptive-tools-nibble/releases/download/';
var nibble_version = '1.0-alpha.5';

var platforms = [
  {
    name: 'darwin',
    node_os: 'darwin',
    node_arch: 'x64',
    nibble_url: github_server + nibble_version + '/adaptive-nibble-darwin-x64-' + nibble_version + '.tgz',
    nibble_ext: 'tgz',
    nibble_file: '/adaptive-nibble-darwin-x64-' + nibble_version + '.tgz',
    nibble_dir: '/adaptive-nibble-emulator'
  }, {
    name: 'win32',
    node_os: 'win32',
    node_arch: 'ia32',
    nibble_url: github_server + nibble_version + '/adaptive-nibble-windows-i586-' + nibble_version + '.zip',
    nibble_ext: 'zip',
    nibble_file: '\\adaptive-nibble-windows-i586-' + nibble_version + '.zip',
    nibble_dir: '\\adaptive-nibble-emulator'
  }, {
    name: 'win64',
    node_os: 'win32',
    node_arch: 'x64',
    nibble_url: github_server + nibble_version + '/adaptive-nibble-windows-x64-' + nibble_version + '.zip',
    nibble_ext: 'zip',
    nibble_file: '\\adaptive-nibble-windows-x64-' + nibble_version + '.zip',
    nibble_dir: '\\adaptive-nibble-emulator'
  }, {
    name: 'linux-i586',
    node_os: 'linux',
    node_arch: 'ia32',
    nibble_url: github_server + nibble_version + '/adaptive-nibble-linux-i586-' + nibble_version + '.tgz',
    nibble_ext: 'tgz',
    nibble_file: '/adaptive-nibble-linux-i586-' + nibble_version + '.tgz',
    nibble_dir: '/adaptive-nibble-emulator'
  }, {
    name: 'linux-x64',
    node_os: 'linux',
    node_arch: 'x64',
    nibble_url: github_server + nibble_version + '/adaptive-nibble-linux-x64-' + nibble_version + '.tgz',
    nibble_ext: 'tgz',
    nibble_file: '/adaptive-nibble-linux-x64-' + nibble_version + '.tgz',
    nibble_dir: '/adaptive-nibble-emulator'
  }
];

exports.platforms = platforms;
