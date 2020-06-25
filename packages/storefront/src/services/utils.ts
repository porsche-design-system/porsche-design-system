export type Feature = 'Q2/2019 Components';
export const featureToggle = (feature: Feature): boolean => {
  return localStorage[`Feature: ${feature}`] === 'true';
};
