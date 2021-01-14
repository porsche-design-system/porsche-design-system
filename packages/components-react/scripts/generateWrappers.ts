import * as fs from 'fs';
import * as path from 'path';
import { paramCase, pascalCase, camelCase } from 'change-case';
import { TagName } from '@porsche-design-system/components/dist/types/tags';

const BASE_DIRECTORY = path.normalize('./projects');
const COMPONENTS_WRAPPER_DIRECTORY = path.resolve(BASE_DIRECTORY, 'components-wrapper/src/lib');
const JSDOM_POLYFILL_DIRECTORY = path.resolve(BASE_DIRECTORY, 'jsdom-polyfill/src/lib');
const TARGET_DIRECTORY = path.resolve(COMPONENTS_WRAPPER_DIRECTORY, 'components');

const getComponentFileName = (component: TagName, withOutExtension?: boolean): string =>
  `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.tsx'}`;

const generateSharedTypes = (bundleDtsContent: string): string => {
  const content = bundleDtsContent.substr(0, bundleDtsContent.indexOf('export namespace Components'));

  const targetFileName = 'types.ts';
  const targetFile = path.resolve(COMPONENTS_WRAPPER_DIRECTORY, targetFileName);

  fs.writeFileSync(targetFile, content);
  console.log(`Generated shared types: ${targetFileName}`);
  return content;
};

const splitLiteralTypeToNonPrimitiveTypes = (literalType: string): string[] => {
  return literalType
    .split(/[<>,|&]/) // split complex generic types like union types or type literals => e.g. Extract<TextColor, "default" | "inherit">
    .map((x) => x.trim())
    .filter((x) => x.match(/[A-Z]\w*/)); // Check for non-primitive types
};

const extractNonPrimitiveTypes = (input: string, isNonPrimitiveType: boolean = false): string[] => {
  const whitelistedTypes = ['CustomEvent', 'Extract', 'T'];
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

const generateImports = (component: TagName, componentInterface: string, extendedProps: ExtendedProp[]): string => {
  const hasEventProps = extendedProps.filter(({ isEvent }) => isEvent).length > 0;
  const canBeObject = extendedProps.filter(({ canBeObject }) => canBeObject).length > 0;

  const reactImports = [
    'HTMLAttributes',
    ...(canHaveChildren(component) ? ['PropsWithChildren'] : []),
    ...(hasEventProps ? ['useRef'] : []),
  ];
  const importsFromReact = `import { ${reactImports.join(', ')} } from 'react';`;
  const providerImports = [
    'usePrefix',
    ...(hasEventProps ? ['useEventCallback'] : []),
    ...(canBeObject ? ['jsonStringify'] : []),
  ];
  const importsFromProvider = `import { ${providerImports.join(', ')} } from '../../provider';`;

  let importsFromTypes = '';
  const nonPrimitiveTypes = extractNonPrimitiveTypes(componentInterface);
  if (nonPrimitiveTypes.length > 0) {
    importsFromTypes = `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`;
  }

  const content = [importsFromReact, importsFromProvider, importsFromTypes].filter((x) => x).join('\n');
  return content;
};

const generatePropsName = (component: TagName): string => {
  return `${pascalCase(component)}Props`;
};

const generateProps = (component: TagName, componentInterface: string): string => {
  const content = `export type ${generatePropsName(component)} = HTMLAttributes<{}> & ${componentInterface};`
    .replace(/    |\t\t/g, '  ')
    .replace(/(  |\t)};/g, '};');
  return content;
};

type ParsedInterface = { [key: string]: string };
type ExtendedProp = {
  key: string;
  rawValueType: string;
  hasToBeMapped: boolean;
  canBeObject: boolean;
  isEvent: boolean;
};

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
  const canBeObject = !isEvent && valueCanBeObject(propValue, sharedTypes);
  const extendedProp: ExtendedProp = {
    key: propKey,
    rawValueType: propValue,
    hasToBeMapped: (!isEvent && !!propKey.match(/[A-Z]/g)) || canBeObject,
    canBeObject: canBeObject,
    isEvent: isEvent,
  };
  return extendedProp;
};

