import { stripFocusAndHoverStyles } from '../../../src/stripFocusAndHoverStyles';

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
  {
    input: `
label {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: flex-start;
}
@media(hover:hover) {
  ::slotted(input:hover), .text:hover ~ ::slotted(input) {
    border-color: #010205 !important;
  }
  ::slotted(input:checked:hover), .text:hover ~ ::slotted(input:checked) {
    border-color: #535457 !important;
    background-color: #535457 !important;
  }
@media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  ::slotted(input:checked:hover), .text:hover ~ ::slotted(input:checked) {
    transition: unset !important;
  }
  ::slotted(input:hover), .text:hover ~ ::slotted(input) {
    transition: unset !important;
  }
}

}

.text {
  grid-area: 1 / 2;
  cursor: pointer;
  font: normal normal 400 1rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;
  overflow-wrap: break-word;
  hyphens: auto;
  color: #010205;
  transition: color var(--p-transition-duration, .24s) ease;
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  padding-top: 2px;
  padding-inline-start: 8px;
}
`,
    result: `
label {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: flex-start;
}

.text {
  grid-area: 1 / 2;
  cursor: pointer;
  font: normal normal 400 1rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;
  overflow-wrap: break-word;
  hyphens: auto;
  color: #010205;
  transition: color var(--p-transition-duration, .24s) ease;
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  padding-top: 2px;
  padding-inline-start: 8px;
}
`,
  },
])('should correctly remove :hover and :focus styles: %j', ({ input, result }) => {
  expect(stripFocusAndHoverStyles(input)).toEqual(result);
});
