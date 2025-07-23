# Dependencies

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

## webpack

UXPin publishing deactivated since newer webpack version causes this error (5.91.0 still worked):

```
ERROR: ERROR in designsystemlibrary.js
designsystemlibrary.js from Terser plugin
"i" is redeclared [designsystemlibrary.js:5109,8]
```

---

## @arethetypeswrong/core

Currently fixed to `0.15.1` since it's causing the `packages/components-js/tests/smoke/unit/specs/package.smoke.ts` test
to hang in the pipeline.
