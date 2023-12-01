import './style.scss';

import { load, componentsReady } from '@porsche-design-system/components-js';

const getPage = () => window.location.pathname.substring(1);
const getTheme = () => new URL(document.location).searchParams.get('theme') || 'light';
const getDir = () => new URL(document.location).searchParams.get('dir') || 'ltr';
const getIFrame = () => new URL(document.location).searchParams.get('iframe') || 'false';

const isPageLoadedInIFrame = () => getIFrame() === 'true';

const updateRoute = async (opts) => {
  if (opts) {
    const url = new URL(location);
    if (opts.pathname) {
      url.pathname = opts.pathname;
    }
    if (opts.theme) {
      url.searchParams.set('theme', opts.theme);
    }
    if (opts.dir) {
      url.searchParams.set('dir', opts.dir);
    }
    history.pushState(null, '', url);
  }

  const app = document.getElementById('app');
  const controls = document.getElementById('controls');

  const page = getPage();
  if (page) {
    const theme = getTheme();
    const dir = getDir();
    const directory = page.match(/^[a-z-]+-example/) ? 'examples' : 'pages';
    document.querySelector('html').setAttribute('dir', dir);

    if (isPageLoadedInIFrame()) {
      controls.innerHTML = '';
    }

    const template = (await import(`./src/${directory}/${page}.html?raw`)).default
      .replace(/>(\s)*</g, '><') // trim whitespace between tags
      .replace(/(<iframe.*?src=".*?\?iframe=true).*?(".*?>)/g, `$1&theme=${getTheme()}&dir=${getDir()}$2`)
      .replace(
        /(<(?:my-prefix-)?p-[a-z-]+[\S\s]*?)>/g, // tweak components
        (m, g1) => (g1.includes('theme') ? g1.replace(/theme="[a-z]+"/, `theme="${theme}"`) : `${g1} theme="${theme}">`)
      )
      .replace(/(?<!\.)(playground)(?!--)(?: light| dark)?/g, `$1 ${theme}`); // tweak playgrounds, some pages include a "." before or a "--" after the "playground" thus we exclude them

    app.innerHTML = '';
    app.innerHTML = template;

    const scripts = app.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      eval(scripts[i].innerText); // execute scripts inserted via innerHTML
    }
  }
};

const updateSelect = (id, value) => {
  if (id && value) {
    Array.from(document.querySelectorAll(`#${id} option`)).filter((e) => e.value === value)[0].selected = true;
  }
};

(async () => {
  load({ prefix: 'my-prefix' }); // used on overview page
  window.componentsReady = componentsReady; // for vrt

  if (!isPageLoadedInIFrame()) {
    updateSelect('page', getPage());
    updateSelect('theme', getTheme());
    updateSelect('dir', getDir());

    document.querySelector('select#page').addEventListener('change', async (e) => {
      await updateRoute({ pathname: e.srcElement.value });
    });

    document.querySelector('select#theme').addEventListener('change', async (e) => {
      await updateRoute({ theme: e.srcElement.value });
    });

    document.querySelector('select#dir').addEventListener('change', async (e) => {
      await updateRoute({ dir: e.srcElement.value });
    });
  }

  await updateRoute();
})();