// Enrich parsedInterface with meta information for further processing
const convertToExtendedProps = (componentInterface: string, sharedTypes: string): ExtendedProp[] => {
  const rawInterface = componentInterface.replace(/\?: ((?:\s|.)*?);/g, ": '$1',");
  const parsedInterface: ParsedInterface = eval(`(${rawInterface})`);
  return Object.entries(parsedInterface).map(([propKey, propValue]) =>
    convertToExtendedProp(propKey, propValue, sharedTypes)
  );
};

const canHaveChildren = (component: TagName): boolean => {
  const whitelistedComponents: TagName[] = ['p-flex', 'p-flex-item', 'p-grid', 'p-grid-item'];
  if (whitelistedComponents.includes(component)) {
    return true;
  }

  const fileName = `${component}.cjs.entry.js`;
  const filePath = path.resolve(JSDOM_POLYFILL_DIRECTORY, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return fileContent.includes('h("slot"');
};

const generateComponent = (component: TagName, extendedProps: ExtendedProp[]): string => {
  let wrapperProps = 'props';
  let componentHooks = '';
  let componentProps = '';
  let componentAttributes = '{...props}';

  const propsToDestructure = extendedProps.filter(({ isEvent, hasToBeMapped }) => isEvent || hasToBeMapped);
  const propsToEventListener = extendedProps.filter(({ isEvent }) => isEvent);
  const propsToMap = extendedProps.filter(({ hasToBeMapped }) => hasToBeMapped);

  if (propsToDestructure.length > 0) {
    wrapperProps = `{ ${propsToDestructure.map(({ key }) => key).join(', ')}, ...rest }`;
  }

  const propMapping: string[] = [
    ...(propsToDestructure.length > 0 ? ['...rest'] : []),
    ...propsToMap.map(({ key, canBeObject }) => `'${paramCase(key)}': ${canBeObject ? `jsonStringify(${key})` : key}`),
  ];

  if (propsToEventListener.length > 0) {
    const eventHooks = propsToEventListener
      .map(({ key }) => `useEventCallback(elementRef, '${camelCase(key.substr(2))}', ${key} as any);`)
      .join('\n');

    propMapping.push('ref: elementRef');

    componentHooks = `const elementRef = useRef<HTMLElement>();
  ${eventHooks}\n`;
  }

  if (propMapping.length > 0) {
    componentProps = `const props = {
    ${propMapping.join(',\n    ')}
  };\n`;
  } else {
    if (propsToDestructure.length > 0) {
      componentAttributes = '{...rest}';
    }
  }

  const propsName = generatePropsName(component);
  const wrapperPropsType = canHaveChildren(component) ? `PropsWithChildren<${propsName}>` : propsName;

  return `export const ${pascalCase(component)} = (${wrapperProps}: ${wrapperPropsType}): JSX.Element => {
  ${componentHooks}
  const Tag = usePrefix('${component}');
  ${componentProps}
  return <Tag ${componentAttributes} />;
};`;
};

const generateComponentWrapper = (component: TagName, componentInterface: string, sharedTypes: string): void => {
  const extendedProps = convertToExtendedProps(componentInterface, sharedTypes);
  const importsDefinition = generateImports(component, componentInterface, extendedProps);
  const propsDefinition = generateProps(component, componentInterface);
  const wrapperDefinition = generateComponent(component, extendedProps);

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
  const bundleDtsFile = path.resolve(COMPONENTS_WRAPPER_DIRECTORY, bundleDtsFileName);
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
    /*    .filter((item, index) => index === 11) // temporary filter for easier development*/
    .forEach(([component, interfaceName]) => {
      const [, rawComponentInterface] =
        // We need semicolon and double newline to ensure comments are ignored
        new RegExp(`interface ${interfaceName} ({(?:\\s|.)*?;?\\s\\s})`).exec(rawLocalJSX) ?? [];
      generateComponentWrapper(component as TagName, rawComponentInterface, sharedTypes);
    });

  // barrel file
  const targetFileName = 'index.ts';
  const targetFile = path.resolve(TARGET_DIRECTORY, targetFileName);
  const content = Object.keys(intrinsicElements)
    .map((component) => `export * from './${getComponentFileName(component as TagName, true)}';`)
    .join('\n');

  fs.writeFileSync(targetFile, content);
  console.log(`Generated barrel:  ${targetFileName}`);
};

generateWrappers();
