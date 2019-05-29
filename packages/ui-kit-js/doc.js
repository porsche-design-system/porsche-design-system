const fs = require('fs');
const path = require('path');

function getFilesInDirectory(dir, suffix, files=[]) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      let subpath = dir.replace(/\/$/, '') + '/' + file;

      if (fs.statSync(subpath).isDirectory()) {
        getFilesInDirectory(subpath, suffix, files);
      } else if (subpath.endsWith(suffix)) {
        files.push(subpath);
      }
    });
  }

  return files;
}

function updateDependencyPaths(data) {
  return data.replace(/\(\.\.\/\.\.\/(.*?)\)/g, '(#/$1)');
}

function removeGraph(data) {
  return data.replace(/### Graph.*/gs, '');
}

for (const file of getFilesInDirectory('./src/components/', 'readme.md')) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    //fs.writeFile(file, removeGraph(data), 'utf8', (err) => {
    //  if (err) throw err;
    //});
    const dir = path.dirname(file);
    const basename = dir.split('/')[dir.split('/').length-1];
    fs.writeFile(`${dir}/${basename}.prop.mdx`, removeGraph(updateDependencyPaths(data)), 'utf8', (err) => {
      if (err) throw err;
    });
  });
}
