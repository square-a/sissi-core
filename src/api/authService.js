import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

const config = require(`${process.cwd()}/config.json`);

const jwtParams = {
  secretOrKey: config.JWT.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new Strategy(jwtParams, (payload, next) => {
  const { phrase } = payload;
  const user = config.users.find(user => user.phrase === phrase);

  if (user) {
    return next(null, payload);
  } else {
    return next(new Error('Wrong credentials!'), null);
  }
});

passport.use(jwtStrategy);

export function init() {
  return passport.initialize();
}

export function authenticate() {
  return passport.authenticate('jwt', { session: false });
}

export function login(username, password) {
  const user = config.users.find(user => user.username === username);

  if (user && user.password === password) {
    return jwt.sign({ phrase: user.phrase }, config.JWT.secret);
  }
  return false;
}
