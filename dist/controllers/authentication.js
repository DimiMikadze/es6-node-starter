'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signin = undefined;

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenForUser = function tokenForUser(user) {
  var timestamp = new Date().getTime();

  return _jwtSimple2.default.encode({ sub: user.id, iat: timestamp }, _config.dbConfig.secret);
}; /* eslint-disable consistent-return */


var signin = exports.signin = function signin(req, res) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

var signup = exports.signup = function signup(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // see if a user with the given email exists
  _user2.default.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // if a user with email does exists, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user with email does not exist, create and save user record
    var user = new _user2.default({
      email: email,
      password: password
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};