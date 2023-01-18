'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');

const MARQUES_MANIFEST = { "porscheMarqueTrademark": { "medium": { "1x": { "png": "porsche-marque-trademark.medium.min.da075315857e239ff46bf4c150648ff0@1x.png", "webp": "porsche-marque-trademark.medium.min.5c6af9aa7946fea34f60c8f8c95d0188@1x.webp" }, "2x": { "png": "porsche-marque-trademark.medium.min.aa801f42028b1c385a5e26ae115da598@2x.png", "webp": "porsche-marque-trademark.medium.min.fff6e9b91481cc5b1fc6c9b62987ccaf@2x.webp" }, "3x": { "png": "porsche-marque-trademark.medium.min.824818d15eaf445f50e0a2391613f214@3x.png", "webp": "porsche-marque-trademark.medium.min.f67092ff6b5f4ecb4add73d6ae153db0@3x.webp" } }, "small": { "1x": { "png": "porsche-marque-trademark.small.min.020244b41a29323e2a7932a264514cdf@1x.png", "webp": "porsche-marque-trademark.small.min.783639706bead66b2d56e3b8b64bd61f@1x.webp" }, "2x": { "png": "porsche-marque-trademark.small.min.92184fae44511ceda8320443c17110b1@2x.png", "webp": "porsche-marque-trademark.small.min.760a57efa93d4e7e16e26128ec7ead46@2x.webp" }, "3x": { "png": "porsche-marque-trademark.small.min.fd545cea4298f5d797246d5805711646@3x.png", "webp": "porsche-marque-trademark.small.min.1726036a7829347e1e24d1eb54fc0d64@3x.webp" } } }, "porscheMarque": { "medium": { "1x": { "png": "porsche-marque.medium.min.a98627440b05154565f9f9dfc1ad6187@1x.png", "webp": "porsche-marque.medium.min.fa908e4dfdc5536b0e933e1670d20e1f@1x.webp" }, "2x": { "png": "porsche-marque.medium.min.089d6dd560fff7a2bf613ae6d528990e@2x.png", "webp": "porsche-marque.medium.min.7f0893dc57f2607a2cb0b817d96cb985@2x.webp" }, "3x": { "png": "porsche-marque.medium.min.2cb874345ef290831c929f6caabfeef8@3x.png", "webp": "porsche-marque.medium.min.3534cf066b4e2e737dca62de495f9616@3x.webp" } }, "small": { "1x": { "png": "porsche-marque.small.min.ac2042736af5512cf547c89fa7924c4f@1x.png", "webp": "porsche-marque.small.min.005debed5bf72cf0a9a791b1521f5e1d@1x.webp" }, "2x": { "png": "porsche-marque.small.min.22f1e9dc90399d9a5287eda689b60dba@2x.png", "webp": "porsche-marque.small.min.df4317325d04ffef28c7839aa6d499a0@2x.webp" }, "3x": { "png": "porsche-marque.small.min.49209245f04eadef8817b9bbae80d3e1@3x.png", "webp": "porsche-marque.small.min.cfd6149aaa3bc5b3b522538e5f650890@3x.webp" } } } };

const MARQUE_SIZES = ['responsive', 'small', 'medium'];
const cdnBaseUrl = 'http://localhost:3001/marque';
const getInnerManifest = (trademark) => MARQUES_MANIFEST[`porscheMarque${trademark ? 'Trademark' : ''}`];
const buildSrcSet = (innerManifest, size, format) => 
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
Object.entries(innerManifest[size])
  .map(([resolution, fileName]) => `${cdnBaseUrl}/${fileName[format]} ${resolution}`)
  .join();
const MARQUE_ARIA_ATTRIBUTES = ['aria-label'];

const baseSizes = {
  small: {
    width: '100px',
    height: '60px',
  },
  medium: {
    width: '120px',
    height: '72px',
  },
};
const getComponentCss = (size) => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-flex',
        verticalAlign: 'top',
        outline: validateProps.addImportantToRule(0),
      },
      a: Object.assign({ display: 'block', textDecoration: 'none' }, validateProps.getFocusJssStyle({ color: validateProps.getThemedColors('light').primaryColor, offset: 0, pseudo: '::before' })),
      picture: Object.assign({ display: 'block' }, (size === 'responsive'
        ? Object.assign(Object.assign({}, baseSizes.small), { [validateProps.getMediaQueryMin('l')]: baseSizes.medium }) : baseSizes[size])),
      img: {
        display: 'block',
        width: '100%',
        height: 'auto',
      },
    },
  });
};

const propTypes = {
  trademark: validateProps.AllowedTypes.boolean,
  size: validateProps.AllowedTypes.oneOf(MARQUE_SIZES),
  href: validateProps.AllowedTypes.string,
  target: validateProps.AllowedTypes.string,
  aria: validateProps.AllowedTypes.aria(MARQUE_ARIA_ATTRIBUTES),
};
const Marque = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.trademark = true;
    this.size = 'responsive';
    this.href = undefined;
    this.target = '_self';
    this.aria = undefined;
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.size);
    const innerManifest = getInnerManifest(this.trademark);
    const mediumMedia = `(min-width: ${validateProps.breakpoint.l})`;
    const picture = (validateProps.h("picture", null, this.size === 'responsive'
      ? [
        validateProps.h("source", { key: "medium-webp", srcSet: buildSrcSet(innerManifest, 'medium', 'webp'), media: mediumMedia, type: "image/webp" }),
        validateProps.h("source", { key: "medium-png", srcSet: buildSrcSet(innerManifest, 'medium', 'png'), media: mediumMedia, type: "image/png" }),
        validateProps.h("source", { key: "small-webp", srcSet: buildSrcSet(innerManifest, 'small', 'webp'), type: "image/webp" }),
        validateProps.h("source", { key: "small-png", srcSet: buildSrcSet(innerManifest, 'small', 'png'), type: "image/png" }),
      ]
      : [
        validateProps.h("source", { key: "webp", srcSet: buildSrcSet(innerManifest, this.size, 'webp'), type: "image/webp" }),
        validateProps.h("source", { key: "png", srcSet: buildSrcSet(innerManifest, this.size, 'png'), type: "image/png" }),
      ], validateProps.h("img", { src: `${cdnBaseUrl}/${innerManifest.medium['2x'].png}`, alt: "Porsche" })));
    return (validateProps.h(validateProps.Host, null, this.href === undefined ? (picture) : (validateProps.h("a", Object.assign({ href: this.href, target: this.target }, a11y.parseAndGetAriaAttributes(this.aria)), picture))));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_marque = Marque;
