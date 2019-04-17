# Installation

## Authenticate for the Porsche UI Kit
The instructions below requires you to have at most recent stable version of [Node JS & NPM](https://nodejs.org/) installed.

1. Request access rights by sending an email to [porsche-ui-kit@porsche.de](mailto:porsche-ui-kit@porsche.de) including your firstname, lastname, corporate email address and the project you are working for, i.e. Porsche Finder
2. After receiving the invitation email please login and change your password
3. Generate an API key under edit profile section and save the profile
4. Create **.npmrc** file on your machine locally (if there is no) and execute following command in terminal: 

```
npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/
```

5. After request please enter username, password (API key) and email. It will than add an auth key for a specific registry to your local _~/.npmrc_

## Install and use the Porsche UI Kit
Please be aware of different versions of the Porsche UI Kit npm package and align with your design counterpart on the used Porsche UI Kit version. In general we recommend updating the npm dependencies on a regular basis. All changes are documented in the Changelog. 

### Installation and using HTML/(S)CSS components
Following example includes an extremely simple build function as well as a sample browser support list. Both is intended as example and may differ in your application because you might want to use Webpack, Gulp or Grunt etc. to build your application.

* Create a new folder on your machine locally
* Open terminal and switch to the previously created folder
* Execute `npm init` in your terminal, it will ask you to enter name, version, description, etc. — simply press enter to all asked questions. A _package.json_ file will be created within your folder. 
* Add _.npmrc_ next to your _package.json_ and add following content. Then, whenever you try to install a dependency by npm within the project folder it will try to get the dependency of the defined registry.
``` 
always-auth = true
registry = https://porscheui.jfrog.io/porscheui/api/npm/npm/
```
* Execute `npm install @porsche/ui-kit-core --save` within your terminal. It will install the latest version of Porsche UI Kit within a automatically created folder _node_modules_
* Install multiple dev-dependencies necessary for compiling the provided SCSS files of _@porsche/ui-kit-core_ by executing `npm install node-sass node-sass-tilde-importer postcss-cli autoprefixer fs-extra --save-dev`
* Create a folder called _src_
* Add _index.html_ to _src_-folder with following content. It makes use of some Porsche UI Kit patterns and includes _style.css_ which we'll create in a later step in this documentation.
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hello Porsche UI Kit</title>
<link href="styles.css" rel="stylesheet">
</head>
<body>
<nav class="pagination" aria-label="Pagination">
  <span class="pagination__prev pagination__prev--disabled"></span>
  <ul class="pagination__items">
    <li class="pagination__item">
      <span class="pagination__goto pagination__goto--current" aria-label="Current page, page 1" aria-current="page">1</span>
    </li>
    <li class="pagination__item">
      <a class="pagination__goto" href="#" aria-label="Go to page 2">2</a>
    </li>
    <li class="pagination__item">
      <a class="pagination__goto" href="#" aria-label="Go to page 3">3</a>
    </li>
    <li class="pagination__item">
      <a class="pagination__goto" href="#" aria-label="Go to page 4">4</a>
    </li>
    <li class="pagination__item">
      <a class="pagination__goto" href="#" aria-label="Go to page 5">5</a>
    </li>
  </ul>
  <a class="pagination__next" href="#" aria-label="Next"></a>
</nav>
</body>
</html>
```
9. Add _styles.scss_ to _src_-folder with following content. Necessary styles are imported from _@porsche/ui-kit-core_ package.  

**Base and specific component styles**
```
// base imports
@import "~@porsche/ui-kit-core/src/styles/utility/index";
@import "~@porsche/ui-kit-core/src/styles/common/index";

// component imports
@import "~@porsche/ui-kit-core/src/components/layout/grid/grid";
@import "~@porsche/ui-kit-core/src/components/action/button/button";
...
```
10. Add _postcss.config.js_ to project root folder with following content. We need to compile SCSS to CSS and want to make use of [autoprefixer](https://github.com/postcss/autoprefixer) which is based on [postcss](https://github.com/postcss/postcss).
```
module.exports = {
  plugins: {
    autoprefixer: {}
  }
}
```
11. Add _.browserslistrc_ to project root folder with following content. Browsers we should support will be automatically considered by [autoprefixer](https://github.com/postcss/autoprefixer).
```
last 2 version
>1%
not dead
not ie < 11
not op_mini all
```
12. Add _build.js_ to project root folder with following content. SCSS styles will get compiled to CSS and necessary _Porsche Next_ font family and icon set are copied to _dist_-folder.
```
const fs = require('fs-extra');
const sass = require('node-sass');
const tildeImporter = require('node-sass-tilde-importer');
if (!fs.existsSync('dist')) fs.mkdirSync('dist');
sass.render(
  { file: 'src/styles.scss', importer: tildeImporter },
  (error, result) => {
    if (error) throw error;
    fs.writeFileSync('dist/styles.css', result.css);
  });
const items = [
  { source: 'src/index.html', target: 'dist/index.html' }
];
for (const item of items) {
  fs.copy(item.source, item.target, (error) => {
    if (error) throw error;
  });
}
```
13. Open _package.json_ file and add following content within section _scripts_. Defining executable scripts within terminal. 
```
"scripts": {
  "build": "node build.js && npm run postcss",
  "postcss": "postcss dist/styles.css --output dist/styles.css --config postcss.config.js"
}
```
14. Open terminal, switch to project root directory and execute following command. It will compile your sample application, save it to _dist_-folder and open it in your browser.
```
npm run build && open dist/index.html
```
