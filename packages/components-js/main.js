import './style.scss';

import { load, componentsReady } from '@porsche-design-system/components-js';

const getPage = () => window.location.pathname.substring(1);
const getTheme = () => new URL(document.location).searchParams.get('theme') || 'light';
const getDir = () => new URL(document.location).searchParams.get('dir') || 'ltr';
const getScale = () => new URL(document.location).searchParams.get('scale') || '100';
const getTransition = () => new URL(document.location).searchParams.get('transition') || 'none';
const getAnimation = () => new URL(document.location).searchParams.get('animation') || 'none';
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
    if (opts.scale) {
      url.searchParams.set('scale', opts.scale);
    }
    if (opts.transition) {
      url.searchParams.set('transition', opts.transition);
    }
    if (opts.animation) {
      url.searchParams.set('animation', opts.animation);
    }
    history.pushState(null, '', url);
  }

  const app = document.getElementById('app');
  const controls = document.getElementById('controls');

  const page = getPage();
  if (page) {
    const theme = getTheme();
    const dir = getDir();
    const scale = getScale();
    const transition = getTransition();
    const animation = getAnimation();
    const directory = page.match(/^[a-z-]+-example/) ? 'examples' : 'pages';
    document.querySelector('html').setAttribute('dir', dir);
    document.querySelector('html').style.fontSize = `${scale}%`;

    if (isPageLoadedInIFrame()) {
      controls.innerHTML = '';
    }

    const style = `<style>
      :root {
        --p-transition-duration: ${transition === 'transitioned' ? 'initial' : '0s'};
        --p-animation-duration: ${animation === 'animated' ? 'initial' : '0s'};
      }
    </style>`;

    const template =
      style +
      (await import(`./src/${directory}/${page}.html?raw`)).default
        .replace(/>(\s)*</g, '><') // trim whitespace between tags
        .replace(
          /(<iframe.*?src=".*?\?iframe=true).*?(".*?>)/g,
          `$1&theme=${theme}&dir=${dir}&scale=${scale}&transition=${transition}&animation=${animation}$2`
        )
        .replace(
          /(<(?:my-prefix-)?p-[a-z-]+[\S\s]*?)>/g, // tweak components
          (m, g1) =>
            g1.includes('theme') ? g1.replace(/theme="[a-z]+"/, `theme="${theme}"`) : `${g1} theme="${theme}">`
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
  window.porscheDesignSystem.componentsReady = componentsReady;
  window.porscheDesignSystem.waitForComponentsReadyWithinIFrames = async () => {
    return await Promise.all(
      Array.from(document.querySelectorAll('iframe')).map(async (iframe) => {
        // we have to wait for the iframe to load before we can continue
        await new Promise((resolve) => iframe.addEventListener('load', resolve));
        // since `window.porscheDesignSystem.componentsReady` is inlined JavaScript in the `<head>` it's available now,
        // but it takes some time to inject and process the HTML template as well as to bootstrap PDS, so that componentsReady() is able to find PDS components
        const waitForComponentsReady = (resolve) =>
          setTimeout(
            () =>
              iframe.contentWindow.porscheDesignSystem
                .componentsReady()
                .then((r) => (r > 0 ? resolve(r) : waitForComponentsReady(resolve))),
            0
          );

        return new Promise((resolve) => waitForComponentsReady(resolve));
      })
    );
  };

  if (!isPageLoadedInIFrame()) {
    updateSelect('page', getPage());
    updateSelect('theme', getTheme());
    updateSelect('dir', getDir());
    updateSelect('scale', getScale());
    updateSelect('transition', getTransition());
    updateSelect('animation', getAnimation());

    document.querySelector('select#page').addEventListener('change', async (e) => {
      await updateRoute({ pathname: e.srcElement.value });
    });

    document.querySelector('select#theme').addEventListener('change', async (e) => {
      await updateRoute({ theme: e.srcElement.value });
    });

    document.querySelector('select#dir').addEventListener('change', async (e) => {
      await updateRoute({ dir: e.srcElement.value });
    });

    document.querySelector('select#scale').addEventListener('change', async (e) => {
      await updateRoute({ scale: e.srcElement.value });
    });

    document.querySelector('select#transition').addEventListener('change', async (e) => {
      await updateRoute({ transition: e.srcElement.value });
    });

    document.querySelector('select#animation').addEventListener('change', async (e) => {
      await updateRoute({ animation: e.srcElement.value });
    });
  }

  await updateRoute();
})();
