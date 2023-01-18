'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const theme = require('./theme-25a5ded7.js');
const textColor = require('./text-color-f242ce00.js');
const textIconStyles = require('./text-icon-styles-82be29c9.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');

const pdsFetch = (input, init) => fetch(input, init);

const ICON_SIZES = ['small', 'medium', 'large', 'inherit'];

const ICONS_MANIFEST = { "360": "360.min.5f2fcac02969bc425484fe8d80e5a1c9.svg", "accessibility": "accessibility.min.295a9d53a11c42212b8cce594982dfd2.svg", "activeCabinVentilation": "active-cabin-ventilation.min.030c46def7a7397091d920b65bc0da3c.svg", "add": "add.min.8578a2d10c79a78e398e963b506b6cb5.svg", "adjust": "adjust.min.cdb89f5c161a4c82328fe60e72a88c59.svg", "arrowDoubleDown": "arrow-double-down.min.3b17923187ef2114d1f17da042fc97ca.svg", "arrowDoubleLeft": "arrow-double-left.min.bba22e26f025c439b600bf74f0566465.svg", "arrowDoubleRight": "arrow-double-right.min.14f743d4adb5467fc0e95ac7f6426e1f.svg", "arrowDoubleUp": "arrow-double-up.min.8e3b3e31d227366f916c91dcb6e1b466.svg", "arrowDown": "arrow-down.min.84e69acc6554637cc373b8a4f50ba991.svg", "arrowFirst": "arrow-first.min.bc51317ecf4953a664870ebab5059775.svg", "arrowHeadDown": "arrow-head-down.min.454c189f4914925447670d0ae9bd2043.svg", "arrowHeadLeft": "arrow-head-left.min.aa2da7b4dbbb8a28c046592290054e94.svg", "arrowHeadRight": "arrow-head-right.min.fb602ae5cb51970770570a70287e77e9.svg", "arrowHeadUp": "arrow-head-up.min.2c282619214e4f998e1ac64a61b5545b.svg", "arrowLast": "arrow-last.min.72553c4284717d4961f8bcf8d51e0303.svg", "arrowLeft": "arrow-left.min.24e8467ef0f8f206f228a3d8d443d70b.svg", "arrowRight": "arrow-right.min.8fb7b42d2d08d60f918602aa28475c0b.svg", "arrowUp": "arrow-up.min.0bc737f7f2cc56ef65c5d33472e014b0.svg", "augmentedReality": "augmented-reality.min.290ff033e35774fd093e1ab8ed07e10f.svg", "batteryEmpty": "battery-empty.min.8594e37d3e67a95b85eb9935f02e69cf.svg", "batteryFull": "battery-full.min.4c75acb5a64a6dd3116ede7b1859a6d6.svg", "bell": "bell.min.d69dc9a220dec323e758ccbff756b5b5.svg", "bookmark": "bookmark.min.0cb177c79674593133f6d3d384c5df4b.svg", "broadcast": "broadcast.min.edbfac03d4afdc964d350f54df79c6f3.svg", "calculator": "calculator.min.2518729352d3709e488e71dcbf449247.svg", "calendar": "calendar.min.588fabe880634ece974291f5adfee50d.svg", "camera": "camera.min.10af3a4fac8c289775390534a50606d0.svg", "car": "car.min.4eeec04c87a14bb5d3d316eeeee0185b.svg", "carBattery": "car-battery.min.2a619bbd456ad531c922bf8f51b70977.svg", "card": "card.min.06394222c7ca5d6c7e783d6f86f030a6.svg", "chargingActive": "charging-active.min.915410d626a52a3a76b6bf498491c255.svg", "chargingState": "charging-state.min.c5cb87ef2808f824f352a6ebd9b9d4a9.svg", "chargingStation": "charging-station.min.211fcf0f9a9bb50b6e83482ee588dda9.svg", "chart": "chart.min.267e23c07f47784c186c5119b870df76.svg", "chat": "chat.min.a8a52d1b8b463ee0e5a3b0d812c9a40c.svg", "check": "check.min.0cb26d9a5ee1d217e5054f1ad60ae3b4.svg", "city": "city.min.a99b88b51adda8244a2c72953a2f4ab4.svg", "climate": "climate.min.5d52b2880552275d9032afc0fa2b7296.svg", "climateControl": "climate-control.min.152235d2bf2b7ec6e1a3c40e6971c446.svg", "clock": "clock.min.bcea9f182e1fe861ea6e765650f79b38.svg", "close": "close.min.eefab6ef191882058f9ed548bd5a467e.svg", "closedCaption": "closed-caption.min.b93ac43c07223fda14249d2279823f6a.svg", "co2Emission": "co2-emission.min.788590454baa0f6c52dfc99a55fe0b85.svg", "compare": "compare.min.657a924ca48bf93d200d2e6539fa8050.svg", "configurate": "configurate.min.2d137bc6f43ee03587188b571c97aacd.svg", "countryRoad": "country-road.min.3ee2c1be9d063f5d7c5772fcc7ae2568.svg", "cubicCapacity": "cubic-capacity.min.b5df863671bdf059bce19eddc2990698.svg", "delete": "delete.min.fd9788c3a0842a7bb1d737c6de1969d1.svg", "disable": "disable.min.c3d85d4ed9738c077d19e524775dbd56.svg", "document": "document.min.d2db26d7049ab2180361c7ce40f52d57.svg", "download": "download.min.d7c63bcbadf4dd5b14c3c79a438d93f3.svg", "duration": "duration.min.9405be759f64c8253076f7e55c80c336.svg", "edit": "edit.min.06bde2175fafb58233fa1ce6d3d00f83.svg", "email": "email.min.eb8ff02812a48c5098d3c40614e8d9d7.svg", "exclamation": "exclamation.min.6ca46945978bd4eb2a40dc29766b1882.svg", "external": "external.min.b804bef35446f6b3cb379c121de3f13d.svg", "filter": "filter.min.60f168332c7550dfdf714ed0507877b0.svg", "flash": "flash.min.e5a6de1239300a6104076ee67aec42ca.svg", "fuelStation": "fuel-station.min.0155159076984cccdbfe854eb4da3720.svg", "garage": "garage.min.463577e6a1ffac592b5aa7bec9a82d39.svg", "gift": "gift.min.eeb1a5871a4008bcafd9495fe11ec9bc.svg", "globe": "globe.min.50fd2c886a822673902bd106efc73c3f.svg", "grid": "grid.min.c36c5015115005dcb9c948f07af0be80.svg", "highway": "highway.min.ea773dcf33a43fa8e82beae96c1222b7.svg", "home": "home.min.2bdc01bb7c9b39fa5ef5a81c8c3f9f49.svg", "horn": "horn.min.77105eb430a033a3ffdf21f9fecd32de.svg", "image": "image.min.851c64681e1950312a934a723ca04a85.svg", "increase": "increase.min.45bfe421e86192da37c8cca4917c10c2.svg", "information": "information.min.d387e44cc786ca3df3702f429518a1d9.svg", "key": "key.min.37b5e8ff9fda430f855f4b82bfd03485.svg", "leaf": "leaf.min.ea91b1d04ade4c49640e89ade35c9d90.svg", "leather": "leather.min.ef9e664d2fc3c28171fbd3d93b079503.svg", "light": "light.min.5fa3dd77ee9c63e28614c4c7c4a6d39c.svg", "list": "list.min.ecaeee96ec6cf2f8c9028ea404113a9e.svg", "locate": "locate.min.c28bdf292bbf297eb8109a272e2ffb91.svg", "lock": "lock.min.d258c21c7217cd1342307c45ecd5176e.svg", "lockOpen": "lock-open.min.2ef427e273635e3aab7601b0fe92e86e.svg", "logoBaidu": "logo-baidu.min.a8eb57b32e616b21820d86882835fe20.svg", "logoDelicious": "logo-delicious.min.fc2927d4979ffaed1f23160091e0975e.svg", "logoDigg": "logo-digg.min.d7340b3f22cf4a22a8ac3b472c16e0e2.svg", "logoFacebook": "logo-facebook.min.0c2e020d0b61d37e76e6bab67e4d149e.svg", "logoFoursquare": "logo-foursquare.min.b2699d993d9d731892ba01874c0e023d.svg", "logoGmail": "logo-gmail.min.0c14069d86c2ba0a42c726d96f0cae9c.svg", "logoGoogle": "logo-google.min.c1f3931d74e40e5cdc875236b7e674a1.svg", "logoHatena": "logo-hatena.min.021834899da6e6f6a9dd963f4fc3337c.svg", "logoInstagram": "logo-instagram.min.2f8c578e2472dc13b2f0ec8d1b936442.svg", "logoKaixin": "logo-kaixin.min.8fb995689a3442669df37b5f375922fc.svg", "logoKakaotalk": "logo-kakaotalk.min.988146b4cd8bced103fd8b5a9be064d8.svg", "logoLinkedin": "logo-linkedin.min.e4848fd4b74404e504fd1a4d5a25b960.svg", "logoNaver": "logo-naver.min.13f97e4c3ad4898d169904caa609f2d0.svg", "logoPinterest": "logo-pinterest.min.101284bac1d7cf468719fccf416069df.svg", "logoQq": "logo-qq.min.5d89ab35e4e00e81deadaa2fe0d51a5d.svg", "logoQqShare": "logo-qq-share.min.01da8f9d6665f4529f349f88b4fb0cfc.svg", "logoReddit": "logo-reddit.min.40dd42ee1368dbc74611afee4d3c9850.svg", "logoSkyrock": "logo-skyrock.min.9440a0e4a088cdfbfcc99bc91010768a.svg", "logoSohu": "logo-sohu.min.d7a030336d712a2b44982e65071cd2bc.svg", "logoTecent": "logo-tecent.min.fd1ec329327f4cbf5706c393df66af9d.svg", "logoTelegram": "logo-telegram.min.624fca36dd6f6c5b64bce6e617372d77.svg", "logoTiktok": "logo-tiktok.min.9c5ffad4c76353afaa99feca9e4f2f0a.svg", "logoTumblr": "logo-tumblr.min.9b77d06b659cee9d5f45015c33c23967.svg", "logoTwitter": "logo-twitter.min.ac4d6b189cd2a47e4fac75bedb76b5bd.svg", "logoViber": "logo-viber.min.330fbae7d2683b7910d828cbe864f738.svg", "logoVk": "logo-vk.min.727ba204a194c8cf1b7fc389ac1db14b.svg", "logoWechat": "logo-wechat.min.0392ff30f188aa9f52480e965142474a.svg", "logoWeibo": "logo-weibo.min.3ded49004baea42d85fa6fcb9d79ccb1.svg", "logoWhatsapp": "logo-whatsapp.min.02c83d3cbde89763eee8fc3bcab02257.svg", "logoXing": "logo-xing.min.6a5f5fde119a841823d0ef05293b3454.svg", "logoYahoo": "logo-yahoo.min.622e886e777c08cf80c31dc99ca13f1a.svg", "logoYouku": "logo-youku.min.d35a5283c6d3094748f565c729f56d9f.svg", "logoYoutube": "logo-youtube.min.59c939904cbec0c7793289eb5e68cb99.svg", "logout": "logout.min.aa54756e3aec12f347fdec0a2905a232.svg", "map": "map.min.643551801bfc27a93438c30ebe1d1387.svg", "menuDotsHorizontal": "menu-dots-horizontal.min.94e0804e3a5a30a577cab6296ad8d15d.svg", "menuDotsVertical": "menu-dots-vertical.min.7ec3f5be33dd3459d7a9bed9fdbe22d3.svg", "menuLines": "menu-lines.min.30ff09f6e2ce846286dd136279636097.svg", "minus": "minus.min.00cca11ec9ce4bd913abba2059c3f10b.svg", "mobile": "mobile.min.71d3c0d7fb4349383562cc233478f7fb.svg", "moon": "moon.min.5c447b4013210e7c7723ca4b6fdbfa9f.svg", "oilCan": "oil-can.min.31978141ee5529f97833027b1e03294a.svg", "parkingBrake": "parking-brake.min.f03105e84898f1db02c6fcbdd008bfcf.svg", "parkingLight": "parking-light.min.968af68684df1220b15cff6616e8376e.svg", "pause": "pause.min.dd29b256b73311abf1549ed16fe7a47b.svg", "phone": "phone.min.e1a58c454ffe074b30a5bb16c75ff23f.svg", "pin": "pin.min.c6ce5ea394fd9cf9dca80a592e2aeae4.svg", "play": "play.min.703fb2dbebac16ea91a6524914626ae2.svg", "plug": "plug.min.02d79b2702ac5c41020b54bd9eedf523.svg", "plus": "plus.min.dd34f71292a547080b9247a72c1adda2.svg", "preheating": "preheating.min.96ccdd3d24b0634ca820dc894894a34d.svg", "printer": "printer.min.bcd50214772a8fcc1d0f0ae1205610bf.svg", "purchase": "purchase.min.70535cff1a085154ab49ab958fe91aae.svg", "question": "question.min.df469b72598d2dbfb458c46430c0690a.svg", "racingFlag": "racing-flag.min.1aee1d177d44aaaca113a8b7a81db573.svg", "refresh": "refresh.min.36ced59c8e8d06980d6ac20cca8a9057.svg", "replay": "replay.min.d4f212bf3d5f8fe166d78dba57eeacde.svg", "reset": "reset.min.e1ce71f684b6e83b9ed8182389bd407f.svg", "route": "route.min.49f1935d2a563b150bb382eb56a04972.svg", "rss": "rss.min.eaf3873673fcbff72833e7a77f9510f8.svg", "save": "save.min.6506e50ad89aee223e85fe52242c232e.svg", "screen": "screen.min.c17978f44a7bf9f7d80f178fd2b7d116.svg", "search": "search.min.f2755d61c24b6ad037f51d65588be308.svg", "send": "send.min.544f2b90e562b8582808f735846b1351.svg", "share": "share.min.b7b59aa7085cc865735acfd940480234.svg", "shoppingBag": "shopping-bag.min.9d99682e614f5bbb9760c1a0272bd1e0.svg", "shoppingCart": "shopping-cart.min.05a6c651afb21246daba2e941e8366cc.svg", "sidelights": "sidelights.min.996d591ee87247eae32968bf0b588d1e.svg", "snowflake": "snowflake.min.cf85d1b3c62e223ffb80d8c838d4f0b8.svg", "sort": "sort.min.d90a6657569305b9b09b0c6997b5b915.svg", "stack": "stack.min.d36295767f8e2540bbbf60278114ca09.svg", "star": "star.min.d7445429f599f915661e6c57841ae339.svg", "steeringWheel": "steering-wheel.min.c632bf7d06f41d68f0a95d76615f3981.svg", "stopwatch": "stopwatch.min.c90f1fde0961349fe79c0b077f7b0d41.svg", "subtract": "subtract.min.bb9f2dcb0c81ac7f216f6fe2ba916c09.svg", "success": "success.min.4401a4715549bd7dfaaa4f54684b2088.svg", "sun": "sun.min.a68eb6225965558e4498d3d38c33d52a.svg", "switch": "switch.min.ab6c8b55ab119d9bd5170a1893a75ed2.svg", "tablet": "tablet.min.60e7c4ef821bf610d2b2d5b06c7e88b7.svg", "tachometer": "tachometer.min.348f8c5eed7c61993a864ebcffee98bd.svg", "truck": "truck.min.43f91b0320003695d8804cf6a8a86da4.svg", "upload": "upload.min.cf3aaf8fb27e339d26133cbd6a5332ca.svg", "user": "user.min.0f8dcfbe34322e7968b4b23e11d963f0.svg", "userGroup": "user-group.min.87f6ca16e7174b9a8d1894283a8ff1d4.svg", "userManual": "user-manual.min.0b87e500e3d747e67be964c47a3ae312.svg", "video": "video.min.107dfd64c6fd7398dd48b94d61b2fe11.svg", "view": "view.min.cd78cae7309f44d941e9264047e3efa0.svg", "viewOff": "view-off.min.e27746517bdb4c2c9ae5f025c7e74991.svg", "volumeOff": "volume-off.min.711d24824df04d61c3129bbdcdbfa083.svg", "volumeUp": "volume-up.min.0a2ebc984c6b9d2f53c747f9ba2028f1.svg", "warning": "warning.min.04529c502dddce98f0ae2eec0bfb3432.svg", "weight": "weight.min.47ef0b98ca8ed590dd7d6e6c3f1bcd46.svg", "wifi": "wifi.min.14540859e9241374bd9d0c89eb85667b.svg", "work": "work.min.d17986d8fcff6a5fcd5e9925e838fade.svg", "wrench": "wrench.min.90e402dc170fe83de23e2c11588ba037.svg", "wrenches": "wrenches.min.990b074555825a218e86fd35397fc88c.svg", "zoomIn": "zoom-in.min.22fa9d7ee8748debc801fe910f2d3d01.svg", "zoomOut": "zoom-out.min.9408a4dc5786ed5a783a729e58ab3d6d.svg" };

