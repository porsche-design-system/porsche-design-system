import { CDN_BASE_URL, CDN_BASE_URL_CN } from '../../../../../../../cdn.config';

export const getCdnBaseUrl = (cdn: string): string => {
  return cdn === 'auto' ? CDN_BASE_URL : CDN_BASE_URL_CN;
};

export const transformToRegex = (url: string): RegExp => {
  // ^ and $ ensure that the string does not contain any other values before or after the expected
  return new RegExp(`^${url.replace(/(\/|\.|\+)/g, '\\$1').replace(/\*/g, '[a-z0-9]+')}$`);
};
