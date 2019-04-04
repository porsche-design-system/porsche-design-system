# Installation v0 (deprecated!)

## v0 Core and v0 React 
Prior to the current version of Porsche UI Kit there are older versions available which are not longer maintained but provided for projects which still integrates them.  
We highly recommend updating to the latest version as soon as possible to get the latest components and designs.

### Authenticate for the Porsche UI Kit
@See [Authenticate for the Porsche UI Kit](#/code/installation)

### Install and use the Porsche UI Kit Core v0
Please be aware of different versions of the Porsche UI Kit Core npm package and align with your design counterpart on the used Porsche UI Kit Core version ([more about Versioning](#/general/versioning)). In general we recommend updating the npm dependencies on a regular basis. All changes are documented in the [Changelog v0 Core](https://github.com/porscheui/porsche-ui-kit/tree/0.x/core/ui-kit/CHANGELOG.md). 

Following example includes an extremely simple build function as well as a sample browser support list. Both is intended as example and may differ in your application because you might want to use Webpack, Gulp or Grunt etc. to build your application.

1. Create a new folder on your machine locally
2. Open terminal and switch to the previously created folder
3. Execute `npm init` in your terminal, it will ask you to enter name, version, description, etc. — simply press enter to all asked questions. A _package.json_ file will be created within your folder. 
4. Add _.npmrc_ next to your _package.json_ and add following content. Then, whenever you try to install a dependency by npm within the project folder it will try to get the dependency of the defined registry.
``` 
always-auth = true
registry = https://porscheui.jfrog.io/porscheui/api/npm/npm/
```
5. Execute `npm install @porsche/ui-kit-core --save` within your terminal. It will install the latest version of Porsche UI Kit within a automatically created folder _node_modules_
6. Install multiple dev-dependencies necessary for compiling the provided SCSS files of _@porsche/ui-kit-core_ by executing `npm install node-sass node-sass-tilde-importer postcss-cli autoprefixer fs-extra --save-dev`
7. Create a folder called _src_
8. Add _index.html_ to _src_-folder with following content. It makes use of some Porsche UI Kit patterns and includes _style.css_ which we'll create in a later step in this documentation.
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
```
@import '~@porsche/ui-kit-core/src/common/index.scss';
@import '~@porsche/ui-kit-core/src/base/index.scss';
@import '~@porsche/ui-kit-core/src/deprecated/index.scss';
@import '~@porsche/ui-kit-core/src/modules/pagination/pagination.scss';
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
Last 2 versions
Android >= 7
Chrome >= 48
Edge >= 15
Firefox >= 60
IE >= 11
Safari >= 10
iOS >= 10
```
12. Add _build.js_ to project root folder with following content. SCSS styles will get compiled to CSS and necessary _Porsche Next_ font family and icon set are copied to _dist_-folder.
```
'use strict';

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
  { source: 'src/index.html', target: 'dist/index.html' },
  { source: 'node_modules/@porsche/ui-kit-core/src/base/font/porsche-next-latin/', target: 'dist/porsche-next-latin/' },
  { source: 'node_modules/@porsche/ui-kit-core/src/base/font/porsche-next-cyril/', target: 'dist/porsche-next-cyril/' },
  { source: 'node_modules/@porsche/ui-kit-core/src/base/font/porsche-next-greek/', target: 'dist/porsche-next-greek/' },
  { source: 'node_modules/@porsche/ui-kit-core/src/base/font/porsche-next-pashto/', target: 'dist/porsche-next-pashto/' },
  { source: 'node_modules/@porsche/ui-kit-core/src/base/font/porsche-next-persian/', target: 'dist/porsche-next-persian/' },
  { source: 'node_modules/@porsche/ui-kit-core/src/base/font/porsche-next-urdu/', target: 'dist/porsche-next-urdu/' },
  { source: 'node_modules/@porsche/ui-kit-core/src/base/font/porsche-next-arabic/', target: 'dist/porsche-next-arabic/' },
  { source: 'node_modules/@porsche/ui-kit-core/src/deprecated/icon-font/pag-iconfont/', target: 'dist/pag-iconfont/' }
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


### Install and use the Porsche UI Kit React v0
Please be aware of different versions of the Porsche UI Kit React npm package and align with your design counterpart on the used Porsche UI Kit React React version ([more about Versioning](#/general/versioning)). In general we recommend updating the npm dependencies on a regular basis. All changes are documented in the [Changelog v0 React](https://github.com/porscheui/porsche-ui-kit/tree/0.x/react/packages/%40porsche/ui-kit-react/CHANGELOG.md). 

1. Create your React App (we recommend using **Create React App**)
2. Import necessary styles to your _index.scss_ file.
```
@import "~@porsche/ui-kit-react/src/variables";
@import "~@porsche/ui-kit-react/src/common";
@import "~@porsche/ui-kit-react/src/index";
```
3. Import and use React components as usual
