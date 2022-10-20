import { stripFocusAndHoverStyles } from '../../../projects/react-ssr-wrapper/src/stripFocusAndHoverStyles';

it.each<{ input: string; result: string }>([
  {
    input: `
:host {
  display: inline-flex;
  vertical-align: top;
  outline: 0 !important;
}`,
    result: `
:host {
  display: inline-flex;
  vertical-align: top;
  outline: 0 !important;
}`,
  },
  {
    input: `
.root {
  display: flex;
  width: 100%;
  min-width: 3rem;
}
.root::-moz-focus-inner {
  border: 0;
}
.root:focus {
  outline-color: currentColor;
}
.root:focus:not(:focus-visible) {
  outline-color: transparent;
}`,
    result: `
.root {
  display: flex;
  width: 100%;
  min-width: 3rem;
}
.root::-moz-focus-inner {
  border: 0;
}`,
  },
  {
    input: `
.root {
  display: flex;
  width: 100%;
}
@media(hover:hover) {
  .root:hover, .root:active {
    color: #c4001a;
  }
}`,
    result: `
.root {
  display: flex;
  width: 100%;
}`,
  },
  {
    input: `
::slotted(input:disabled) {
  border-color: #96989a !important;
  cursor: not-allowed !important;
}
::slotted(input:focus) {
  outline-color: #626669 !important;
}
::slotted(input:focus:not(:focus-visible)) {
  outline-color: transparent !important;
}
@media(hover:hover) {
  ::slotted(input:not(:disabled):hover), .label:hover ~ ::slotted(input:not(:disabled)) {
    border-color: #000 !important;
  }
}`,
    result: `
::slotted(input:disabled) {
  border-color: #96989a !important;
  cursor: not-allowed !important;
}`,
  },
])('should correctly remove :hover and :focus styles: %j', ({ input, result }) => {
  expect(stripFocusAndHoverStyles(input)).toEqual(result);
});
