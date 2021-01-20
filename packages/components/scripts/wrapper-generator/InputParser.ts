import { TagName } from '@porsche-design-system/components/dist/types/tags';
import path from 'path';
import fs from 'fs';

const BASE_DIRECTORY = path.normalize('./dist');
const SOURCE_DIR = path.resolve(BASE_DIRECTORY, 'types');
const CJS_DIRECTORY = path.resolve(BASE_DIRECTORY, 'cjs');

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
    const bundleDtsFile = path.resolve(SOURCE_DIR, bundleDtsFileName);
    const bundleDtsContent = fs.readFileSync(bundleDtsFile, 'utf8');

    let rawSharedTypes = bundleDtsContent.substr(0, bundleDtsContent.indexOf('export namespace Components'));
    // remove global declaration of `const ROLLUP_REPLACE_IS_STAGING: string;`
    rawSharedTypes = rawSharedTypes.replace(/declare global {\n\tconst ROLLUP_REPLACE_IS_STAGING: string;\n}\n/, '');

    // fix consumer typing by removing string which is only necessary for stencil
    rawSharedTypes = rawSharedTypes.replace(
      /(export declare type BreakpointCustomizable<T> = T \| BreakpointValues<T>) \| string;/,
      '$1;'
    );
    this.sharedTypes = rawSharedTypes;

    const [, rawLocalJSX] = /declare namespace LocalJSX {((?:\s|.)*}\s})/.exec(bundleDtsContent) ?? [];
    this.rawLocalJSX = rawLocalJSX;
    let [, rawIntrinsicElements] = /interface IntrinsicElements ({(?:\s|.)*?})/.exec(rawLocalJSX) ?? [];

    rawIntrinsicElements = rawIntrinsicElements.replace(/ (\w+);/g, " '$1',");
    this.intrinsicElements = eval(`(${rawIntrinsicElements})`);

    console.log(`Found ${Object.keys(this.intrinsicElements).length} intrinsicElements in ${bundleDtsFileName}`);
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
    return rawComponentInterface;
  }

  public getComponentInterface(component: TagName): ParsedInterface {
    let rawInterface = this.getRawComponentInterface(component);
    rawInterface = rawInterface.replace(/\?: ((?:\s|.)*?);/g, ": '$1',");

    const parsedInterface: ParsedInterface = eval(`(${rawInterface})`);
    return parsedInterface;
  }

  public canHaveChildren(component: TagName): boolean {
    const whitelistedComponents: TagName[] = ['p-flex', 'p-flex-item', 'p-grid', 'p-grid-item'];
    if (whitelistedComponents.includes(component)) {
      return true;
    }

    const fileName = `${component}.cjs.entry.js`;
    const filePath = path.resolve(CJS_DIRECTORY, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    return fileContent.includes('h("slot"');
  }
}
