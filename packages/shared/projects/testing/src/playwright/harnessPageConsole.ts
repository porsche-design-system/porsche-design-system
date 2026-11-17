// these harness pages set prose as value of a date, time or number input
const invalidInputValue = [
  /^The specified value "(?:Without label and description|Responsive label and description|Lorem ipsum dolor sit amet, consetetur sadipscing elitr,)" /,
];

// messages a harness page under components-js src/pages logs on purpose, by page name
export const harnessPageConsole: Record<string, RegExp[]> = {
  'button-pure': [
    /combination of properties icon='none' and loading='true' for component p-button-pure is not supported/,
  ],
  display: [/component p-display is deprecated and will be removed with next major release/],
  'input-date': invalidInputValue,
  'input-month': invalidInputValue,
  'input-number': invalidInputValue,
  'input-time': invalidInputValue,
  'input-week': invalidInputValue,
  'link-tile-product': [/status of 404 \(Not Found\) http:\/\/localhost:8575\/nonexistent\.png$/],
  // modal-footer-scrolled.html renders a p-modal without heading, aria or header slot
  modal: [/aria prop or header slot has to be set for component p-modal/],
  'overview-components': [/component p-display is deprecated and will be removed with next major release/],
};
