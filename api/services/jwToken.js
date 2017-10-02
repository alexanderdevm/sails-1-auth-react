/*global sails */
var jwt = require('jsonwebtoken');

// Generate token for the supplied payload
module.exports.issue = function (payload) {
  'use strict';

  return jwt.sign(
    payload,
    sails.config.jwt.tokenSecret, {
      expiresIn: sails.config.jwt.expiresIn
    }
  );
};

//verify token on request
module.exports.verify = function (token, callback) {
  'use strict';

  return jwt.verify(
    token,
    sails.config.jwt.tokenSecret, {},
    callback
  );
};
