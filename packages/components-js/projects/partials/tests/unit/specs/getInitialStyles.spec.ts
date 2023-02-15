import { getInitialStyles } from '../../../src';
import { render } from '@testing-library/react';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';

const filteredTagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));
const tagNames = filteredTagNames.join();
const prefixedTagNames = filteredTagNames.map((x) => `custom-prefix-${x}`).join();

// to skip validation
jest.mock('../../../src/shared');

const normalizeCss = `*{font-family:'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;line-height:calc(6px + 2.125ex);text-size-adjust:none;-webkit-text-size-adjust:none}p{hyphens:auto;font-weight:400;overflow-wrap:break-word}h1,h2,h3,h4,h5,h6{font-weight:400}a{color:inherit;border-color:transparent;border-radius:4px;text-decoration:underline}b,strong{font-weight:700}em,i{font-style:normal}a,button{outline:0;position:relative}a:focus::before,button:focus::before{top:-4px;left:-4px;right:-4px;border:2px solid #0A0AFF;bottom:-4px;content:\"\";position:absolute;border-radius:8px}a:focus:not(:focus-visible)::before,button:focus:not(:focus-visible)::before{border:0}a:disabled:focus::before,button:disabled:focus::before{border:0}button:focus::before{top:-6px;left:-6px;right:-6px;bottom:-6px}[data-theme=dark] a:focus::before,[data-theme=dark] button:focus::before{border:2px solid #0A0AFF}[data-theme=dark] a:disabled:focus::before,[data-theme=dark] button:disabled:focus::before{border:0}input,select,textarea{outline:2px solid transparent;outline-offset:4px}input:focus,select:focus,textarea:focus{border-radius:4px;outline-color:#0A0AFF}input:focus:not(:focus-visible),select:focus:not(:focus-visible),textarea:focus:not(:focus-visible){outline-color:transparent}[data-theme=dark] input:focus,[data-theme=dark] select:focus,[data-theme=dark] textarea:focus{outline-color:#0A0AFF}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button,input[type=search]::-webkit-search-decoration{appearance:none;-webkit-appearance:none}input[type=search]::-webkit-search-cancel-button{display:none}input::-webkit-calendar-picker-indicator{filter:invert(3%) sepia(7%) saturate(2930%) hue-rotate(188deg) brightness(91%) contrast(103%)}[data-theme=dark] input::-webkit-calendar-picker-indicator{filter:invert(97%) sepia(55%) saturate(2840%) hue-rotate(180deg) brightness(114%) contrast(103%)}input::-webkit-calendar-picker-indicator:hover{cursor:pointer}input::-webkit-datetime-edit{display:block;padding:0}[data-theme=dark] input::-webkit-datetime-edit{-webkit-text-fill-color:#FBFCFF}@media(hover:hover){a{transition:color var(--p-transition-duration,.24s) ease}a:hover{backdrop-filter:blur(32px);background-color:rgba(148,149,152,0.20);-webkit-backdrop-filter:blur(32px)}[data-theme=dark] a:hover{background-color:rgba(126,127,130,0.20)}}`;

describe('format: html', () => {
  it('should return core styles', () => {
    const result = getInitialStyles();
    expect(result).toBe(
      `<style data-pds-initial-styles>${tagNames}{visibility:hidden}.hydrated,.ssr{visibility:inherit}${normalizeCss}</style>`
    );
  });

  it('should add custom prefixes to component names', () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).toBe(
      `<style data-pds-initial-styles-custom-prefix>${prefixedTagNames}{visibility:hidden}.hydrated,.ssr{visibility:inherit}${normalizeCss}</style>`
    );
  });
});

describe('format: jsx', () => {
  it('should return core styles', () => {
    const { container } = render(getInitialStyles({ format: 'jsx' }));
    expect(container.innerHTML).toBe(
      `<style data-pds-initial-styles="">${tagNames}{visibility:hidden}.hydrated,.ssr{visibility:inherit}${normalizeCss}</style>`
    );
  });

  it('should add custom prefix to component names', () => {
    const { container } = render(getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' }));
    expect(container.innerHTML).toBe(
      `<style data-pds-initial-styles-custom-prefix="">${prefixedTagNames}{visibility:hidden}.hydrated,.ssr{visibility:inherit}${normalizeCss}</style>`
    );
  });
});

describe('withoutTags: true', () => {
  it('should return core styles without style tag', () => {
    const result = getInitialStyles({ withoutTags: true });
    expect(result).toBe(`${tagNames}{visibility:hidden}.hydrated,.ssr{visibility:inherit}${normalizeCss}`);
  });
});
