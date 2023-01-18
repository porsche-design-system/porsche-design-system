'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const fontWeightStyles = require('./font-weight-styles-cee9f15d.js');
const textIconStyles = require('./text-icon-styles-82be29c9.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const linkUtils = require('./link-utils-ea33fbd4.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');

const aspectRatioPaddingTop = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};
const getGradientBackground = (isCompact, isTopAligned) => {
  const gradient = 'rgba(31,31,31,0.9) 0%,' +
    'rgba(31,31,31,0.9) 20%,' +
    'rgba(31,31,31,0.852589) 26.67%,' +
    'rgba(32,32,32,0.768225) 33.33%,' +
    'rgba(33,33,33,0.668116) 40%,' +
    'rgba(34,34,34,0.557309) 46.67%,' +
    'rgba(35,35,35,0.442691) 53.33%,' +
    'rgba(36,36,36,0.331884) 60%,' +
    'rgba(37,37,37,0.231775) 66.67%,' +
    'rgba(38,38,38,0.147411) 73.33%,' +
    'rgba(39,39,39,0.0816599) 80%,' +
    'rgba(39,39,39,0.03551) 86.67%,' +
    'rgba(39,39,39,0.0086472) 93.33%,' +
    'rgba(39,39,39,0)';
  return isCompact && isTopAligned
    ? `linear-gradient(${gradient} 100%);`
    : `linear-gradient(to top, ${gradient} 100%);`;
};
const sizeMap = {
  inherit: {
    fontSize: 'inherit',
  },
  default: { fontSize: '1.25rem' },
};
const getComponentCss = (aspectRatio, size, weight, align, compact, hasGradient) => {
  const isTopAligned = align === 'top';
  const paddingSizeXS = validateProps.pxToRemWithUnit(24);
  const gradientPadding = validateProps.pxToRemWithUnit(72);
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
        height: validateProps.addImportantToRule('fit-content'),
        '& ::slotted(picture),::slotted(img)': validateProps.addImportantToEachRule(Object.assign({ transition: validateProps.getTransition('transform') }, validateProps.getBackfaceVisibilityJssStyle())),
        '& ::slotted(picture)': validateProps.addImportantToEachRule(Object.assign({ position: 'absolute' }, validateProps.getInsetJssStyle())),
        '& ::slotted(img)': validateProps.addImportantToEachRule({
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }),
      },
      p: Object.assign(Object.assign(Object.assign({ color: textIconStyles.getThemedTextColor('dark', 'primary') }, textSmallStyle.textSmallStyle), { maxWidth: validateProps.pxToRemWithUnit(550), margin: 0 }), validateProps.mergeDeep(validateProps.buildResponsiveStyles(size, (s) => sizeMap[s]), validateProps.buildResponsiveStyles(weight, (w) => ({ fontWeight: fontWeightStyles.getFontWeight(w) })))),
    },
    root: Object.assign(Object.assign({ height: 0, position: 'relative', transform: 'translate3d(0,0,0)' }, validateProps.hoverMediaQuery({
      '&:hover': {
        '& ::slotted(picture),::slotted(img)': validateProps.addImportantToEachRule({
          transform: 'scale3d(1.05, 1.05, 1.05)',
        }),
      },
    })), validateProps.buildResponsiveStyles(aspectRatio, (ratio) => ({
      paddingTop: aspectRatioPaddingTop[ratio],
    }))),
    'image-container': Object.assign(Object.assign({ position: 'absolute' }, validateProps.getInsetJssStyle()), { overflow: 'hidden' }),
    content: Object.assign(Object.assign(Object.assign({ position: 'absolute' }, (isTopAligned ? { top: 0 } : { bottom: 0 })), { left: 0, right: 0, display: 'grid', justifyItems: 'start', padding: align === 'bottom'
        ? `${gradientPadding} ${paddingSizeXS} ${paddingSizeXS}`
        : `${paddingSizeXS} ${paddingSizeXS} ${gradientPadding}`, gap: validateProps.pxToRemWithUnit(24) }), validateProps.mergeDeep({
      [validateProps.getMediaQueryMin('s')]: Object.assign({ paddingLeft: validateProps.pxToRemWithUnit(32), paddingRight: validateProps.pxToRemWithUnit(32) }, (align === 'bottom' ? { paddingBottom: validateProps.pxToRemWithUnit(32) } : { paddingTop: validateProps.pxToRemWithUnit(32) })),
    }, hasGradient &&
      validateProps.buildResponsiveStyles(compact, (isCompact) => ({
        background: getGradientBackground(isCompact, isTopAligned),
      })), validateProps.buildResponsiveStyles(compact, (isCompact) => isCompact
      ? Object.assign({ alignItems: 'center', gridTemplateColumns: `auto ${validateProps.pxToRemWithUnit(24)}`, gridTemplateRows: 'auto' }, (isTopAligned ? { top: 0 } : { bottom: 0 })) : { gridTemplateRows: 'auto auto', gridTemplateColumns: 'auto' }))),
    'link-pure': validateProps.buildResponsiveStyles(compact, (isCompact) => ({
      display: isCompact ? 'inline-block' : 'none',
    })),
    link: Object.assign({ minHeight: '3rem' }, validateProps.buildResponsiveStyles(compact, (isCompact) => ({ display: isCompact ? 'none' : 'inline-flex' }))),
    // Due to position absolut on .content, position fixed is used to expand the clickable area of the anchor onto the whole link-tile
    anchor: {
      '&::after': Object.assign({ content: '""', position: 'fixed' }, validateProps.getInsetJssStyle()),
    },
  });
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, {
    '& picture > img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  }));
};

