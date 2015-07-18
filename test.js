'use strict';
var assert = require('assert');
var isTorrent = require('./');

it('should detect it as a torrent', function () {
	assert.strictEqual(isTorrent('good.torrent'), true);
});

it('should not detect it as a torrent', function () {
	assert.strictEqual(isTorrent('bad.torrent'), false);
});
