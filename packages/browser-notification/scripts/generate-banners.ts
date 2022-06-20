import * as fs from 'fs';
import * as path from 'path';
import { minifyHTML, minifyCSS, updateContent } from './utils';

const generateCssAndHtml = (): void => {
  const targetFile = path.normalize('./src/banners/banner.ts');

  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const newContent = `
  // prettier-ignore
  const css = '${minifyCSS(`
    #ID {
    position: fixed;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0 7vw;
    top: -100%;
    left: 0;
    right: 0;
    box-sizing: border-box;
    z-index: 99999;
    opacity: 0;
    transition: top 500ms ease 1000ms, opacity 500ms ease 1000ms;
  }
  
  #ID.ID--loaded {
    top: 3rem;
    opacity: 1;
  }
  
  #ID > div {
    position: relative;
    width: 100%;
    max-width: 96rem;
    margin: 0;
    padding: 1rem 3rem 1rem 1rem;
    display: flex;
    background-color: #fff5e5;
    border-top: 4px solid #ff9b00;
    box-shadow: 0 0 2.1875rem 0 #C9CACB;
  }
  
  #ID > div > svg {
    width: 3rem;
    height: 3rem;
    margin: 0;
    padding: 0;
    flex-shrink: 0;
  }
  
  #ID > div > p {
    margin: 0;
    padding: 0 1.5rem 0 1rem;
    max-width: 59.25rem;
    font-size: 1rem;
    font-family: "Porsche Next","Arial Narrow",Arial,"Heiti SC",SimHei,sans-serif;
    font-weight: normal;
    line-height: 1.5;
    color: #000;
  }
  
  #ID > div > p > a {
    margin: 0;
    padding: 0;
    color: #000;
    font-weight: bold;
    text-decoration: underline;
    white-space: nowrap;
    transition: color 0.24s ease;
  }
  
  #ID > div > p > a:hover {
    color: #d5001c;
  }
  
  #ID > div > button {
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    border-radius: 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    transition: color 0.24s ease;
  }
  
  #ID > div > button:hover {
    color: #d5001c;
  }
  
  #ID > div > button:focus {
    outline: 2px solid #00d5b9;
    outline-offset: 1px;
  }
  
  #ID > div > button > svg {
    fill: currentColor;
    margin: 0;
    padding: 0;
  }
  `)}'.replace(/ID/g, ID);
  // prettier-ignore
  const html = \`${minifyHTML(`<div>
    STYLE
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <path d="M12 3L3 21h18zm0 2.24L19.38 20H4.62z"/>
      <path d="M12.5 15l.5-5h-2l.49 5h1.01zM11 16h2v2h-2z"/>
    </svg>
    <p>
      CONTENT
    </p>
    <button type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
        <path d="M4.91 19h1.5L12 12.83 17.59 19h1.5l-6.34-7 6.34-7h-1.5L12 11.17 6.41 5h-1.5l6.34 7-6.34 7z"/>
      </svg>
    </button>
  </div>`)
    .replace('STYLE', '<style>${css}</style>')
    .replace('CONTENT', '${locales[getLang()]}')}\`;
`;

  fs.writeFileSync(targetFile, updateContent(oldContent, newContent));
};

generateCssAndHtml();
