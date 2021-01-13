import * as fs from 'fs';
import * as path from 'path';
import { paramCase, pascalCase, camelCase } from 'change-case';

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

const generateImports = (componentInterface: string, extendedProps: ExtendedProp[]): string => {
  let importsFromTypes = '';
  const nonPrimitiveTypes = extractNonPrimitiveTypes(componentInterface);

  if (nonPrimitiveTypes.length > 0) {
    importsFromTypes = `import { ${nonPrimitiveTypes.join(', ')} } from '../types';`;
  }

  const hasEventProps = extendedProps.filter((prop) => prop.isEvent).length > 0;
  const reactImports = ['PropsWithChildren', ...(hasEventProps ? ['useRef'] : [])];
  const importsFromReact = `import { ${reactImports.join(', ')} } from 'react';`;
  const providerImports = ['usePrefix', ...(hasEventProps ? ['useEventCallback'] : [])];
  const importsFromProvider = `import { ${providerImports.join(', ')} } from '../../provider';`;

  return `${importsFromReact}
${importsFromProvider}
${importsFromTypes}`;
};

const generateProps = (componentInterface: string): string => {
  // TODO: ['div'] should be more specific
  const content = `type Props = JSX.IntrinsicElements['div'] & ${componentInterface};`
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
  const extendedProp: ExtendedProp = {
    key: propKey,
    rawValueType: propValue,
    hasToBeMapped: !isEvent && !!propKey.match(/[A-Z]/g),
    canBeObject: !isEvent && valueCanBeObject(propValue, sharedTypes),
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

const generateComponent = (component: string, extendedProps: ExtendedProp[]): string => {
  let wrapperProps = 'props';
  let componentHooks = '';
  let componentProps = '';
  let componentAttributes = '';

  const propsToDestructure = extendedProps.filter((prop) => prop.isEvent || prop.hasToBeMapped);
  const propsToEventListener = extendedProps.filter((prop) => prop.isEvent);
  const propsToMap = extendedProps.filter((prop) => prop.hasToBeMapped);

  if (propsToDestructure.length > 0) {
    wrapperProps = `{ ${propsToDestructure.map(({ key }) => key).join(', ')}, ...rest }`;
  }

  if (propsToMap.length > 0) {
    const propMapping = propsToMap
      .map(({ key, canBeObject }) => `'${paramCase(key)}': ${canBeObject ? `JSON.stringify(${key})` : key}`)
      .join(',\n    ');

    componentProps = `const props = {
    ...rest,
    ${propMapping}
  };`;
  }

  if (propsToEventListener.length > 0) {
    const eventHooks = propsToEventListener
      .map(({ key }) => `useEventCallback(el.current, '${camelCase(key.substr(2))}', ${key} as any);`)
      .join('\n');

    componentHooks = `const el = useRef<HTMLElement>();
  ${eventHooks}`;

    componentAttributes = 'ref={el} ';
  }

  // TODO: PropsWithChildren should be only used if component is allowed to have children
  return `export const ${pascalCase(component)} = (${wrapperProps}: PropsWithChildren<Props>): JSX.Element => {
  ${componentHooks}
  const Tag = usePrefix('${component}');
  ${componentProps}
  // @ts-ignore
  return <Tag ${componentAttributes}{...props} />;
};`;
};

const generateComponentWrapper = (component: string, componentInterface: string, sharedTypes: string): void => {
  const extendedProps = convertToExtendedProps(componentInterface, sharedTypes);
  const importsDefinition = generateImports(componentInterface, extendedProps);
  const propsDefinition = generateProps(componentInterface);
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
