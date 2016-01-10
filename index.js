"use strict";
var wordlist = require('pgp-word-list/pgp.json');
var crypto = require('crypto');

module.exports = function(length) {
  return new Promise((resolve, reject) => {
    var words = [];
    crypto.randomBytes(length, (err, buff) => {
      if(err) {
        return reject(err);
      }
      for(let entry of buff.entries()) {
        let odd = entry[0] % 2 === 0;
        words.push(wordlist[entry[1] % 256][odd ? 1 : 0]);
      }
      resolve(words);
    });
  });
}
