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

export const featureToggle = (feature: string): boolean => {
  return localStorage[`Feature: ${feature}`] === 'true';
};
