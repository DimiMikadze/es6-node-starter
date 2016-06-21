'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authentication = require('./controllers/authentication');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passportService = require('./services/passport');

var requireAuth = _passport2.default.authenticate('jwt', { session: false });
var requireSignin = _passport2.default.authenticate('local', { session: false });

var router = function router(app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'Super secret code' });
  });
  app.post('/signin', requireSignin, _authentication.signin);
  app.post('/signup', _authentication.signup);
};

exports.default = router;