import { getPorscheDesignSystemPrefixesForVersions } from './partials/helper';
import { consoleWarn } from '../log';

export const validateVersions = () => {
  const prefixesForVersions = getPorscheDesignSystemPrefixesForVersions();
  if (Object.keys(prefixesForVersions).length > 1) {
    consoleWarn(
      `Multiple different versions are used with following prefixes:\n`,
      prefixesForVersions,
      `\nPlease upgrade all instances to the latest used version: ${
        Object.keys(prefixesForVersions)[Object.keys(prefixesForVersions).length - 1]
      }`
    );
  }
};
