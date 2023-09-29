# Angular

<TableOfContents></TableOfContents>

# Test the application

**Jest** uses **jsdom** and supports ShadowDOM since Version 12.2.0.  
However, it doesn't support JavaScript modules as described in this
[issue](https://github.com/jsdom/jsdom/issues/2475).  
Also, it doesn't support `CSSStyleSheet.replace()`, `Intersection Observer`, `Element.prototype.scrollTo` and others.

As a workaround we provide a polyfill as part of the `@porsche-design-system/components-angular` package.

To apply the polyfill, simply import it in your **setupTest.{js|ts}** file.

**Note:** If your test includes Porsche Design System components, make sure to import the PorscheDesignSystemModule in
every module you want to use the components.

### Setup file

```tsx
// setupTest.{js|ts}

import '@porsche-design-system/components-angular/jsdom-polyfill';
```

### Example component

```tsx
// single-component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { TabsBarUpdateEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'single-component',
  template: `
    <p-tabs-bar [activeTabIndex]="tabIndex" (update)="onUpdate($event)">
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </p-tabs-bar>
    <div data-testid="debug">Active Tab: { tabIndex + 1 } </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SingleComponent {
  tabIndex: number = 0;

  onUpdate(e: CustomEvent<TabsBarUpdateEvent>) {
    this.tabIndex = e.detail.activeTabIndex;
  }
}
```

### Test example component

```tsx
// single-component.test.ts

import { componentsReady } from '@porsche-design-system/components-angular';
import { render } from '@testing-library/angular';
import '@porsche-design-system/components-angular/jsdom-polyfill';

it('should render Tabs Bar from Porsche Design System and use its events', async () => {
  const { getByTestId } = await render(SingleComponent);
  await componentsReady();

  const debug = getByTestId('debug');
  const button1 = getByTestId('button1');
  const button2 = getByTestId('button2');
  const button3 = getByTestId('button3');

  expect(debug.innerHTML).toBe('Active Tab: 1');

  await userEvent.click(button2);
  expect(debug.innerHTML).toBe('Active Tab: 2');

  await userEvent.click(button3);
  expect(debug.innerHTML).toBe('Active Tab: 3');

  await userEvent.click(button1);
  expect(debug.innerHTML).toBe('Active Tab: 1');
});
```

## Testing with Karma

Since the [`getInitialStyles()`](partials/initial-styles) partial is mandatory for using Porsche Design System, the
partial also needs to be included within test environments. With help of `@angular-builders/custom-webpack` and
`indexTransform` the partial can be injected into `index.html`. See [`getInitialStyles()`](partials/initial-styles) for
a manual how to integrate the partial within `build` and `serve` environment. Since Karma does not render the
`index.html`, but instead renders `karma-context.html` the transformation of `index.html` is not applicable for testing
with `Karma`. There are different approaches to inject the partial into `karma-context.html`:

- transformation with `post-install`,
- `karma.conf.js` property
  [customContextFile](http://karma-runner.github.io/6.4/config/configuration-file.html#customcontextfile) (In our case
  the property had no effect, so it might be deprecated),
- Transform within `karma.conf.js`:

```tsx
// yarn add --dev glob

<!-- karma.conf.js -->
const path = require('path');
const fs = require('fs');
const { globSync } = require('glob');
const transformIndexHtml = require('./scripts/transformIndexHtml');

const injectPartialsIntoKarmaContextHtml = () => {
  const packagePath = path.resolve(require.resolve('@angular-devkit/build-angular'), '..');
  const [filePath] = globby.sync(packagePath + '/**/karma-context.html');
  const backupFilePath = filePath.replace(/\.html$/, '-original$&');

  // restore backup
  if (fs.existsSync(backupFilePath)) {
    fs.copyFileSync(backupFilePath, filePath);
    fs.rmSync(backupFilePath);
  }

  fs.copyFileSync(filePath, backupFilePath); // create backup
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const modifiedFileContent = transformIndexHtml({}, fileContent);
  fs.writeFileSync(filePath, modifiedFileContent);
};

injectPartialsIntoKarmaContextHtml();

...
```

We also provide test examples in our
[sample integration project](https://github.com/porsche-design-system/sample-integration-angular/tree/master/src/app/pages).