/**
 * TODO: Cache is shared between tests and never cleared. Evaluate solution.
 * */
const ICON_ARIA_ATTRIBUTES = ['aria-label'];
const isUrl = (str) => (str === null || str === void 0 ? void 0 : str.length) > 0 && /(\/)/.test(str);
const DEFAULT_ICON_NAME = 'arrow-head-right';
const requestCache = new Map();
const getSvgContent = async (url) => {
  if (!url) {
    return Promise.reject('url is undefined');
  }
  let req = requestCache.get(url);
  if (req === undefined) {
    req = pdsFetch(url).then((rsp) => (rsp.ok ? rsp.text() : ''), () => '' // reject callback
    );
    requestCache.set(url, req);
  }
  return req;
};
const buildIconUrl = (iconNameOrSource = DEFAULT_ICON_NAME) => {
  const cdnBaseUrl = 'http://localhost:3001/icons';
  if (iconNameOrSource === null) {
    return buildIconUrl(DEFAULT_ICON_NAME);
  }
  else if (isUrl(iconNameOrSource)) {
    return iconNameOrSource;
  }
  else if (ICONS_MANIFEST[validateProps.paramCaseToCamelCase(iconNameOrSource)]) {
    // check if IconName exists
    return `${cdnBaseUrl}/${ICONS_MANIFEST[validateProps.paramCaseToCamelCase(iconNameOrSource)]}`;
  }
  // Only occurs if consumer is not using typescript -> necessary?
  console.warn('Please provide either an name property or a source property!');
  return buildIconUrl(DEFAULT_ICON_NAME);
};
const patchAriaIntoSVG = (content, rawAriaAttributes) => {
  if (rawAriaAttributes) {
    const ariaAttributes = a11y.parseAndGetAriaAttributes(rawAriaAttributes);
    const attributes = ['role="img"']
      .concat(Object.entries(ariaAttributes).map(([key, val]) => `${key}="${val}"`))
      .join(' ');
    return content.replace(/^(<svg)/, `$1 ${attributes}`);
  }
  else {
    return content;
  }
};

