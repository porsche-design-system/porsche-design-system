export const encodeUrl = (param: string): string => {
  return param.toLowerCase().replace(' ', '-');
};

export const decodeUrl = (param: string): string => {
  return param
    .toLowerCase()
    .replace('-', ' ')
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export const featureToggle = (feature: 'Q2/2019 Components'): boolean => {
  return localStorage[`Feature: ${feature}`] === 'true';
};
