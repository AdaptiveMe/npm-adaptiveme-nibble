'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    eslint: {
      all: {
        src: ['*.js', 'bin', 'lib']
      }
    },

    jscs: {
      all: {
        src: ['Gruntfile.js', 'bin/**/*.js', 'lib/**/*.js'],
        options: {config: '.jscsrc'}
      }
    },

    mochaTest: {
      all: {
        options: {reporter: 'spec'},
        src: ['test/spec.js']
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }

  });

  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('lint', ['eslint', 'jscs']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['lint', 'test']);
};
