import jwt from 'jwt-simple';
import User from '../models/user';
import { dbConfig } from '../config';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, dbConfig.secret);
};

export const signin = (req, res) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // see if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // if a user with email does exists, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user with email does not exist, create and save user record
    const user = new User({
      email,
      password,
    });

    user.save((err) => {
      if (err) { return next(err); }

      // respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
