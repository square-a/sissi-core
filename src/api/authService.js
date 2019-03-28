const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require(`${process.cwd()}/config.json`);

const jwtParams = {
  secretOrKey: config.JWT.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new Strategy(jwtParams, (payload, next) => {
  const { phrase } = payload;
  const user = config.users.find(u => u.phrase === phrase);

  if (user) {
    return next(null, payload);
  }

  return next(new Error('Wrong credentials!'), null);
});

passport.use(jwtStrategy);

module.exports = {
  init() {
    return passport.initialize();
  },
  authenticate() {
    return passport.authenticate('jwt', { session: false });
  },
  login(username, password) {
    const user = config.users.find(u => u.username === username);

    if (user && user.password === password) {
      return jwt.sign({ phrase: user.phrase }, config.JWT.secret);
    }
    return false;
  },
};
