# Node 20 Revival Plan

## How To Use This File

This plan is segmented so one agent can be pointed at one task at a time.

- Run tasks in order unless a later task explicitly says it can start independently.
- Each task includes scope, concrete steps, and completion criteria.
- Do not start broad React/CMS library migrations unless a later decision explicitly expands scope.

## Target Outcome

Revive this project so it installs, builds, lints, tests, and runs on modern Linux with `Node 20 LTS`.

## Global Constraints

- Preserve CLI behavior for `sissi-core dev` and `sissi-core start`.
- Preserve exports from `src/index.js`.
- Prefer the path of least resistance over broad modernization.
- Do not migrate the CMS to CSS Modules in this effort.
- Keep the current React/CMS architecture unless a task explicitly says otherwise.
- If the package is republished, treat the new Node engine floor as a semver-major change.

## Key Decisions Already Made

- Target runtime: `Node 20 LTS`
- Compatibility posture: local revival first
- Styling path: replace `node-sass` with `sass`, keep SCSS and global stylesheet architecture
- Phase 1 scope: platform/tooling revival, not a CMS rewrite

## Task 1: Establish The Baseline

### Goal

Create a verified baseline of the current repo state before changing dependencies.

### Scope

- Inspect package scripts and current toolchain behavior.
- Confirm what fails on modern Linux/Node.
- Capture the current dependency categories: runtime, build, test, dead/unused.

### Steps

1. Run `node -v` and confirm Node 20 is being used for the work.
2. Run a clean install attempt and record hard failures.
3. Run `npm run build`, `npm test`, and `npm run lint` if install succeeds enough to do so.
4. Record which failures are caused by native modules, webpack-era incompatibilities, or unrelated issues.
5. Confirm that the repo root does not include a local fixture project with `.sissi`, `config.json`, `content.json`, and `structure.json`.

### Expected Findings

- `node-sass` is the main modern Linux / Node blocker.
- The webpack 4 toolchain is old enough that it should be upgraded as one unit.
- Several dependencies are legacy but not immediate blockers.

### Done When

- There is a short baseline note or issue summary for later tasks.
- The next agent can say exactly what is broken before any edits begin.

## Task 2: Remove Dead And Low-Risk Dependencies

### Goal

Reduce dependency noise before the main toolchain migration.

### Scope

- Remove packages that are unused or trivially replaceable.
- Keep behavior the same.

### Packages To Remove

- `extract-text-webpack-plugin`
- `uglifyjs-webpack-plugin`

### Packages To Replace With Built-ins

- `body-parser` in `src/api/index.js`
- `mkdirp` in `src/commands/snapshot.js`
- `ncp` in `src/commands/snapshot.js`
- `rimraf` in `src/commands/snapshot.js`

### Steps

1. Remove the unused webpack plugins from `package.json`.
2. Replace `bodyParser.json()` with `express.json()`.
3. Replace recursive directory creation with `fs.mkdirSync(..., { recursive: true })`.
4. Replace directory removal with modern `fs.rmSync(..., { recursive: true, force: true })`.
5. Replace `ncp`-based copying with modern Node copy APIs or a very small local copy helper.
6. Update tests only if behavior changes are exposed there.

### Done When

- The removed packages no longer appear in code or manifests.
- Server and snapshot behavior stay equivalent.

## Task 3: Replace Node Sass Without Reworking Styles

### Goal

Eliminate the native Sass blocker with minimal application change.

### Scope

- Replace `node-sass` with `sass`.
- Keep the existing SCSS files, imports, and global stylesheet structure.
- Do not introduce CSS Modules.

### Why This Is The Chosen Path

- The CMS currently imports one global stylesheet from `src/cms/index.js`.
- The component tree uses many hard-coded global class names.
- Converting to CSS Modules would spread effort across many components for little platform benefit.

### Steps

1. Remove `node-sass` from dependencies.
2. Add `sass`.
3. Update `sass-loader` as part of the webpack toolchain work, not separately.
4. Verify that all existing SCSS compiles under Dart Sass.
5. If Sass syntax differences appear, patch the SCSS rather than changing the styling model.

### Done When

- Install no longer requires native `node-gyp` compilation for Sass.
- CMS styles compile successfully with Dart Sass.

## Task 4: Migrate The Webpack Toolchain As One Unit

### Goal

Move the build pipeline from the webpack 4 era to a Node 20-compatible setup with minimal bundle behavior changes.

### Scope

- Upgrade the webpack family together.
- Keep output shape and CLI semantics stable.

### Packages In This Migration

- `webpack`
- `webpack-cli`
- `webpack-dev-server`
- `html-webpack-plugin`
- `mini-css-extract-plugin`
- `css-loader`
- `postcss-loader`
- `postcss-preset-env`
- `sass-loader`

### Files To Update

- `src/config/webpack.js`
- `src/commands/webpack.js`

### Steps

