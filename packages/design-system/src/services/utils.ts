export const encodeUrl = (param: string): string => {
  return param.toLowerCase().replace(/\s+/g, '-');
};

export const decodeUrl = (param: string): string => {
  return param
    .toLowerCase()
    .replace(/-+/g, ' ')
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export type Feature = 'Q2/2019 Components';
export const featureToggle = (feature: Feature): boolean => {
  return localStorage[`Feature: ${feature}`] === 'true';
};
