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
    <menu-toggle>
      <template shadowroot="open">
        <button>
          <slot></slot>
        </button>
      </template>
      Open Menu
    </menu-toggle>

    <!-- ${getDSRPonyfill()} -->
    <!-- <script type="text/javascript">porscheDesignSystem.load();</script> -->
  </body>
</html>`;

  await page.setContent(pageContent, { waitUntil: 'networkidle' });

  const hasTemplateTag = page.evaluate(() => !!document.querySelector('template'));
  expect(hasTemplateTag).toBe(true);
});
