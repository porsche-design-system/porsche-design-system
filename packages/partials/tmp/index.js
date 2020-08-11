/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var breakpoint = {
    xxs: 0,
    xs: 480,
    s: 760,
    m: 1000,
    l: 1300,
    xl: 1760,
    xxl: 1920
};
var mediaQuery = function (minBreakpoint, maxBreakpoint) {
    return "@media (min-width: " + ((typeof minBreakpoint !== 'number' && breakpoint[minBreakpoint]) || minBreakpoint) + "px)" + (maxBreakpoint
        ? " and (max-width: " + ((typeof maxBreakpoint !== 'number' && breakpoint[maxBreakpoint]) || maxBreakpoint) + "px)"
        : '');
};

var font = {
    family: '"Porsche Next", "Arial Narrow", Arial, sans-serif',
    weight: {
        thin: 100,
        regular: 400,
        semibold: 600,
        bold: 700
    },
    // To boost performance, size is defined static.
    size: {
        '12': { fontSize: '0.75rem', lineHeight: 1.66667 },
        '16': { fontSize: '1rem', lineHeight: 1.5 },
        '18': { fontSize: '1.125rem', lineHeight: 1.55556 },
        '20': { fontSize: '1.25rem', lineHeight: 1.4 },
        '22': { fontSize: '1.375rem', lineHeight: 1.45455 },
        '24': { fontSize: '1.5rem', lineHeight: 1.5 },
        '28': { fontSize: '1.75rem', lineHeight: 1.42857 },
        '30': { fontSize: '1.875rem', lineHeight: 1.33333 },
        '32': { fontSize: '2rem', lineHeight: 1.375 },
        '36': { fontSize: '2.25rem', lineHeight: 1.33333 },
        '42': { fontSize: '2.625rem', lineHeight: 1.2381 },
        '44': { fontSize: '2.75rem', lineHeight: 1.18182 },
        '48': { fontSize: '3rem', lineHeight: 1.25 },
        '52': { fontSize: '3.25rem', lineHeight: 1.23077 },
        '60': { fontSize: '3.75rem', lineHeight: 1.2 },
        '62': { fontSize: '3.875rem', lineHeight: 1.22581 },
        '72': { fontSize: '4.5rem', lineHeight: 1.22222 },
        '84': { fontSize: '5.25rem', lineHeight: 1.19048 },
        xSmall: { fontSize: '0.75rem', lineHeight: 1.66667 },
        small: { fontSize: '1rem', lineHeight: 1.5 },
        medium: { fontSize: '1.5rem', lineHeight: 1.5 },
        large: { fontSize: '2.25rem', lineHeight: 1.33333 },
        xLarge: { fontSize: '3.25rem', lineHeight: 1.23077 }
    }
};

var _a, _b, _c, _d, _e;
/*
 * Title
 */
var family = font.family, size = font.size, weight = font.weight;
var fontBase = {
    fontFamily: family,
    fontWeight: weight.semibold
};
var title = {
    large: __assign(__assign(__assign({}, fontBase), size['32']), (_a = {}, _a[mediaQuery('s', 'm')] = size['42'], _a[mediaQuery('m', 'l')] = size['52'], _a[mediaQuery('l', 'xl')] = size['62'], _a[mediaQuery('xl')] = size['72'], _a))
};
/*
 * Headline
 */
var headline = {
    '1': __assign(__assign(__assign({}, fontBase), size['28']), (_b = {}, _b[mediaQuery('s', 'm')] = size['36'], _b[mediaQuery('m', 'l')] = size['44'], _b[mediaQuery('l', 'xl')] = size['52'], _b[mediaQuery('xl')] = size['60'], _b)),
    '2': __assign(__assign(__assign({}, fontBase), size['24']), (_c = {}, _c[mediaQuery('s', 'm')] = size['30'], _c[mediaQuery('m', 'l')] = size['36'], _c[mediaQuery('l', 'xl')] = size['42'], _c[mediaQuery('xl')] = size['48'], _c)),
    '3': __assign(__assign(__assign({}, fontBase), size['20']), (_d = {}, _d[mediaQuery('s', 'm')] = size['24'], _d[mediaQuery('m', 'l')] = size['28'], _d[mediaQuery('l', 'xl')] = size['32'], _d[mediaQuery('xl')] = size['36'], _d)),
    '4': __assign(__assign(__assign({}, fontBase), size['16']), (_e = {}, _e[mediaQuery('s', 'm')] = size['18'], _e[mediaQuery('m', 'l')] = size['20'], _e[mediaQuery('l', 'xl')] = size['22'], _e[mediaQuery('xl')] = size['24'], _e)),
    '5': __assign(__assign({}, fontBase), size['16'])
};
/*
 * Text
 */
var baseText = {
    fontFamily: font.family,
    fontWeight: font.weight.regular
};
var text = {
    xSmall: __assign(__assign({}, baseText), font.size.xSmall),
    small: __assign(__assign({}, baseText), font.size.small),
    medium: __assign(__assign({}, baseText), font.size.medium),
    large: __assign(__assign({}, baseText), font.size.large),
    xLarge: __assign(__assign({}, baseText), font.size.xLarge)
};

/* Auto Generated Below */
var FONT_FACE_CDN_URL = "https://cdn.ui.porsche.com/porsche-design-system/style/font-face.min.677d41d9905a04aadcb253f71e5f71e9.css";

/* Auto Generated Below */

const TAG_NAMES = ['p-button', 'p-button-pure', 'p-checkbox-wrapper', 'p-content-wrapper', 'p-divider', 'p-fieldset-wrapper', 'p-flex', 'p-flex-item', 'p-grid', 'p-grid-item', 'p-headline', 'p-icon', 'p-link', 'p-link-pure', 'p-link-social', 'p-marque', 'p-pagination', 'p-radio-button-wrapper', 'p-select-wrapper', 'p-spinner', 'p-text', 'p-text-field-wrapper', 'p-text-list', 'p-text-list-item', 'p-textarea-wrapper'];

// We need to determine if we are local or production to change the url
var getFontFaceCSS = function () { return "<link rel=\"stylesheet\" href=\"" + FONT_FACE_CDN_URL + "\">"; };
var getPorscheDesignSystemCoreStyles = function () {
    return "<style>" + TAG_NAMES.join(',') + " { visibility: hidden }</style>";
};

export { getFontFaceCSS, getPorscheDesignSystemCoreStyles };
