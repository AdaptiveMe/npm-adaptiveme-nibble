'use strict';

var lib = require('../lib/lib.js'),
  os = require('os'),
  expect = require('expect.js'),
  request = require('request');

describe('nibble', function () {

  /**
   * Test to try a HEAD connection to Github. The expected result is a 403
   * (redirect). This behaviour is normal in Github.
   */
  it('Github 403 response (redirection)', function (done) {

    var platform = lib.getPlatformByNodePlatformAndArch(os.platform(), os.arch());

    request.head(platform.nibble_url, function (err, res, body){
      expect(res.statusCode).to.equal(403);
      done();
    });
  });

});
