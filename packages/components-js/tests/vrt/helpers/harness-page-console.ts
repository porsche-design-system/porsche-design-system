// messages a harness page under src/pages logs on purpose, by page name
export const harnessPageConsole: Record<string, RegExp[]> = {
  'button-pure': [
    /combination of properties icon='none' and loading='true' for component p-button-pure is not supported/,
  ],
  'link-tile-product': [/status of 404 \(Not Found\) http:\/\/localhost:8575\/nonexistent\.png$/],
  // modal-footer-scrolled.html renders a p-modal without heading, aria or header slot
  modal: [/aria prop or header slot has to be set for component p-modal/],
  'overview-components': [/component p-display is deprecated and will be removed with next major release/],
};
