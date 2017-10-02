/*global sails */
var LdapAuth = require('ldapauth-fork');

module.exports = {
  auth: function (login, password, done) {
    'use strict';

    if (!login || login === 0) {
      return done({ err: "User/email field is missing or empty!" }, null);
    }

    if (!password || password.length === 0) {
      return done({ err: "User field is missing or empty!" }, null);
    }

    var ldap = new LdapAuth({
      url: sails.config.ldap.url,
      bindDn: sails.config.ldap.bindDn,
      bindCredentials: sails.config.ldap.bindCredentials,
      searchBase: sails.config.ldap.searchBase,
      searchFilter: sails.config.ldap.searchFilter,
      timeout: 3000,
      connectTimeout: 3000,
      reconnect: false
    });

    var error = false;
    ldap.on('error', function (err) {
      if (!error) {
        error = true;
        return done(err, null);
      }

    });
    ldap.authenticate(login, password, function (err, user) {
      if (!error) {
        return done(err, user);
      }
    });
    ldap.close(function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
};
