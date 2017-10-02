/**
 * UserController
 *
 * @description :: Server-side logic for managing User
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*global User, jwToken, _, ldapService */

module.exports = {
  create: function (req, res) {
    // Create User
    var username = req.param('username');
    var password = req.param('password');

    if (_.isUndefined(username)) {
      return res.badRequest('A username is required!');
    }

    if (_.isUndefined(password)) {
      return res.badRequest('A password is required!');
    }

    if (username.length <= 3) {
      return res.badRequest({
        err: 'Username needs to be greater than 3 characters.'
      });
    }

    if (password.length <= 3) {
      return res.badRequest({
        err: 'Password needs to be greater than 3 characters.'
      });
    }

    var options = {};
    options.username = username;
    options.password = password;

    console.log(options);
    User.create(options)
      .meta({ fetch: true })
      .exec(function (err, user) {
        console.log('Create1');
        if (err) {
          return res.negotiate({ err: err });
        }
        console.log('Create2', user);
        if (user) {
          console.log('Create3');
          res.ok({ user: user, token: jwToken.issue({ id: user.id }) });
        }
      });
  },
  login: function (req, res) {
    // Local login

    var username = req.param('username');
    var password = req.param('password');
    if (!username || username.length === 0) {
      return res.badRequest({ err: 'Username is missing.' });
    }

    if (!password || password.length === 0) {
      return res.badRequest({ err: 'password is missing.' });
    }

    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return res.negotiate({ err: err });
      }

      if (!user) {
        return res.notFound({ err: 'not found' });
      }

      User.comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.negotiate({ err: err });
        }
        if (!valid) {
          return res.forbidden({ err: 'forbidden' });
        }
        var token = jwToken.issue({ id: user.id });
        res.cookie('Authorization', 'Bearer ' + token, { maxAge: 3600000 });
        res.ok({
          user: user,
          token: token
        });
      });
    });
  },
  loginLdap: function (req, res) {
    // ldap login
    var username = req.param('username');
    var password = req.param('password');
    if (!username || username.length === 0) {
      return res.badRequest({ err: 'Username is missing.' });
    }

    if (!password || password.length === 0) {
      return res.badRequest({ err: 'password is missing.' });
    }

    ldapService.auth(req.param('username'), req.param('password'), function (
      err,
      user
    ) {
      if (err) {
        res.negotiate({ err: err });
      } else {
        var token = jwToken.issue({ id: user.id });
        res.cookie('Authorization', 'Bearer ' + token, { maxAge: 3600000 });
        res.ok({
          user: user,
          token: token
        });
      }
    });
  },
  logout: function (req, res) {
    res.clearCookie('Authorization');
    res.ok();
  }
};
