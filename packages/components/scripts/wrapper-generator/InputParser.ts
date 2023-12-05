import type { TagName } from '@porsche-design-system/shared';
import * as path from 'path';
import * as fs from 'fs';
import * as globby from 'globby';

const ROOT_DIR = path.normalize(__dirname + '/../../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const DIST_TYPES_DIR = path.resolve(DIST_DIR, 'types');
const SRC_DIR = path.resolve(ROOT_DIR, 'src/components');

export type ParsedInterface = { [key: string]: string };
export type IntrinsicElements = { [key in TagName]?: string };

export class InputParser {
  private static _instance: InputParser;

  private sharedTypes: string = '';
  private rawLocalJSX: string = '';
  private rawComponents: string = '';
  private intrinsicElements: IntrinsicElements = {};

  constructor() {
    this.parseInput();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private parseInput(): void {
    // read bundle.d.ts as the base of everything
    const bundleDtsFileName = 'bundle.d.ts';
    const bundleDtsFile = path.resolve(DIST_TYPES_DIR, bundleDtsFileName);
    const bundleDtsContent = fs.readFileSync(bundleDtsFile, 'utf8');

    this.sharedTypes = bundleDtsContent
      .substr(0, bundleDtsContent.indexOf('export namespace Components'))
      // remove unused HTMLStencilElement interface
      .replace(/.*interface HTMLStencilElement(\s|\S)*?}\n/, '')
      // remove unused EventEmitter interface
      .replace(/.*interface EventEmitter(\s|\S)*?}\n/, '')
      // remove global declaration of `const ROLLUP_REPLACE_IS_STAGING: string;`, `const ROLLUP_REPLACE_VERSION: string;` and `const ROLLUP_REPLACE_CDN_BASE_URL: string;`
      .replace(
        /declare global {\n\tconst ROLLUP_REPLACE_IS_STAGING: string;\n\tconst ROLLUP_REPLACE_VERSION: string;\n\tconst ROLLUP_REPLACE_CDN_BASE_URL: string;\n\t\/\/ eslint-disable-next-line @typescript-eslint\/consistent-type-definitions\n\tinterface Document {\n\t\tporscheDesignSystem: PorscheDesignSystem;\n\t}\n}\n/,
        ''
      )
      // remove global declaration of `window.PORSCHE_DESIGN_SYSTEM_CDN` and `window.PORSCHE_DESIGN_SYSTEM_CDN_URL`
      .replace(/declare global {\n\tinterface Window {[\S\s]+?}\n}/g, '')
      // remove global declaration of `CSSStyleSheet` and `ShadowRoot`
      .replace(/declare global {\n\tinterface CSSStyleSheet {\n.*\n\t}\n\tinterface ShadowRoot {\n.*\n\t}\n}/, '')
      // fix consumer typing by removing string which is only necessary for stencil
      .replace(/(export declare type BreakpointCustomizable<T> = T \| BreakpointValues<T>) \| string;/, '$1;')
      // fix consumer typing for accessibility props with string type
      .replace(/(export declare type SelectedAriaAttributes<T extends keyof AriaAttributes> = .*?) \| string;/, '$1;')
      // fix consumer typing for CarouselInternationalization prop with string type
      .replace(/(export declare type CarouselInternationalization = .*?) \| string;/, '$1;')
      // fix consumer typing for PaginationInternationalization prop with string type
      .replace(/(export declare type PaginationInternationalization = .*?) \| string;/, '$1;')
      // fix consumer typing for ScrollToPosition prop with string type
      .replace(/(export declare type ScrollToPosition = .*?) \| string;/, '$1;');

    const [, rawLocalJSX] = /declare namespace LocalJSX {((?:\n|.)*}\s})/.exec(bundleDtsContent) || [];
    this.rawLocalJSX = rawLocalJSX;

    const [, rawComponents] = /export namespace Components {((?:\n|.)*)}\sdeclare global/.exec(bundleDtsContent) || [];
    this.rawComponents = rawComponents;

    let [, rawIntrinsicElements] = /interface IntrinsicElements ({(?:\n|.)*?})/.exec(rawLocalJSX) || [];

    rawIntrinsicElements = rawIntrinsicElements.replace(/ (\w+);/g, " '$1',");
    this.intrinsicElements = eval(`(${rawIntrinsicElements})`);

    console.log(`Found ${Object.keys(this.intrinsicElements).length} intrinsicElements in ${bundleDtsFileName}`);
  }

  private getComponentFilePath(component: TagName): string {
    const fileName = `${component.replace('p-', '')}.tsx`;
    return globby.sync(`${SRC_DIR}/**/${fileName}`)[0];
  }

  private getComponentSourceCode(component: TagName): string {
    const filePath = this.getComponentFilePath(component);
    return fs.readFileSync(filePath, 'utf8');
  }

  private getUtilsFileContentOfComponent(component: TagName, importPath: string): string {
    const utilsFilePath = path.resolve(this.getComponentFilePath(component), '..', importPath + '.ts');
    return fs.readFileSync(utilsFilePath, 'utf8');
  }

  public getSharedTypes(): string {
    return this.sharedTypes;
  }

  public getIntrinsicElements(): IntrinsicElements {
    return this.intrinsicElements;
  }

  public getRawComponentInterface(component: TagName): string {
    // We need semicolon and double newline to ensure comments are ignored
    const regex = new RegExp(`interface ${this.intrinsicElements[component]} ({(?:\\s|.)*?;?\\s\\s})`);
    let [, rawLocalJSXInterface] = regex.exec(this.rawLocalJSX) || [];

    const cleanInterface = (input: string): string =>
      input
        .replace(/"(\w+)"(\??:)/g, '$1$2') // clean double quotes around interface/type keys
        .replace(/    |\t\t/g, '  ') // adjust indentation
        .replace(/    \*/g, '   *') // adjust indentation before jsdocs
        .replace(/(  |\t)}$/g, '}') // adjust indentation at closing }
        .replace(/(\?: \(event: )([a-zA-Z]+)(<[a-zA-Z]+>\))/g, '$1CustomEvent$3'); // remove stencil custom event
    rawLocalJSXInterface = cleanInterface(rawLocalJSXInterface);

    // Unfortunately rawLocalJSXInterface contains all props with optional `?` modifier.
    // Here, we recover required props by comparing the interface from rawComponents to rawLocalJSXInterface
    // and removing the `?` modifier where needed.
    let [, rawComponentsInterface] = regex.exec(this.rawComponents) || [];
    rawComponentsInterface = cleanInterface(rawComponentsInterface);

    const matches = Array.from(rawComponentsInterface.matchAll(/([a-z]+): [\s\S]+?;/g));
    matches.forEach((match) => {
      rawLocalJSXInterface = rawLocalJSXInterface.replace(new RegExp(`${match[1]}\\?: (?:\\s|.)+?;`), match[0]);
    });

    return rawLocalJSXInterface;
  }

  public getComponentInterface(component: TagName): ParsedInterface {
    const rawInterface = this.getRawComponentInterface(component);
    const cleanedInterface = rawInterface.replace(/\??: (.+?);/g, ": '$1',"); // convert to valid js object

    const parsedInterface: ParsedInterface = eval(`(${cleanedInterface})`);
    return parsedInterface;
  }

  public isPropOptional(component: TagName, propName: string): boolean {
    const rawInterface = this.getRawComponentInterface(component);
    return !!rawInterface.match(new RegExp(`\n  ${propName}\\?:`));
  }

  public isPropDeprecated(component: TagName, propName: string): boolean {
    const rawInterface = this.getRawComponentInterface(component);
    const [, jsdoc] = rawInterface.match(new RegExp(`(  \\/\\*\\*\\n(?:.*\\n){0,3})?  ${propName}\\??: `)) || [];

    return !!jsdoc?.match(/@deprecated/);
  }

  public hasGeneric(component: TagName): boolean {
    const rawInterface = this.getRawComponentInterface(component);
    return !!rawInterface.match(/: T[^\w]/);
  }

  public canHaveChildren(component: TagName): boolean {
    const fileContent = this.getComponentSourceCode(component);
    return fileContent.includes('<slot');
  }

  public getDeprecationMessage(component: TagName): string {
    const fileContent = this.getComponentSourceCode(component);
    const [deprecated, rawDeprecationMessage = ''] =
      /\/\*\* @deprecated (.*)\*\/\n@Component\({/.exec(fileContent) || [];

    return !!deprecated ? `/** @deprecated ${rawDeprecationMessage.trim()} */\n` : '';
  }

  public getDefaultValueForProp(component: TagName, prop: string): string {
    const fileContent = this.getComponentSourceCode(component);
    // extract values in same line, next line or multi line, but also respect not default
    let [, defaultValue] =
      fileContent.match(new RegExp(`@Prop\\(.*?\\) public ${prop}\\b(?:.|\\s)*?(?:=\\s*((?:.|\\s)*?))?;`)) || [];

    // detect if the provided value is a variable
    if (defaultValue?.match(/^(?!true|false)[a-zA-Z]+$/)) {
      // find the import path of said variable
      const [, importPath] =
        fileContent.match(new RegExp(`import \\{(?:.|\\s)*?${defaultValue}(?:.|\\s)*?} from '(.*?)';`)) || [];
      const utilsFileContent = this.getUtilsFileContentOfComponent(component, importPath);

      // get value of variable from discovered import path
      const [, resolvedDefaultValue] =
        utilsFileContent.match(new RegExp(`export const ${defaultValue} = ((?:.|\\s)*?);`)) || [];

      defaultValue = resolvedDefaultValue;
    }

    return defaultValue?.replace(/\s+/g, ' '); // multiline to single line
  }
}
