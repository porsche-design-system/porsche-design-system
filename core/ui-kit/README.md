# Porsche UI Kit Core

## Usage

_TODO: describe ideal usage_

As a project developer: the SASS files of Porsche UI Kit Core should be included into your project. Therefore, @porsche/ui-kit-core should be a dependency, depending on the framework you use to run and build your project.

You can use the handlebar templates directly or copy the generated HTML of the pattern(s) into your project.  One big drawback of this is that you have to handle updating the patterns on your own.

As a Porsche UI Kit Core developer: please see `CONTRIBUTING.md` file for development information.

## Pattern inspection

### (Internal) public installation

The pattern lab is running on this URL: https://myporsche.github.io/pouikit-porsche-ui-kit/master/

If you want to inspect patterns of a different branch, replace `master` with the desired branch name. 
All branches are deployed automatically once they're pushed to the repo.

### Local installation

Check out the project, install dependencies and run it:
```
> git clone git@bitbucket.org:porschedev/porsche-ui-kit.git
> cd ./core/ui-kit
> npm install
> npm start
```

# Test Patterns
## Visual Regression Test

Make sure application is running, then run test.
```
> cd ./core/ui-kit
> npm install
> npm start
> npm run vrt
```

# Update npm dependencies

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

## Development guide

Please refer to `CONTRIBUTING.md` file for development information.
