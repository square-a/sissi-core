const express = require('express');

const snapshot = require('@/commands/snapshot');
const webpack = require('@/commands/webpack');
const { authenticate, login } = require('./authService');
const { getAllImages, saveImage } = require('./imageController');
const { readJson, writeJson } = require('./jsonController');
const migrateContent = require('./migrateContent');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/structure')
  .get(
    authenticate(),
    readJson('structure')
  );

router.route('/content')
  .get(
    authenticate(),
    async (req, res, next) => {
      try {
        await migrateContent();
        next();

      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
    readJson('content')
  )
  .post(
    authenticate(),
    writeJson('content')
  );

router.route('/login')
  .post((req, res) => {
    const { username, password } = req.body;
    let token;

    try {
      token = login(username, password);
    } catch (error) {
      res.sendStatus(500);
      return;
    }

    if (!token) {
      res.sendStatus(403);
      return;
    }

    res.status(200).send({ token });
  });

router.route('/images')
  .get(
    authenticate(),
    getAllImages
  )
  .post(
    authenticate(),
    saveImage
  );

router.route('/build')
  .post(
    authenticate(),
    async (req, res) => {
      if (process.env.NODE_ENV === 'development') {
        res.sendStatus(422);
        return;
      }

      try {
        await webpack('production');
        await snapshot();
        res.sendStatus(200);

      } catch (error) {
        console.log(error);
        res.sendStatus(422);
      }
    }
  );

module.exports = router;
