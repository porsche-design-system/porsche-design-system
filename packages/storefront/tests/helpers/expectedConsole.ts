/**
 * Console errors and warnings a page is expected to log, by url. A pattern is tested against the message text
 * followed by its source url, so a 404 can be expected for one file only. Each entry says why.
 */
export const expectedConsoleByUrl: Record<string, RegExp[]> = {
  // The page documents the deprecated p-display component.
  '/components/display/configurator/': [/component p-display is deprecated/],
  '/components/display/examples/': [/component p-display is deprecated/],
  // TODO Code example previews load images relative to the page. Remove once #4800 resolves them in toPreview.
  '/components/button-tile/examples/': [/status of 404 .*\/assets\/lights\.jpg$/],
  '/components/link-tile/examples/': [/status of 404 .*\/assets\/lights\.jpg$/],
  '/components/multi-select/examples/': [
    /status of 404 .*\/assets\/(718|911|cayenne|macan|panamera|taycan)\.png$/,
    // The root layout preloads component chunks. Chrome warns for each one unused a few seconds after load.
    /was preloaded using link preload but not used within a few seconds/,
  ],
  '/components/table/examples/': [
    /status of 404 .*\/assets\/(718|911|macan|panamera|taycan)\.png$/,
    /was preloaded using link preload but not used within a few seconds/,
  ],
  // The framed examples preload their component chunks. Chrome warns for each one unused a few seconds after load.
  '/patterns/feedback/': [/was preloaded using link preload but not used within a few seconds/],
  '/patterns/footer/': [/was preloaded using link preload but not used within a few seconds/],
  '/patterns/forms/': [/was preloaded using link preload but not used within a few seconds/],
  '/patterns/header/': [/was preloaded using link preload but not used within a few seconds/],
  '/patterns/popover/': [/was preloaded using link preload but not used within a few seconds/],
  '/templates/admin-panel/': [/was preloaded using link preload but not used within a few seconds/],
  '/templates/landing-page/': [/was preloaded using link preload but not used within a few seconds/],
};
