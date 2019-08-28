const fs = require('fs');
const path = require('path');

/**
 * temporary bugfixes for react wrapper
 */

const target = path.resolve(__dirname, '../../ui-kit-react/projects/ui-kit-wrapper/src/lib/components.ts');
fs.readFile(target, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  /**
   * TODO: remove temporary bugfix promise resolve
   */
  const fixedDefineCustomElements = `
(async () => {
  await defineCustomElements(window);
})();
  `;
  const result = data.replace(/^defineCustomElements\(window\);$/gm, fixedDefineCustomElements);

  fs.writeFile(target, result, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});
