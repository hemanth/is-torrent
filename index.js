'use strict';
var bencode = require('bencode');
var pathExists = require('path-exists').sync;
var readFileSync = require('fs').readFileSync;

module.exports = function (torrent) {
	try {
		if (Buffer.isBuffer(torrent)) {
	    torrent = bencode.decode(torrent)
	  } else if (pathExists(torrent)) {
			torrent = bencode.decode(readFileSync(torrent));
		} else {
			return false;
		}
	} catch(e) {
		return false;
	}

	return !!(torrent.info && (torrent.info['name.utf-8'] || torrent.info.name)
	       && torrent.info['piece length'] && torrent.info.pieces &&
	       (torrent.info.files && torrent.info.files.filter(function (file) {
	         return typeof file.length !== 'number' && !(file['path.utf-8'] || file.path)
	       }) || (torrent.info.length === 'number')));
};
