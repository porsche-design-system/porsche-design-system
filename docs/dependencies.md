# Dependencies

## Dependency updates

Every week, we update our NPM packages:

1. Switch to **project root directory**
2. Run `npx npm-check-updates -i`
3. Angular has to be updated with `ng update`.
4. `cd packages/components-angular`
5. `./node_modules/.bin/ng update`
6. `./node_modules/.bin/ng update @angular/cli @angular/core`
7. Check `MAX_TS_VERSION` in `packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js`
   which indicates whether `typescript` can be updated for Angular packages or not.
8. Run `npm install`

### Hints for updating

1. Make sure you pulled the latest version before starting.
2. To avoid corrupting the `package-lock.json` start with Angular (by using `ng update`). The following upgrades should
   be grouped e.g. if React types can be upgraded also look if React can be upgraded.
3. Don't upgrade too many dependencies at once, keep them logically together.
4. Certain dependencies can not be upgraded which are documented in `docs/dependencies.md`
5. In case you discover new dependencies that can not be upgraded, e.g. due to esm builds not compatible with nodejs,
   add them to the list
6. Update `docs/dependencies.md` to reflect the current date and adjust framework versions if needed
7. Once you updated everything possible, delete `package-lock.json` and have it created again by running `npm install`
   in order to update dependencies of our dependencies

We are using Dependabot to manage our dependencies. Every note about not updatable dependencies in this document is also
reflected in the configuration file under `.github/dependabot.yml` and must be kept in sync!

## Overview of Framework Versions

|         | Monorepo | Sample Integrations   |
| ------- | -------- | --------------------- |
| Angular | 20.1.2   | 19.0.5                |
| React   | 19.1.0   | 19.0.0                |
| Next.js | 15.1.3   | 15.1.4 (React 19.0.0) |

---

## Jest & JSDom

Causing lots of problems with the `jsdom-polyfill` package.

- `jest`
- `jest-environment-jsdom`
- `jsdom`
- `@types/jest`

## Globby (components-angular/components-manager-cli)

`globby` decided to provide just a modern _ESM_ build with their latest npm package. Unfortunately there's no stable way
of using it with Jest / Angular Karma.

- [Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm)
- [ESM support: soliciting feedback](https://github.com/TypeStrong/ts-node/issues/1007)

### Affected dependencies:

- `globby`

---

## Change Case

Since v5.0.0 `change-case` decided to provide just a modern _ESM_ build with their latest npm package. Unfortunately
there's no stable way of using it with Node or TS-Node.

### Affected dependencies:

- `change-case`

---

## @types/scheduler

Is currently fixed to "0.16.8" because of typing error:

```
../../node_modules/@types/react/index.d.ts:9:53 - error TS2307: Cannot find module 'scheduler/tracing' or its corresponding type declarations.
9 import { Interaction as SchedulerInteraction } from "scheduler/tracing";
```

---

## @arethetypeswrong/core

Currently fixed to `0.15.1` since it's causing the `packages/components-js/tests/smoke/unit/specs/package.smoke.ts` test
to hang in the pipeline.
