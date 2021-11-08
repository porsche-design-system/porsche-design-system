(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EMAIL_MANIFEST = exports.CDN_BASE_URL = void 0;
    exports.CDN_BASE_URL = (typeof window !== 'undefined' && window.PORSCHE_DESIGN_SYSTEM_CDN === 'cn' ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com') + '/porsche-design-system/email';
    exports.EMAIL_MANIFEST = { "porscheMarque": "porsche-marque.min.4816796e41dc8c32c587dc043b4c5089.png" };
});