const sizeMap = {
  small: validateProps.pxToRemWithUnit(24),
  medium: validateProps.pxToRemWithUnit(36),
  large: validateProps.pxToRemWithUnit(48),
  inherit: 'inherit',
};
const getComponentCss = (color, size, theme) => {
  const dimension = sizeMap[size];
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      img: {
        filter: ['dark', 'dark-electric'].includes(theme) ? 'invert(100%)' : 'none',
      },
      svg: {
        fill: 'currentColor',
        // TODO: This is a temporary fallback for Chromium and should be removed if this bug is resolved: https://bugs.chromium.org/p/chromium/issues/detail?id=1242706
        // further information: https://melanie-richards.com/blog/currentcolor-svg-hcm/
        '@media (forced-colors: active)': {
          fill: 'canvasText',
        },
      },
    },
    root: {
      display: 'flex',
      flexShrink: 0,
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      width: dimension,
      height: dimension,
      color: textIconStyles.getThemedTextColor(theme, color),
    },
  });
};

const propTypes = {
  name: validateProps.AllowedTypes.string,
  source: validateProps.AllowedTypes.string,
  color: validateProps.AllowedTypes.oneOf(textColor.TEXT_COLORS),
  size: validateProps.AllowedTypes.oneOf(ICON_SIZES),
  lazy: validateProps.AllowedTypes.boolean,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  aria: validateProps.AllowedTypes.aria(ICON_ARIA_ATTRIBUTES),
};
const Icon = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.key = 0; // use unique random key to trick stencil cache
    this.svgContent = '';
    this.name = 'arrow-head-right';
    this.source = undefined;
    this.color = 'primary';
    this.size = 'small';
    this.lazy = false;
    this.theme = 'light';
    this.aria = undefined;
  }
  componentWillLoad() {
    this.initIntersectionObserver();
  }
  componentWillUpdate() {
    // reset old icon if there is any
    if (this.svgContent) {
      this.setIconContent('');
    }
    this.initIntersectionObserver();
  }
  componentDidRender() {
    // if icon was fetched before component was rendered
    this.setIconContent(this.svgContent);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.color, this.size, this.theme);
    return validateProps.h("i", { key: this.key++, class: "root" });
  }
  initIntersectionObserver() {
    if (this.lazy && validateProps.hasWindow) {
      // load icon once it reaches the viewport
      if (!this.intersectionObserver) {
        this.intersectionObserver = new IntersectionObserver((entries, observer) => {
          if (entries[0].isIntersecting) {
            // is in viewport
            observer.unobserve(this.host);
            this.loadIcon();
          }
        }, { rootMargin: '50px' });
      }
      this.intersectionObserver.observe(this.host);
    }
    else {
      this.loadIcon();
    }
  }
  loadIcon() {
    const url = buildIconUrl(this.source || this.name);
    getSvgContent(url).then((iconContent) => {
      // check if response matches current icon source
      if (url === buildIconUrl(this.source || this.name)) {
        this.setIconContent(iconContent);
      }
    });
  }
  setIconContent(content) {
    this.svgContent = content;
    const el = validateProps.getShadowRootHTMLElement(this.host, 'i');
    // manipulating the DOM directly, to prevent unnecessary stencil lifecycles
    if (el) {
      el.innerHTML = patchAriaIntoSVG(content, this.aria);
    }
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_icon = Icon;
