import './style.scss';

const getPage = () => window.location.pathname.substring(1);
const getTheme = () => new URL(document.location).searchParams.get('theme') || 'light';
const getDir = () => new URL(document.location).searchParams.get('dir') || 'ltr';

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

  const page = getPage();
  if (page) {
    const theme = getTheme();
    const dir = getDir();
    const directory = page.match(/^[a-z-]+-example/) ? 'examples' : 'pages';
    document.querySelector('html').setAttribute('dir', dir);

    app.innerHTML = '';
    app.innerHTML = (await import(`./src/${directory}/${page}.html?raw`)).default
      .replace(/>(\s)*</g, '><') // trim whitespace between tags
      .replace(
        /(<(?:my-prefix-)?p-[a-z-]+[\S\s]*?)>/g, // tweak components
        (m, g1) => (g1.includes('theme') ? g1.replace(/theme="[a-z]+"/, `theme="${theme}"`) : `${g1} theme="${theme}">`)
      )
      .replace(/(?<!\.)(playground)(?!--)(?: light| dark)?/g, `$1 ${theme}`); // tweak playgrounds, some pages include a "." before or a "--" after the "playground" thus we exclude them

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

porscheDesignSystem.load();
porscheDesignSystem.load({ prefix: 'my-prefix' }); // used on overview page
window.componentsReady = porscheDesignSystem.componentsReady; // for vrt

updateSelect('page', getPage());
updateSelect('theme', getTheme());
updateSelect('dir', getDir());
updateRoute();

document.querySelector('select#page').addEventListener('change', (e) => {
  updateRoute({ pathname: e.srcElement.value });
});

document.querySelector('select#theme').addEventListener('change', (e) => {
  updateRoute({ theme: e.srcElement.value });
});

document.querySelector('select#dir').addEventListener('change', (e) => {
  updateRoute({ dir: e.srcElement.value });
});
