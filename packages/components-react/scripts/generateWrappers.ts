import * as fs from 'fs';
import * as path from 'path';
import { pascalCase, paramCase } from 'change-case';

const BASE_DIRECTORY = path.normalize('./projects/components-wrapper/src/lib');
const TARGET_DIRECTORY = path.resolve(BASE_DIRECTORY, 'components');

const getComponentFileName = (component: string, withOutExtension?: boolean): string =>
  `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.tsx'}`;

const generateSharedTypes = (bundleDtsContent: string): string => {
  const content = bundleDtsContent.substr(0, bundleDtsContent.indexOf('export namespace Components'));

  const targetFileName = 'types.ts';
  const targetFile = path.resolve(BASE_DIRECTORY, targetFileName);

  fs.writeFileSync(targetFile, content);
  console.log(`Generated shared types: ${targetFileName}`);
  return content;
};

const splitLiteralTypeToNonPrimitiveTypes = (literalType: string): string[] => {
  return literalType
    .split(/[,|&]/) // split complex generic types like union types or type literals => e.g. Extract<TextColor, "default" | "inherit">
    .map((x) => x.trim())
    .filter((x) => x.match(/[A-Z]\w*/)); // Check for non-primitive types
};

const extractNonPrimitiveTypes = (input: string, isNonPrimitiveType: boolean = false): string[] => {
  const whitelistedTypes = ['CustomEvent', 'Extract'];
  const nonPrimitiveTypes: string[] = [];

  const handleCustomGenericTypes = (nonPrimitiveType: string) => {
    if (!whitelistedTypes.includes(nonPrimitiveType)) {
      // extract potential generics
      const [, genericType] = /<(.*)>/.exec(nonPrimitiveType) ?? [];
      const [, genericRootType] = /([A-Z]\w*)</.exec(nonPrimitiveType) ?? [];

      if (genericType) {
        if (!whitelistedTypes.includes(genericRootType)) {
          nonPrimitiveTypes.push(genericRootType);
        }
        const genericTypes = splitLiteralTypeToNonPrimitiveTypes(genericType);
        genericTypes.forEach(handleCustomGenericTypes);
      } else {
        nonPrimitiveTypes.push(nonPrimitiveType);
      }
    }
  };

  if (isNonPrimitiveType) {
    handleCustomGenericTypes(input);
  } else {
    // extract non primitive types which we need to import
    const regex = /: ([A-Z].*?)(?:\)|;)/g;
    let typeMatch = regex.exec(input);

    while (typeMatch !== null) {
      const [, nonPrimitiveType] = typeMatch;
      handleCustomGenericTypes(nonPrimitiveType);
      typeMatch = regex.exec(input); // loop again in case of multiple matches
    }
  }
  // get rid of duplicates
  return nonPrimitiveTypes.filter((x, i, a) => a.indexOf(x) === i);
};

const generateImports = (componentInterface: string): string => {
  const nonPrimitiveTypes = extractNonPrimitiveTypes(componentInterface);
  const typesImport = `${
    nonPrimitiveTypes.length > 0
      ? `
import { ${nonPrimitiveTypes.join(', ')} } from '../types';`
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

type ParsedInterface = { [key: string]: string };
type ExtendedProp = { rawValueType: string; hasToBeMapped: boolean; canBeObject: boolean; isEvent: boolean };
type ExtendedInterface = { [key: string]: ExtendedProp };

// Recursively check prop value for type of object
const valueCanBeObject = (propValue: string, sharedTypes: string): boolean => {
  let result = false;

  if (propValue.includes('{')) {
    result = true;
  } else {
    if (propValue.match(/[A-Z]/g)) {
      // Extract all types to check recursively e.g. "TextSize | BreakpointCustomizable<boolean> | CustomSize" etc.
      const nonPrimitiveTypes = splitLiteralTypeToNonPrimitiveTypes(propValue)
        .map((x) => extractNonPrimitiveTypes(x, true))
        .flat();

      for (const nonPrimitiveType of nonPrimitiveTypes) {
        // Extract typeDefinition of every nonPrimitiveType found before
        const [, typeDef] =
          new RegExp(`(?:type|interface) ${nonPrimitiveType}(?:<.*>)? = ((?:.|\\s)*?);`).exec(sharedTypes) ?? [];

        if (typeDef && valueCanBeObject(typeDef, sharedTypes)) {
          result = true;
        }
      }
    } else {
      result = false;
    }
  }
  return result;
};

const convertToExtendedProp = (propKey: string, propValue: string, sharedTypes: string): ExtendedProp => {
  const isEvent = !!propKey.match(/^on[A-Z]/);
  const extendedProp: ExtendedProp = {
    rawValueType: propValue,
    hasToBeMapped: !isEvent && !!propKey.match(/[A-Z]/g),
    canBeObject: !isEvent && valueCanBeObject(propValue, sharedTypes),
    isEvent: isEvent,
  };
  return extendedProp;
};

// Enrich parsedInterface with meta information for further processing
const convertToExtendedInterface = (parsedInterface: ParsedInterface, sharedTypes: string): ExtendedInterface => {
  const extendedInterface: ExtendedInterface = {};
  Object.entries(parsedInterface).forEach(([propKey, propValue]) => {
    extendedInterface[propKey] = convertToExtendedProp(propKey, propValue, sharedTypes);
  });
  return extendedInterface;
};

const generateComponent = (component: string, componentInterface: string, sharedTypes: string): string => {
  const rawInterface = componentInterface.replace(/\?: ((?:\s|.)*?);/g, ": '$1',");
  const parsedInterface: ParsedInterface = eval(`(${rawInterface})`);

  const extendedInterface = convertToExtendedInterface(parsedInterface, sharedTypes);

  const propsToMap = Object.entries(extendedInterface).filter(([, value]) => value.hasToBeMapped);
  const hasPropsToMap = propsToMap.length > 0;
  const wrapperProps = hasPropsToMap ? `{ ${propsToMap.map(([key]) => key).join(', ')} , ...rest }` : 'props';
  const propMapping = propsToMap
    .map(([key, value]) => `'${paramCase(key)}': ${value.canBeObject ? `JSON.stringify(${key})` : key}`)
    .join(',\n    ');

  const componentProps = hasPropsToMap
    ? `const props = {
    ...rest,
    ${propMapping}
  };`
    : '';

  // TODO: PropsWithChildren should be only used if component is allowed to have children
  return `export const ${pascalCase(component)} = (${wrapperProps}: PropsWithChildren<Props>): JSX.Element => {
  const Tag = usePrefix('${component}');
  ${componentProps}
  // @ts-ignore
  return <Tag {...props} />;
};`;
};

const generateComponentWrapper = (component: string, componentInterface: string, sharedTypes: string): void => {
  const importsDefinition = generateImports(componentInterface);
  const propsDefinition = generateProps(componentInterface);
  const wrapperDefinition = generateComponent(component, componentInterface, sharedTypes);

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

  const sharedTypes = generateSharedTypes(bundleDtsContent);

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
    /*    .filter((item, index) => index === 29) // temporary filter for easier development*/
    .forEach(([component, interfaceName]) => {
      const [, rawComponentInterface] =
        // We need semicolon and double newline to ensure comments are ignored
        new RegExp(`interface ${interfaceName} ({(?:\\s|.)*?;?\\s\\s})`).exec(rawLocalJSX) ?? [];
      generateComponentWrapper(component, rawComponentInterface, sharedTypes);
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
