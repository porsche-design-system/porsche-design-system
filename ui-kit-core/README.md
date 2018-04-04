# Porsche UI Kit Core

## Usage

_TODO: describe ideal usage_

As a project developer: the SASS files of Porsche Stylesheets should be included into your project. Therefore, Porsche Stylesheets should be a dependency, depending on the framework you use to run and build your project.

You can use the handlebar templates directly or copy the generated HTML of the pattern(s) into your project.  One big drawback of this is that you have to handle updating the patterns on your own.

As a Porsche Stylesheets developer: please see `CONTRIBUTING.md` file for development information.

## Pattern inspection

### (Internal) public installation

The pattern lab is running on this URL: https://pcc-portal-e-ct.emea.porsche.biz/static/patternlab/origin/master/

If you want to inspect patterns of a different branch, replace `master` with the desired branch name.  All branches are deployed automatically once they're pushed to the repo.

### Local installation

Check out the project, install and run it:

```
> git checkout ssh://git@bitbucket.web.porsche.biz:2222/pcccom/porsche-stylesheets.git
> npm install
> npm start
```

## Development guide

Please refer to `CONTRIBUTING.md` file for development information.
