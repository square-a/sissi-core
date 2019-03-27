import { spawn } from 'child_process';
import express from 'express';

import { authenticate, login } from './authService';
import { getAllImages, saveImage } from './imageController';
import { readJson, writeJson } from './jsonController';
import { migrateContentMiddleware } from './migrateContent';

const router = express.Router();

router.route('/structure')
  .get(
    authenticate(),
    readJson('structure')
  );

router.route('/content')
  .get(
    authenticate(),
    migrateContentMiddleware,
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
    } catch(error) {
      return res.sendStatus(500);
    }

    if (!token) {
      return res.sendStatus(403);
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

      child.stderr.on('data', (data) => {
        res.sendStatus(422);
        isErrored = true;
        console.log(data.toString());
      });

      child.stdout.on('data', (data) => console.log(data.toString()));

      child.on('close', (code) => {
        if (isErrored) {
          return;
        }
        if (code !== 0) {
          return res.sendStatus(422);
        }

        res.sendStatus(200);
      });
    }
  );

export default router;
