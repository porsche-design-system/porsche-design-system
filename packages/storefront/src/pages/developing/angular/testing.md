# Angular

<TableOfContents></TableOfContents>

## Testing with Karma

To enable the [`getInitialStyles()`](partials/initial-styles) partial within your Karma tests, add the following code to
your `karma.conf`.

```tsx
// yarn add --dev glob

<!-- karma.conf -->
const path = require('path');
const fs = require('fs');
const { globSync } = require('glob');
const transformIndexHtml = require('./scripts/transformIndexHtml');

const injectPartialsIntoKarmaContextHtml = () => {
  const packagePath = path.resolve(require.resolve('@angular-devkit/build-angular'), '..');
  const [contextHtml] = globSync(packagePath + '/**/karma-context.html');
  const backupFilePath = contextHtml.replace(/\\.html$/, '-original$&');

// restore backup
  if (fs.existsSync(backupFilePath)) {
    fs.copyFileSync(backupFilePath, contextHtml);
    fs.rmSync(backupFilePath);
  }

  fs.copyFileSync(contextHtml, backupFilePath); // create backup
  const fileContent = fs.readFileSync(contextHtml, 'utf8');
  const modifiedFileContent = transformIndexHtml({}, fileContent);
  fs.writeFileSync(contextHtml, modifiedFileContent);
};

injectPartialsIntoKarmaContextHtml();

...
```
