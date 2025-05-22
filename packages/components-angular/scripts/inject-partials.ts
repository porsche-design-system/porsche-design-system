import * as fs from 'node:fs';
import * as path from 'node:path';

const injectPartials = require('./injectPartials.js');

const indexHtmlPath = path.join(__dirname, '../dist/demo-app/browser/index.html');

fs.readFile(indexHtmlPath, 'utf-8', (err, indexHtml) => {
  if (err) {
    throw new Error('Error reading index.html:', err);
  }

  const updatedIndexHtml = injectPartials({}, indexHtml);

  fs.writeFile(indexHtmlPath, updatedIndexHtml, 'utf-8', (err) => {
    if (err) {
      throw new Error('Error injecting partials into index.html:', err);
    }
    console.log('Partials injected into index.html successfully.');
  });
});
