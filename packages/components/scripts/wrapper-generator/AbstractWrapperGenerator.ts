import type { TagName } from '@porsche-design-system/shared';
import { DataStructureBuilder, ExtendedProp } from './DataStructureBuilder';
import { InputParser } from './InputParser';
import * as path from 'path';
import * as fs from 'fs';

const BASE_DIR = path.normalize('..');

export type AdditionalFile = {
  name: string;
  content: string;
  relativePath?: string;
};

export abstract class AbstractWrapperGenerator {
  protected abstract packageDir: string;
  protected projectDir: string = 'components-wrapper';
  protected barrelFileName: string = 'index.ts';
  private libDir: string = '';
  private componentsDir: string = '';

  protected inputParser = InputParser.Instance;
  private dataStructureBuilder = DataStructureBuilder.Instance;
  protected intrinsicElements = this.inputParser.getIntrinsicElements();

  private generateDir(dirName: string): void {
    fs.rmdirSync(dirName, { recursive: true });
    fs.mkdirSync(dirName, { recursive: true });
  }

  private generateDirs(): void {
    this.libDir = path.resolve(BASE_DIR, this.packageDir, 'projects', this.projectDir, 'src/lib');
    this.componentsDir = path.resolve(this.libDir, 'components');

    this.generateDir(this.libDir);
    this.generateDir(this.componentsDir);
  }

  public generate(): void {
    console.log(`Generating wrappers for package '${this.packageDir}' in project '${this.projectDir}'`);
    this.generateDirs();
    this.generateSharedTypes();
    this.generateComponentWrappers();
    this.generateBarrelFile();
    this.generateAdditionalFiles();
    console.log(`Generated wrappers for package '${this.packageDir}' in project '${this.projectDir}'`);
  }

  private generateSharedTypes(): void {
    const content = this.inputParser.getSharedTypes();

    const targetFileName = 'types.ts';
    const targetFile = path.resolve(this.libDir, targetFileName);

    fs.writeFileSync(targetFile, content);
    console.log(`Generated shared types: ${targetFileName}`);
  }

  private generateBarrelFile(): void {
    const targetFile = path.resolve(this.componentsDir, this.barrelFileName);
    const componentTagNames: TagName[] = Object.keys(this.intrinsicElements) as TagName[];

    const componentExports = componentTagNames
      .map((component) => `export * from './${this.getComponentFileName(component, true)}';`)
      .join('\n');

    const content = [this.getAdditionalBarrelFileContent(), componentExports].filter((x) => x).join('\n\n');

    fs.writeFileSync(targetFile, content);
    console.log(`Generated barrel: ${this.barrelFileName}`);
  }

  private generateComponentWrappers(): void {
    const componentTagNames: TagName[] = Object.keys(this.intrinsicElements) as TagName[];
    componentTagNames
      // .filter((_, index) => index === 11) // temporary filter for easier development
      .forEach((component) => {
        this.generateComponentWrapper(component);
      });

    console.log(`Generated ${componentTagNames.length} components`);
  }

  private generateComponentWrapper(component: TagName): void {
    const extendedProps = this.dataStructureBuilder.convertToExtendedProps(component);
    const rawComponentInterface = this.inputParser.getRawComponentInterface(component);
    const nonPrimitiveTypes = this.dataStructureBuilder.extractNonPrimitiveTypes(rawComponentInterface);

    const importsDefinition = this.generateImports(component, extendedProps, nonPrimitiveTypes);
    const propsDefinition = this.generateProps(component, rawComponentInterface);
    const wrapperDefinition = this.generateComponent(component, extendedProps);

    const content = [importsDefinition, propsDefinition, wrapperDefinition].filter((x) => x).join('\n\n');

    const targetFileName = this.getComponentFileName(component);
    const targetFile = path.resolve(this.componentsDir, targetFileName);

    fs.writeFileSync(targetFile, content);
    // console.log(`Generated wrapper: ${targetFileName}`);
  }

  private generateAdditionalFiles(): void {
    const files = this.getAdditionalFiles();
    if (files.length) {
      files.forEach(({ name, content, relativePath = '' }) => {
        const targetFile = path.resolve(this.componentsDir, relativePath, name);

        fs.writeFileSync(targetFile, content);
        console.log(`Generated file: ${name}`);
      });
    }
  }

  // helper to possible inject additional contents into barrel file
  public getAdditionalBarrelFileContent(): string {
    return '';
  }

  // helper that can be used to inject other files to be generated
  public getAdditionalFiles(): AdditionalFile[] {
    return [];
  }

  // prettier-ignore
  public abstract generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string;
  public abstract generateProps(component: TagName, rawComponentInterface: string): string;
  public abstract generateComponent(component: TagName, extendedProps: ExtendedProp[]): string;
  public abstract getComponentFileName(component: TagName, withOutExtension?: boolean): string;
}
