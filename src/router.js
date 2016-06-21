import { signin, signup } from './controllers/authentication';
import passport from 'passport';

const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'Success!' });
  });
  app.post('/signin', requireSignin, signin);
  app.post('/signup', signup);
};

export default router;
