import * as fs from 'fs';
import * as path from 'path';
import { pascalCase } from 'change-case';

const BASE_DIRECTORY = path.normalize('./projects/components-wrapper/src/lib');
const TARGET_DIRECTORY = path.resolve(BASE_DIRECTORY, 'components');

const getComponentFileName = (component: string, withOutExtension?: boolean): string =>
  `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.tsx'}`;

const generateSharedTypes = (bundleDtsContent: string): void => {
  const content = bundleDtsContent.substr(0, bundleDtsContent.indexOf('export namespace Components'));

  const targetFileName = 'types.ts';
  const targetFile = path.resolve(BASE_DIRECTORY, targetFileName);

  fs.writeFileSync(targetFile, content);
  console.log(`Generated shared types: ${targetFileName}`);
};

const generateImports = (componentInterface: string): string => {
  const whitelistedImports = ['CustomEvent', 'Extract'];
  const missingImports: string[] = [];

  // extract non primitive types which we need to import
  const regex = /: ([A-Z].*?)(?:\)|;)/g;
  let typeMatch = regex.exec(componentInterface);

  const handleCustomGenericTypes = (nonPrimitiveType: string) => {
    if (!whitelistedImports.includes(nonPrimitiveType)) {
      // extract potential generics
      const [, genericType] = /<(.*)>/.exec(nonPrimitiveType) ?? [];
      const [, genericRootType] = /([A-Z]\w*)</.exec(nonPrimitiveType) ?? [];

      if (genericType) {
        if (!whitelistedImports.includes(genericRootType)) {
          missingImports.push(genericRootType);
        }
        genericType
          .split(/[,|&]/) // split complex generic types like union types or type literals => e.g. Extract<TextColor, "default" | "inherit">
          .map((x) => x.trim())
          .filter((x) => x.match(/[A-Z]\w*/)) // Check for non-primitive types
          .forEach(handleCustomGenericTypes);
      } else {
        missingImports.push(nonPrimitiveType);
      }
    }
  };

  while (typeMatch !== null) {
    const [, nonPrimitiveType] = typeMatch;
    handleCustomGenericTypes(nonPrimitiveType);
    typeMatch = regex.exec(componentInterface); // loop again in case of multiple matches
  }

  // get rid of duplicates
  const uniqueMissingImports = missingImports.filter((x, i, a) => a.indexOf(x) === i);
  const typesImport = `${
    uniqueMissingImports.length > 0
      ? `
import { ${uniqueMissingImports.join(', ')} } from '../types';`
      : ''
  }`;

  return `import { PropsWithChildren } from 'react';
import { usePrefix } from '../../provider';${typesImport}`;
};

const generateProps = (componentInterface: string): string => {
  // TODO: ['div'] should be more specific
  const content = `type Props = JSX.IntrinsicElements['div'] & ${componentInterface};`
    .replace(/    |\t\t/g, '  ')
    .replace(/(  |\t)};/g, '};');
  return content;
};

const generateComponent = (component: string, componentInterface: string): string => {
  const rawInterface = componentInterface.replace(/\?: ((?:\s|.)*?);/g, ": '$1',");
  const parsedInterface = eval(`(${rawInterface})`);
  console.log(parsedInterface);
  const keysToMap = Object.keys(parsedInterface).filter((x) => x.match(/[A-Z]/g));
  console.log(keysToMap);
  const propsParameter = keysToMap.length ? `{ ${keysToMap.join(', ')}, ...rest }` : 'props';

  // TODO: PropsWithChildren should be only used if component is allowed to have children
  return `export const ${pascalCase(component)} = (${propsParameter}: PropsWithChildren<Props>): JSX.Element => {
  console.log('Hello PButton');
  const Tag = usePrefix('${component}');
  // @ts-ignore
  return <Tag {...props} />;
};`;
};

const generateComponentWrapper = (component: string, componentInterface: string): void => {
  const importsDefinition = generateImports(componentInterface);
  const propsDefinition = generateProps(componentInterface);
  const wrapperDefinition = generateComponent(component, componentInterface);

  const content = `${importsDefinition}\n
${propsDefinition}\n
${wrapperDefinition}`;

  const targetFileName = getComponentFileName(component);
  const targetFile = path.resolve(TARGET_DIRECTORY, targetFileName);

  fs.writeFileSync(targetFile, content);
  console.log(`Generated wrapper: ${targetFileName}`);
};

const generateWrappers = (): void => {
  // read bundle.d.ts as the base of everything
  const bundleDtsFileName = 'bundle.d.ts';
  const bundleDtsFile = path.resolve(BASE_DIRECTORY, bundleDtsFileName);
  const bundleDtsContent = fs.readFileSync(bundleDtsFile, 'utf8');

  generateSharedTypes(bundleDtsContent);

  const [, rawLocalJSX] = /declare namespace LocalJSX {((?:\s|.)*}\s})/.exec(bundleDtsContent) ?? [];
  let [, rawIntrinsicElements] = /interface IntrinsicElements ({(?:\s|.)*?})/.exec(rawLocalJSX) ?? [];

  rawIntrinsicElements = rawIntrinsicElements.replace(/ (\w+);/g, " '$1',");
  const intrinsicElements = eval(`(${rawIntrinsicElements})`);

  console.log(`Found ${Object.keys(intrinsicElements).length} intrinsicElements in ${bundleDtsFileName}`);

  if (!fs.existsSync(TARGET_DIRECTORY)) {
    fs.mkdirSync(TARGET_DIRECTORY);
  }

  // components
  Object.entries(intrinsicElements)
    /*    .filter((item, index) => index === 23) // temporary filter for easier development*/
    .forEach(([component, interfaceName]) => {
      const [, rawComponentInterface] =
        // We need semicolon and double newline to ensure comments are ignored
        new RegExp(`interface ${interfaceName} ({(?:\\s|.)*?;?\\s\\s})`).exec(rawLocalJSX) ?? [];
      generateComponentWrapper(component, rawComponentInterface);
    });

  // barrel file
  const targetFileName = 'index.ts';
  const targetFile = path.resolve(TARGET_DIRECTORY, targetFileName);
  const content = Object.keys(intrinsicElements)
    .map((item) => `export * from './${getComponentFileName(item, true)}';`)
    .join('\n');

  fs.writeFileSync(targetFile, content);
  console.log(`Generated barrel:  ${targetFileName}`);
};

generateWrappers();
