# Porsche UI Kit Core

## Usage

As a Porsche UI Kit Core __consumer__: the SASS files of Porsche UI Kit Core should be included into your project. Therefore, `@porsche/ui-kit-core` should be a dependency, depending on the framework you use to run and build your project.

You can use the handlebar templates directly or copy the generated HTML of the pattern(s) into your project.  One big drawback of this is that you have to handle updating the patterns on your own.

As a Porsche UI Kit Core __developer__: please see `CONTRIBUTING.md` file for development information.

## Pattern inspection

The Porsche UI Kit "Docs" are public accessible on this URL: https://myporsche.github.io/pouikit-porsche-ui-kit/master/

If you want to inspect patterns of a different branch, replace `master` with the desired branch name. 
All branches are deployed automatically once they're pushed to the repo.

## Local installation

Be sure that your project is configured to be able to install npm packages from My Porsche Artifactory account.  
Check out the project, install dependencies and run it:
```
> git clone git@github.com:myporsche/pouikit-porsche-ui-kit.git
> cd ./core/ui-kit
> npm install
> npm start
```

## Test Patterns
### Visual Regression Test

Make sure application is running, then run test.
```
> cd ./core/ui-kit
> npm install
> npm start
> npm run vrt
```

## Update npm dependencies

Switch to UI Kit directory and execute update script.
```
> cd ./core/ui-kit
> npm run upgrade-interactive
```
Select all desired packages that should be updated with `space` and press `enter`. 
Make sure application is running and execute visual regression tests.
```
> npm start
> npm run vrt
```
