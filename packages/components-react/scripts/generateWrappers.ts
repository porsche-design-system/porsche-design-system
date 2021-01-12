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
  const whitelistedImports = ['CustomEvent'];
  const simpleTypes = ['string', 'number', 'boolean', 'object'];
  const missingImports: string[] = [];

  // extract non primitive types which we need to import
  const regex = /: ([A-Z].*);/g;
  let typeMatch = regex.exec(componentInterface);
  while (typeMatch !== null) {
    const [, nonPrimitiveType] = typeMatch;

    if (!whitelistedImports.includes(nonPrimitiveType)) {
      // extract potential generics
      const [, genericType] = /<(\w*)>/.exec(nonPrimitiveType) ?? [];
      if (genericType) {
        if (!simpleTypes.includes(genericType)) {
          missingImports.push(genericType);
        }

        // extract type that requires generic
        const [, genericRootType] = /([A-Z]\w*)/.exec(nonPrimitiveType) ?? [];
        missingImports.push(genericRootType);
      } else {
        missingImports.push(nonPrimitiveType);
      }
    }

    typeMatch = regex.exec(componentInterface); // loop again in case of multiple matches
  }

  // get rid of duplicates
  const uniqueMissingImports = missingImports.filter((x, i, a) => a.indexOf(x) === i);

  const imports = `import { usePrefix } from '../../provider';
import { ${uniqueMissingImports.join(', ')} } from '../types';`;

  return imports;
};

const generateComponentWrapper = (component: string, componentInterface: string): void => {
  const importsDefinition = generateImports(componentInterface);
  const propsDefinition = `type Props = ${componentInterface}`.replace(/    /g, '  ').replace('  }', '}');
  const wrapperDefinition = `export const ${pascalCase(component)} = (props: Props): JSX.Element => {
  const Tag = usePrefix('${component}');
  return <Tag {...props} />;
}`;

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
    .filter((item, index) => index === 8) // temporary filter for easier development
    .forEach(([component, interfaceName]) => {
      const [, rawComponentInterface] =
        new RegExp(`interface ${interfaceName} ({(?:\\s|.)*?;\\s\\s\\s})`).exec(rawLocalJSX) ?? [];
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
