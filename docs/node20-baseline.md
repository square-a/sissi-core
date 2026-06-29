# Node 20 Baseline

Date: 2026-06-29

## Environment

- Repo default shell was on `Node v24.16.0`.
- Repo pins `v20.9.0` in `.nvmrc`.
- Baseline verification was run with `nvm use`, which selected `Node v20.9.0` and `npm 10.1.0`.

## Repo Shape

- No local fixture project was found at the repo root.
- Checked for `.sissi`, `config.json`, `content.json`, and `structure.json` within `.` and immediate child directories: no matches.

## Install Attempt

Command:

```bash
npm ci
```

Result on `Node v20.9.0`: failed.

First hard blocker:

- `node-sass@4.12.0` fails during native build.
- Failure path: `node-sass` -> `node-gyp@3.8.0` -> missing `python2` / `python`.
- This is the main Node 20/Linux install blocker in the current manifest.

Relevant error summary:

- `npm ERR! path /home/alex/sissi-core/node_modules/node-sass`
- `npm ERR! gyp ERR! stack Error: Can't find Python executable "python"`
- `npm ERR! node -v v20.9.0`
- `npm ERR! node-gyp -v v3.8.0`

Notes:

- `package-lock.json` is lockfile v1, so npm 10 first performs old-lockfile metadata refreshes against the registry.
- The install produced many deprecation warnings, but the first hard failure was still `node-sass`.

## Script Baseline After Partial Install

Commands:

```bash
npm run lint
npm test
npm run build
```

Results:

- `npm run lint`: failed with `sh: 1: eslint: not found`
- `npm test`: failed with `sh: 1: jest: not found`
- `npm run build`: failed with `sh: 1: babel: not found`

Interpretation:

- Because `npm ci` aborted during dependency installation, bin links for the script toolchain were not reliably available.
- These script failures are not yet evidence of independent code issues.
- The only verified hard blocker before normal script execution is the failed native install of `node-sass`.

## Dependency Categories

### Runtime / App Dependencies In Active Use

- API/server: `express`, `cors`, `passport`, `passport-jwt`, `jsonwebtoken`, `express-fileupload`, `body-parser`
- CMS/app runtime: `react`, `react-dom`, `react-router`, `react-router-dom`, `redux`, `react-redux`, `redux-thunk`, `redux-form`, `redux-first-router`, `redux-first-router-link`, `prop-types`
- CMS/editor/runtime helpers: `inscrybmde`, `marked`, `react-autocomplete`, `react-beautiful-dnd`, `react-localize-redux`, `react-tag-autocomplete`, `slugify`, `turndown`, `lodash.clonedeep`, `lodash.get`, `shorthash`, `raf`
- File/snapshot utilities still used in source: `mkdirp`, `ncp`, `rimraf`

### Build Toolchain Dependencies In Active Use

- Babel: `@babel/core`, `@babel/cli`, `@babel/preset-env`, `@babel/preset-react`, `babel-loader`, `babel-plugin-module-resolver`
- Legacy Babel pieces still referenced: `@babel/polyfill`, `babel-plugin-syntax-dynamic-import`, `@babel/plugin-proposal-object-rest-spread`, `babel-preset-minify`
- Webpack/CSS pipeline: `webpack`, `webpack-cli`, `webpack-dev-server`, `html-webpack-plugin`, `mini-css-extract-plugin`, `css-loader`, `postcss-loader`, `postcss-preset-env`, `sass-loader`, `node-sass`

### Test / Lint Dependencies

- Test: `jest`
- Lint: `eslint`, `eslint-config-zweitag`, `eslint-import-resolver-alias`, `eslint-plugin-react-hooks`

### Dead / Unused Dependencies Confirmed

- `extract-text-webpack-plugin`: declared, but no source references found
- `uglifyjs-webpack-plugin`: declared, but no source references found

## Failure Classification

- Native module blocker: `node-sass`
- Native toolchain detail: old `node-gyp` path requires Python 2 style tooling
- Webpack-era legacy risk: webpack 4 family, webpack-dev-server 3, old CSS loader stack, old Babel support packages
- Unrelated baseline issue: current shell may not be on Node 20 unless `.nvmrc` is activated manually

## Baseline Conclusion

Before any broader modernization, the repo is already blocked on Node 20/Linux by `node-sass`. The next migration steps should treat Sass replacement and the webpack-era toolchain as the primary recovery path, while removing confirmed dead dependencies early.
