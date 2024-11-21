import * as fs from 'fs';
import type { Fallbacks } from './utils';
import { FALLBACKS, minifyCSS, minifyHTML, updateContent } from './utils';

const generateOverlayCssAndHtml = (fallback: Fallbacks): void => {
  const isBrowser = fallback === 'browser-support';
  const targetFile = `./src/${fallback}/${fallback}.ts`;

  const bgImg = `url("data:image/jpeg;base64,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")`;

  const oldContent = fs.readFileSync(targetFile, 'utf8');

  const browserOverlayMarkup =
    "<p>${content.replace(/<br>/g,'<br class=show--at-768-ilb>')}</p><div class=show--at-768>${[chrome, firefox, edge].join('')}</div>";

  const defaultOverlayMarkup = '<p>${content}</p>';

  const newContent = `
const lang = document.getElementsByTagName('html')[0].getAttribute('lang')?.slice(0, 2) as Lang;
const locale = lang in locales ? lang : 'en';

const { title, content } = locales[locale];
// biome-ignore format: auto generated
const htmlMarkup = \`<h2>\${title}</h2>${isBrowser ? browserOverlayMarkup : defaultOverlayMarkup}\`;

// biome-ignore format: auto generated
const css = \`${minifyCSS(`
  #ID {
    position: fixed;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 1rem 7vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    z-index: 999999;
    background: #fff;
  }

  #ID > div {
    position: relative;
    width: 100%;
    max-width: 96rem;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1rem;
    font-family: 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;
    font-weight: normal;
    line-height: calc(6px + 2.125ex);
    color: #000;
  }

  #ID > div svg {
    width: 5rem;
    height: 5rem;
    margin: 0 0 .5rem;
    padding: 0;
    fill: #ff9b00;
  }

  #ID > div h2 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    line-height: calc(6px + 2.125ex);
  }

  #ID > div > p {
    margin: .5rem 0 0;
    max-width: 59.25rem;
    width: 100%;
  }

${
  isBrowser
    ? `
  #ID > div a {
    margin: 0;
    padding: 0;
    color: #000;
    font-weight: bold;
    text-decoration: underline;
    white-space: nowrap;
    transition: color 0.24s ease;
  }

  #ID > div a:hover {
    color: #d5001c;
  }`
    : ''
}


  #ID .show--at-768,
  #ID .show--at-768-ilb { display: none; }

  @media only screen and (min-width: 768px) {
    #ID .show--at-768 { display: block; }
    #ID .show--at-768-ilb { display: inline-block; }

    #ID > div > svg {
      width: 8.5rem;
      height: 8.5rem;
      margin: 0 0 1rem;
    }

    #ID > div > h2 {
      font-size: 3rem;
      line-height: calc(6px + 2.125ex);
    }

    #ID > div > div {
      margin: 2rem 0 0;
    }
   ${
     isBrowser
       ? `
    #ID > div > div a {
      display: inline-block;
      margin: 0 0 0 4rem;
      font-weight: normal;
    }

    #ID > div > div a:first-child {
      margin: 0;
    }

    #ID > div > div a::before {
      content: '';
      display: block;
      height: 100px;
      width: 100px;
      background: BG_IMG 0 0;
      background-size: 300px 100px;
      margin: 0 auto 1rem;
    }

    #ID > div > div a:nth-child(3)::before {
      background-position: -100px 0;
    }

    #ID > div > div a:nth-child(2)::before {
      background-position: -200px 0;
    }`
       : ''
   }
  }
  `).replace('BG_IMG', bgImg)}\`.replace(/#ID/g, \`#$\{ID}\`);
// biome-ignore format: auto generated
const html = \`${minifyHTML(`<div>
  STYLE
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" focusable="false" aria-hidden="true">
    <path d="M12 3L3 21h18zm0 2.24L19.38 20H4.62z"/>
    <path d="M12.5 15l.5-5h-2l.49 5h1.01zM11 16h2v2h-2z"/>
  </svg>
  CONTENT
</div>`)
    .replace('STYLE', '<style>${css}</style>')
    .replace('CONTENT', '${htmlMarkup}')}\`;

const bodyMarkup = document.createElement('div');
bodyMarkup.id = ID;
bodyMarkup.innerHTML = html;
document.body.appendChild(bodyMarkup);

document.body.style.overflow = 'hidden';
`;

  fs.writeFileSync(targetFile, updateContent(oldContent, newContent));
};

FALLBACKS.forEach((fallback) => generateOverlayCssAndHtml(fallback));
