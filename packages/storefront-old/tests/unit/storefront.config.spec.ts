import * as fs from 'fs';
import * as path from 'path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { capitalCase } from 'change-case';

// convert and extract storefront.config.ts to usable object that includes import paths that are otherwise unreachable
const configFilePath = path.resolve(__dirname, '../../storefront.config.ts');
const configFileContent = fs.readFileSync(configFilePath, 'utf8');
const [, rawComponentConfig] = configFileContent.match(/  Components: ([\s\S]+?\n  }),/) || [];
const cleanedComponentConfig = rawComponentConfig
  .replace(/\s+\/\/ biome-ignore.*/g, '') // remove prettier-ignore directives
  .replace(/[\s"]?([\w-]+)[\s"]?:/g, '"$1":') // wrap keys in double quotes
  .replace(/\(\) => import\((.+?)\)/g, '$1') // extract import paths
  .replace(/@\/\.\.\/\.\.\/components\/src\/components\//g, '') // get rid of relative paths
  .replace(/['`]/g, '"') // convert single quotes and backticks to double quotes
  .replace(/\$\{componentsBasePath}\//g, '') // remove basePath variable
  .replace(/,(\s+[}\]])/g, '$1'); // remove trailing commas
const componentConfig = JSON.parse(cleanedComponentConfig);

const getTopLevelParentTagName = (tagNameOrNames: TagName | TagName[]): TagName => {
  const tagName = Array.isArray(tagNameOrNames) ? tagNameOrNames[0] : tagNameOrNames;
  const meta = getComponentMeta(tagName);
  // TODO: simplify once componentMeta contains all requiredParent or even topLevelParentTagName
  const requiredParent =
    meta.requiredParent ||
    (tagName.match(/-item|-option|-dropdown$/) &&
      TAG_NAMES.find((tag) => tag === tagName.replace(/-item|-option|-dropdown$/, '')));
  return requiredParent ? getTopLevelParentTagName(requiredParent) : tagName;
};

const getComponentName = (tagName: TagName): string => {
  return tagName.replace(/^p-/, '');
};
const getPrettyComponentName = (tagName: TagName): string => {
  return capitalCase(getComponentName(tagName));
};

const tagNamesWithProps = TAG_NAMES.filter((tagName) => {
  const { propsMeta, isInternal } = getComponentMeta(tagName);
  return propsMeta && !isInternal && tagName !== 'p-optgroup'; // get rid of p-toast-item and p-select-wrapper-dropdown
});

it.each<TagName>(tagNamesWithProps)('should contain props page for %s', (tagName) => {
  const { requiredParent } = getComponentMeta(tagName);
  // to find top level or root component for components like gird-item, flex-item, etc.
  const topLevelParentTagName = getTopLevelParentTagName(tagName);

  const prettyTopLevelComponentName = getPrettyComponentName(topLevelParentTagName);
  const { Props: componentProps } = componentConfig[prettyTopLevelComponentName] as { Props: string[] };

  const topLevelParentName = getComponentName(topLevelParentTagName);
  const componentName = getComponentName(tagName);

  // TODO: simplify once componentMeta contains all requiredParent or even topLevelParentTagName
  const hasOrIsChildComponent =
    !!requiredParent ||
    TAG_NAMES.some((tag) => {
      const parent = getComponentMeta(tag).requiredParent;
      return Array.isArray(parent)
        ? parent.includes(tagName)
        : parent === tagName || tagName.match(/-item|-option|-dropdown$/);
    }) ||
    TAG_NAMES.filter((tag) => tag !== tagName).some(
      (tag) => tag.match(/-item|-option|-dropdown$/) && tag.match(new RegExp(`^${tagName}-[a-z]+$`))
    );
  const childComponentDir = hasOrIsChildComponent ? `${componentName}/` : '';
  expect(componentProps).toContain(`${topLevelParentName}/${childComponentDir}${componentName}.props.md`);
});
