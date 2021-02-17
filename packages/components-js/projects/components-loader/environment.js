'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.snakeCaseVersion = exports.version = exports.npmDistPath = exports.cdnDistPath = exports.deployUrl = void 0;
var path = __importStar(require('path'));
var cdn_config_1 = require('../../../../cdn.config');
var package_json_1 = require('./package.json');
var isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';
console.log('Environment:', isDev ? 'dev' : 'prod');
exports.deployUrl = isDev
  ? 'http://localhost:3001/components'
  : '%%%CDN_BASE_URL_DYNAMIC%%%/' + cdn_config_1.CDN_BASE_PATH_COMPONENTS; // placeholder is replaced via replace.ts script
exports.cdnDistPath = path.resolve('./dist/components');
exports.npmDistPath = path.resolve('./dist/components-wrapper');
var package_json_2 = require('./package.json');
Object.defineProperty(exports, 'version', {
  enumerable: true,
  get: function () {
    return package_json_2.version;
  },
});
exports.snakeCaseVersion = package_json_1.version.replace(/\.|-/g, '_');
