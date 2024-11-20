import * as fs from 'node:fs';
import * as path from 'node:path';

const injectPartials = require('./injectPartials.js');

const indexHtmlPath = path.join(__dirname, '../dist/demo-app/index.html');

fs.readFile(indexHtmlPath, 'utf-8', (err, indexHtml) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  const updatedIndexHtml = injectPartials({}, indexHtml);

  fs.writeFile(indexHtmlPath, updatedIndexHtml, 'utf-8', (err) => {
    if (err) {
      console.error('Error injecting partials into index.html:', err);
    } else {
      console.log('Partials injected into index.html successfully.');
    }
  });
});