1. Upgrade the webpack package set to mutually compatible current versions.
2. Update `output.libraryTarget` to webpack 5 library config.
3. Replace `devServer.contentBase` with `devServer.static`.
4. Correct the source map setting from `source-maps` to `source-map`.
5. Adjust loader/plugin options that changed shape between webpack 4 and 5.
6. Update dev-server startup code in `src/commands/webpack.js` to the current API.
7. Keep generated asset names and CMS serving behavior unchanged unless forced by the new API.

### Done When

- `npm run build:cms` succeeds on Node 20.
- Development startup still returns the CMS URL and serves the frontend as before.

## Task 5: Modernize Babel Only As Much As Needed

### Goal

Remove deprecated Babel/runtime baggage while preserving the current source layout.

### Scope

- Keep Babel in place for now.
- Retarget it to modern Node and remove obsolete pieces.

### Packages/Features To Revisit

- `@babel/polyfill`
- `babel-preset-minify`
- `babel-plugin-syntax-dynamic-import`
- `@babel/plugin-proposal-object-rest-spread`

### Files To Update

- `bin/run`
- `babel.config.js`
- `package.json`

### Steps

1. Remove the `@babel/polyfill` bootstrap from `bin/run`.
2. Set Babel targets explicitly for `Node 20`.
3. Remove proposal/polyfill plugins that are obsolete for the repo’s current syntax and target.
4. Keep alias resolution in place.
5. Verify core build output still works for both library and CMS paths.

### Done When

- The project no longer depends on deprecated Babel polyfill behavior.
- `npm run build:core` succeeds with the simplified Babel config.

## Task 6: Set Supported Runtime Policy

### Goal

Make the new support target explicit.

### Scope

- Update package metadata only.

### Steps

1. Add an `engines.node` floor of `>=20` in `package.json`.
2. Update README language if it implies compatibility with much older Node versions.
3. If release notes are tracked, note that this is a Node support floor change.

### Done When

- The package metadata states the supported Node baseline.

## Task 7: Verify End-To-End Behavior

### Goal

Prove the updated toolchain works, not just that dependencies resolve.

### Scope

- Validate install, build, lint, test, and basic runtime behavior.
- Use a temporary fixture project if needed.

### Steps

1. Regenerate `package-lock.json` with the modern dependency graph.
2. Run `npm install`.
3. Run `npm run lint`.
4. Run `npm test`.
5. Run `npm run build`.
6. Create or point the repo at a minimal temporary fixture project containing:
   - `.sissi`
   - `config.json`
   - `content.json`
   - `structure.json`
7. Run the equivalent of:
   - `node bin/run dev`
   - `node bin/run start`
8. Confirm the CMS server starts and the snapshot/build flow completes.

### Done When

- All validation commands pass on Node 20 Linux.
- CLI smoke tests succeed against a minimal fixture project.

## Task 8: Deferred Work, Not Part Of The Revival Pass

### Goal

Record the work that should not be pulled into the first upgrade unless scope changes.

### Leave Alone In Phase 1

- `react`
- `react-dom`
- `react-router`
- `react-router-dom`
- `redux`
- `react-redux`
- `reselect`
- `redux-form`
- `redux-first-router`
- `react-localize-redux`
- `react-beautiful-dnd`
- `inscrybmde`
- `react-tag-autocomplete`
- `react-autocomplete`
- `marked`
- `turndown`
- `passport`
- `passport-jwt`
- `jsonwebtoken`
- `express-fileupload`
- `shorthash`
- `slugify`

### Why Deferred

- They are not the primary Linux compatibility blockers.
- Several are deeply coupled to the CMS store, routing, form state, and editor behavior.
- Upgrading them now would turn a platform recovery effort into an application migration.

### Candidate Phase 2 Work

1. Replace archived `react-beautiful-dnd`.
2. Reassess `redux-form` and `react-localize-redux`.
3. Consider broader React/router modernization only after the project is stable on Node 20.

## Acceptance Checklist

- `node-sass` is gone.
- The webpack toolchain is on a modern compatible set.
- Dead webpack-era packages are removed.
- Deprecated Babel polyfill usage is removed.
- The package declares Node 20 support.
- `npm install`, `npm run build`, `npm run lint`, and `npm test` pass on modern Linux.
- CLI smoke tests work with a minimal fixture project.

## Suggested Agent Handoff Prompts

### Prompt For Task 2

Remove dead and low-risk dependencies per `docs/node20-revival-plan.md`, Task 2 only. Do not start webpack or React ecosystem migrations.

### Prompt For Task 3

Execute Task 3 in `docs/node20-revival-plan.md`: replace `node-sass` with `sass` without changing the styling architecture or introducing CSS Modules.

### Prompt For Task 4

Execute Task 4 in `docs/node20-revival-plan.md`: migrate the webpack toolchain as one coordinated change while preserving CLI behavior and output shape.

### Prompt For Task 5

Execute Task 5 in `docs/node20-revival-plan.md`: simplify Babel for Node 20 and remove deprecated polyfill-era behavior without broad source rewrites.

### Prompt For Task 7

Execute Task 7 in `docs/node20-revival-plan.md`: verify the full upgraded stack on Node 20 Linux, including fixture-based CLI smoke tests.
