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
      .replace(/.*interface HTMLStencilElement(.|\n)*?}\n/, '')
      // remove unused EventEmitter interface
      .replace(/.*interface EventEmitter(.|\n)*?}\n/, '')
      // remove global declaration of `const ROLLUP_REPLACE_IS_STAGING: string;`
      .replace(/declare global {\n\tconst ROLLUP_REPLACE_IS_STAGING: string;\n}\n/, '')
      // remove global declaration of `PORSCHE_DESIGN_SYSTEM_CDN`
      .replace(/declare global {\n\tinterface Window {\n\t\tPORSCHE_DESIGN_SYSTEM_CDN: "auto" \| "cn";\n\t}\n}/g, '')
      // remove global declaration of `CSSStyleSheet` and `ShadowRoot`
      .replace(/declare global {\n\tinterface CSSStyleSheet {\n.*\n\t}\n\tinterface ShadowRoot {\n.*\n\t}\n}/, '')
      // fix consumer typing by removing string which is only necessary for stencil
      .replace(/(export declare type BreakpointCustomizable<T> = T \| BreakpointValues<T>) \| string;/, '$1;')
      // fix consumer typing for accessibility props with string type
      .replace(/(export declare type SelectedAriaAttributes<T extends keyof AriaAttributes> = .*?) \| string;/, '$1;');

    const [, rawLocalJSX] = /declare namespace LocalJSX {((?:\s|.)*}\s})/.exec(bundleDtsContent) ?? [];
    this.rawLocalJSX = rawLocalJSX;
    let [, rawIntrinsicElements] = /interface IntrinsicElements ({(?:\s|.)*?})/.exec(rawLocalJSX) ?? [];

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
    const [, rawComponentInterface] = regex.exec(this.rawLocalJSX) ?? [];
    return rawComponentInterface
      .replace(/"(\w+)"(\?:)/g, '$1$2') // clean double quotes around interface/type keys
      .replace(/    |\t\t/g, '  ') // adjust indentation
      .replace(/    \*/g, '   *') // adjust indentation before jsdocs
      .replace(/(  |\t)}$/g, '}'); // adjust indentation at closing }
  }

  public getComponentInterface(component: TagName): ParsedInterface {
    const rawInterface = this.getRawComponentInterface(component);
    const cleanedInterface = rawInterface.replace(/\?: ((?:\s|.)*?);/g, ": '$1',"); // convert to valid js object

    const parsedInterface: ParsedInterface = eval(`(${cleanedInterface})`);
    return parsedInterface;
  }

  public hasGeneric(component: TagName): boolean {
    const rawInterface = this.getRawComponentInterface(component);
    return !!rawInterface.match(/: T[^\w]/);
  }

  public canHaveChildren(component: TagName): boolean {
    const fileContent = this.getComponentSourceCode(component);
    return fileContent.includes('<slot');
  }

  public getDefaultValueForProp(component: TagName, prop: string): string {
    const fileContent = this.getComponentSourceCode(component);
    // extract values in same line, next line or multi line, but also respect not default
    let [, defaultValue] =
      fileContent.match(new RegExp(`@Prop\\(.*?\\)\\spublic\\s${prop}(?:.|\\s)*?(?:=\\s*((?:.|\\s)*?))?;`)) || [];

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
