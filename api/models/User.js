/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  schema: true,

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'string',
      required: false,
      unique: false,
      isEmail: true
    },

    password: {
      type: 'string'
    }
  },

  customToJSON: function () {
    return _.omit(this, ['password']);
  },

  beforeCreate: function (values, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return cb(err);
      }
      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) {
          return cb(err);
        }
        values.password = hash;
        return cb();
      });
    });
  },

  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {
      if (err) {
        return cb(err);
      }
      if (match) {
        return cb(null, true);
      } else {
        return cb(err);
      }
    });
  }
};
