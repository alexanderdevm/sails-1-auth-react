/*global jwToken */

module.exports = function (req, res, next) {
  'use strict';

  var token;

  if ((req.headers && req.headers.authorization) || req.cookies.Authorization) {
    var container;
    if (req.cookies.Authorization) {
      container = req.cookies.Authorization;
    } else {
      container = req.headers.authorization;
    }
    var parts = container.split(' ');
    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      } else {
        return res.forbidden({ err: 'Format is Authorization: Bearer [token]' });
      }
    } else if (req.param('token')) {
      token = req.param('token');

      //delete token from param to keep blueprints functional
      delete req.query.token;
    } else {
      return res.forbidden({ err: 'No Authorization header was found' });
    }

    jwToken.verify(token, function (err, token) {
      if (err) {
        return res.forbidden({ err: 'Invalid Token' });
      }
      req.token = token;
      next();
    });
  } else {
    return res.badRequest({ err: "Missing Authorization: Bearer [token] header" });
  }

};
