# Playwright - known bugs

## Ignoring css filter

As discovered, in some cases playwright ignores `filter: xxx` css, which means it's working in Safari and it looks good
with `headless: false`, but it's not visible (not applied) on screenshots.

### Steps to reproduce

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

_Note_: don't forget to remove `results` folder before you start test, otherwise sometimes Playwright caches the result.

### Pre-conditions

This bug happens in one of the following known scenarios. CSS `filter` property doesn't take plase on screenshots, if
one of the following conditions is met:

1. `-webkit-backdrop-filter` or `transform` is applied to the element
2. `-webkit-backdrop-filter` or `transform` is applied to some previous element inside the same DOM parent
3. `-webkit-backdrop-filter` or `transform` is applied to some previous element inside the same Shadow DOM of some other
   element
4. `-webkit-backdrop-filter` or `transform` is applied to some children of the element or to elements in Shadow DOM of
   children of the element

**But:** If `-webkit-backdrop-filter` or `transform` is applied to parent element - then the bug is not reproducible.

### List of examples in project

Curently we have the following examples where screenshot is not correct (css filter is not applied):

- Table: icons in table head are not visible for `dark` theme, because we have `-webkit-backdrop-filter` inside of
  `scroller` (being used by table) and `transform` inside of table head cell.
