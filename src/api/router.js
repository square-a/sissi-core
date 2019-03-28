const { spawn } = require('child_process');
const express = require('express');

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
    (req, res) => {
      let isErrored = false;
      const child = spawn('sissi', ['build'], { cwd: process.cwd() });

      child.stderr.on('data', data => {
        res.sendStatus(422);
        isErrored = true;
        console.log(data.toString());
      });

      child.stdout.on('data', data => console.log(data.toString()));

      child.on('close', code => {
        if (isErrored) {
          return;
        }
        if (code !== 0) {
          res.sendStatus(422);
          return;
        }

        res.sendStatus(200);
      });
    }
  );

module.exports = router;
