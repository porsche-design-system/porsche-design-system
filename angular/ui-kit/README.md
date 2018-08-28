# Porsche UI-Kit for Angular

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

* Be sure that dependencies are installed via `npm install`.
* Run `npm run build` for a local development build or `npm run build:prod` for a releasable production build. 
* __Important__ for production builds is to be shure that when importing form a `index.ts` file the file is always included in the import path, otherwise the angular ahead of time compiler will break when the library is used in a project

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Link ui-kit-angular local

Run `ng build` to create dist folder.
Go into dist folder and run `npm pack`.
The packaged .tgz file will be available in the root of the dist folder.
Copy path to .tgz and run `npm i` in the application where u want to use it.