const LINK_TILE_WEIGHTS = ['regular', 'semibold'];
const LINK_TILE_SIZES = ['default', 'inherit'];
const LINK_TILE_ALIGNS = ['top', 'bottom'];
const LINK_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'];
// does not take care of breakpoint customizable
const throwIfAlignTopAndNotCompact = (host, align, compact) => {
  if (align === 'top' && (!compact || (typeof compact === 'string' && compact === 'false'))) {
    throw new Error(`Usage of ${validateProps.getTagName(host)} is not valid. Top alignment is only possible when compact is true.`);
  }
};

const propTypes = {
  size: validateProps.AllowedTypes.breakpoint(LINK_TILE_SIZES),
  weight: validateProps.AllowedTypes.breakpoint(LINK_TILE_WEIGHTS),
  aspectRatio: validateProps.AllowedTypes.breakpoint(LINK_TILE_ASPECT_RATIOS),
  label: validateProps.AllowedTypes.string,
  description: validateProps.AllowedTypes.string,
  align: validateProps.AllowedTypes.oneOf(LINK_TILE_ALIGNS),
  gradient: validateProps.AllowedTypes.boolean,
  compact: validateProps.AllowedTypes.breakpoint('boolean'),
  href: validateProps.AllowedTypes.string,
  target: validateProps.AllowedTypes.string,
  download: validateProps.AllowedTypes.string,
  rel: validateProps.AllowedTypes.string,
  aria: validateProps.AllowedTypes.aria(linkUtils.LINK_ARIA_ATTRIBUTES),
};
const LinkTile = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.size = 'default';
    this.weight = 'semibold';
    this.aspectRatio = '4:3';
    this.label = undefined;
    this.description = undefined;
    this.align = 'bottom';
    this.gradient = true;
    this.compact = false;
    this.href = undefined;
    this.target = '_self';
    this.download = undefined;
    this.rel = undefined;
    this.aria = undefined;
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
  }
  componentWillLoad() {
    throwIfAlignTopAndNotCompact(this.host, this.align, this.compact);
  }
  render() {
    this.compact = validateProps.parseJSON(this.compact); // parsing the value just once per lifecycle
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.aspectRatio, this.size, this.weight, this.align, this.compact, this.gradient);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    const descriptionId = 'description';
    const linkProps = {
      theme: 'dark',
    };
    const anchorProps = Object.assign({ class: 'anchor', href: this.href, target: this.target, download: this.download, 'aria-describedby': descriptionId, rel: this.rel }, a11y.parseAndGetAriaAttributes(this.aria));
    const link = (validateProps.h(PrefixedTagNames.pLink, Object.assign({}, linkProps, { key: "link", class: "link", variant: "tertiary" }), validateProps.h("a", Object.assign({}, anchorProps), this.label)));
    const linkPure = (validateProps.h(PrefixedTagNames.pLinkPure, Object.assign({}, linkProps, { key: "link-pure", class: "link-pure", hideLabel: true, icon: "arrow-right" }), validateProps.h("a", Object.assign({}, anchorProps), this.label)));
    return (validateProps.h("div", { class: "root" }, validateProps.h("div", { class: "image-container" }, validateProps.h("slot", null)), validateProps.h("div", { class: "content" }, validateProps.h("p", { id: descriptionId }, this.description), typeof this.compact === 'boolean' ? (this.compact ? linkPure : link) : [linkPure, link])));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_link_tile = LinkTile;
