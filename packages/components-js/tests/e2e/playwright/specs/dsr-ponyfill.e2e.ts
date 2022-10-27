import { expect, test } from '@playwright/test';
import { getDSRPonyfill } from '@porsche-design-system/components-js/partials';

test.describe('should transform dsr template into shadowRoot', async () => {
  const pageContent = `<!DOCTYPE html>
<html>
  <head>
    <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
    <script type="text/javascript" src="http://localhost:8575/index.js"></script>
  </head>
  <body>
    <p-button>
      <template shadowroot="open">
        <button>
          <slot></slot>
        </button>
      </template>
      Open Menu
    </p-button>


    <!-- ${getDSRPonyfill()} -->
    <!-- <script type="text/javascript">porscheDesignSystem.load();</script> -->
  </body>
</html>`;

  await page.setContent(pageContent, { waitUntil: 'networkidle' });

  const hasTemplateTag = page.evaluate(() => !!document.querySelector('template'));
  expect(hasTemplateTag).toBe(true);

  // TODO: check initial dsr ponyfill working (template tag is gone and shadowRoot initialized)
  // TODO: check component hydration (no errors, style[jss] selectors and/or hover or prop change)
  // TODO: add client rendered component by adding p-button initially without template and check it's alive
});
