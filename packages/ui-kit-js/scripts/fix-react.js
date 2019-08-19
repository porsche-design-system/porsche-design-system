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
   * TODO: remove temporary bugfix for ie11 compatibility
   */
  const fixedDefineCustomElements = `
(async () => {
  await applyPolyfills();
  await defineCustomElements(window);
})();
  `;
  const fixedImports = `import { applyPolyfills, defineCustomElements } from '@porscheui/ui-kit-js/loader';`;
  const result = data.replace(/^defineCustomElements\(window\);$/gm, fixedDefineCustomElements)
    .replace(/^import { defineCustomElements } from '@porscheui\/ui-kit-js\/loader';$/gm, fixedImports);

  fs.writeFile(target, result, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});
