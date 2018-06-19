"use strict";
const symlinkOrCopySync = require('symlink-or-copy').sync;
const fs = require('fs');

console.log('Beginning Pattern Lab Node Gulp postinstall...');

if (!fs.existsSync('./node_modules/plugin-node-sass-dependency-collector')) {
  console.log('Symlinking "./node_modules/@porsche/plugin-node-sass-dependency-collector" to "./node_modules/plugin-node-sass-dependency-collector" so Patternlab can find it');
  symlinkOrCopySync('./node_modules/@porsche/plugin-node-sass-dependency-collector', './node_modules/plugin-node-sass-dependency-collector');
  console.log('Symlink done');
}

//call the core library postinstall
var patternlab = require('patternlab-node/core/scripts/postinstall');
