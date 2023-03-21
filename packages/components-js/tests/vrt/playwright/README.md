# Playwright - known bugs

As discovered, in some cases playwright ignores `filter: xxx` css, which means it's working in Safari and it looks
normally with `headless: false`, but it's not visible (not applied) on screenshots.

Steps to reproduce it:

1. Set `headless: false` in playwright config
2. Do `await page.waitForTimeout(5000);` in `executeVisualRegressionTest` in `playwright-helper.ts`, so that page is not
   being closed right away, only after 5 seconds
3. In some vrt test do:

```
<style>
  .myelement {
    height: 300px;
    background: red;
    -webkit-backdrop-filter: blur(1px);
    transform: translate3d(0, 0, 0);
    filter: invert(100%);
  }
</style>
<div class="myelement"></div>
```

4. Start vrt test:

In `components-js` do:

```
yarn test:vrt:playwright sometestname
```

5. Safari will be opened and you'll see the blue element (because red gets blue when applying `invert(100%)` filter)
6. Check results (screenshot): you'll see the red element on the screenshot (because the filter is not applied)
7. If you remove `-webkit-backdrop-filter` and `transform` - it will start working:

```
<style>
  .myelement {
    height: 300px;
    background: red;
    filter: invert(100%);
  }
</style>
<div class="myelement"></div>
```

You'll see now blue screenshot as a result.

Note: don't forget to remove `results` folder before you start test, otherwise sometimes Playwright caches the result.
