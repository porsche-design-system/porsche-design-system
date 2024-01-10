import { minifyCss } from '../../../src/minifyCss';

it.each<{ input: string; result: string }>([
  {
    input: `
:host {
  display: inline-flex;
  vertical-align: top;
  outline: 0 !important;
}`,
    result: ':host{display:inline-flex;vertical-align:top;outline:0 !important}',
  },
  {
    input: `
:host {
  display: inline-flex;
  vertical-align: top;
  outline: 0 !important;
}
span {
  display: block;
  width: 1px;
  color: rgba(255,255,255,0.55);
  font: normal normal 400 1rem/1.5 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
  overflow-wrap: break-word;
  hyphens: auto;
  height: 1px;
  margin: 0 0 0 -1px;
  overflow: hidden;
  text-indent: -1px;
}`,
    result:
      ":host{display:inline-flex;vertical-align:top;outline:0 !important}span{display:block;width:1px;color:rgba(255,255,255,0.55);font:normal normal 400 1rem/1.5 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;text-size-adjust:none;-webkit-text-size-adjust:none;overflow-wrap:break-word;hyphens:auto;height:1px;margin:0 0 0 -1px;overflow:hidden;text-indent:-1px}",
  },
  {
    input: `
:host {
  display: inline-flex;
  vertical-align: top;
  outline: 0 !important;
}
@media(min-width:480px) {
  span {
    width: 100%;
    height: auto;
    margin: 0;
    overflow: visible;
    text-indent: 0;
  }
}

@media(min-width:760px) {
  span {
    width: 1px;
    height: 1px;
    margin: 0 0 0 -1px;
    overflow: hidden;
    text-indent: -1px;
  }
}`,
    result:
      ':host{display:inline-flex;vertical-align:top;outline:0 !important}@media(min-width:480px){span{width:100%;height:auto;margin:0;overflow:visible;text-indent:0}}@media(min-width:760px){span{width:1px;height:1px;margin:0 0 0 -1px;overflow:hidden;text-indent:-1px}}',
  },
  {
    input: `
.root {
  display: flex;
  width: 100%;
  min-width: 3rem;
  min-height: 3rem;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 1px solid transparent;
  appearance: none;
  cursor: not-allowed;
  text-decoration: none;
  text-align: left;
  border: 1px solid currentColor;
  background-color: currentColor;
  color: #7c7f81;
  transition: background-color var(--p-transition-duration, .24s) ease,border-color var(--p-transition-duration, .24s) ease,color var(--p-transition-duration, .24s) ease;
  outline-offset: 2px;
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
    result:
      '.root{display:flex;width:100%;min-width:3rem;min-height:3rem;position:relative;margin:0;padding:0;box-sizing:border-box;outline:1px solid transparent;appearance:none;cursor:not-allowed;text-decoration:none;text-align:left;border:1px solid currentColor;background-color:currentColor;color:#7c7f81;transition:background-color var(--p-transition-duration,.24s) ease,border-color var(--p-transition-duration,.24s) ease,color var(--p-transition-duration,.24s) ease;outline-offset:2px}.root::-moz-focus-inner{border:0}.root:focus{outline-color:currentColor}.root:focus:not(:focus-visible){outline-color:transparent}',
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
    result: '.root{display:flex;width:100%}@media(hover:hover){.root:hover,.root:active{color:#c4001a}}',
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
    result:
      '::slotted(input:disabled){border-color:#96989a !important;cursor:not-allowed !important}::slotted(input:focus){outline-color:#626669 !important}::slotted(input:focus:not(:focus-visible)){outline-color:transparent !important}@media(hover:hover){::slotted(input:not(:disabled):hover),.label:hover~::slotted(input:not(:disabled)){border-color:#000 !important}}',
  },
  {
    input: `
@media(max-width:759px) {
  li.ellip-start + li:not(.current), li.current-1, li.current\\+1, li.current\\+1 + li:not(.ellip) {
    display: none;
  }
}`,
    result:
      '@media(max-width:759px){li.ellip-start + li:not(.current),li.current-1,li.current\\+1,li.current\\+1 + li:not(.ellip){display:none}}',
  },
])('should correctly minify: %j', ({ input, result }) => {
  expect(minifyCss(input)).toEqual(result);
});
