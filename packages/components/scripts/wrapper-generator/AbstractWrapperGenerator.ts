import type { TagName } from '@porsche-design-system/shared';
import { INTERNAL_TAG_NAMES } from '@porsche-design-system/shared';
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
  protected ignoreComponents: TagName[] = INTERNAL_TAG_NAMES;
  private libDir: string = '';
  private componentsDir: string = '';

  protected inputParser = InputParser.Instance;
  private dataStructureBuilder = DataStructureBuilder.Instance;
  protected intrinsicElements = this.inputParser.getIntrinsicElements();
  protected relevantComponentTagNames: TagName[] = [];
  protected unexposedComponentTagNames: TagName[] = INTERNAL_TAG_NAMES;

  public generate(): void {
    console.log(`Generating wrappers for package '${this.packageDir}' in project '${this.projectDir}'`);
    this.setRelevantComponentTagNames();
    this.generateDirs();
    this.generateSharedTypes();
    this.generateComponentWrappers();
    this.generateBarrelFile();
    this.generateAdditionalFiles();
    console.log(`Generated wrappers for package '${this.packageDir}' in project '${this.projectDir}'`);
  }

  private setRelevantComponentTagNames(): void {
    this.relevantComponentTagNames = (Object.keys(this.intrinsicElements) as TagName[]).filter(
      (item) => !this.ignoreComponents.includes(item)
    );
  }

  private generateDir(dirName: string): void {
    fs.rmSync(dirName, { force: true, recursive: true });
    fs.mkdirSync(dirName, { recursive: true });
  }

  private generateDirs(): void {
    this.libDir = path.resolve(BASE_DIR, this.packageDir, 'projects', this.projectDir, 'src/lib');
    this.componentsDir = path.resolve(this.libDir, 'components');

    this.generateDir(this.libDir);
    this.generateDir(this.componentsDir);
  }

  private generateSharedTypes(): void {
    const content = this.inputParser.getSharedTypes();

    const targetFileName = 'types.ts';
    const targetFile = path.resolve(this.libDir, targetFileName);

    fs.writeFileSync(targetFile, content);
    console.log(`Generated shared types: ${targetFile}`);
  }

  private getComponentSubDir(component: TagName): string {
    return this.shouldGenerateFolderPerComponent(component) ? this.stripFileExtension(component) : '';
  }

  private generateBarrelFile(): void {
    const targetFile = path.resolve(this.componentsDir, this.barrelFileName);

    const componentExports = this.relevantComponentTagNames
      .filter((tagName) => !this.unexposedComponentTagNames.includes(tagName))
      .map((component) => {
        const componentSubDir = this.getComponentSubDir(component);
        const componentFileNameWithoutExtension = this.stripFileExtension(component);

        return this.getBarrelFileContent(componentFileNameWithoutExtension, componentSubDir);
      })
      .join('\n');

    const content = [this.getAdditionalBarrelFileContent(), componentExports].filter((x) => x).join('\n\n');

    fs.writeFileSync(targetFile, content);
    console.log(`Generated barrel: ${this.barrelFileName}`);
  }

  private generateComponentWrappers(): void {
    this.relevantComponentTagNames
      // .filter((tagName) => tagName === 'p-toast') // temporary filter for easier development
      .forEach((component) => {
        this.generateComponentWrapper(component);
      });

    console.log(`Generated ${this.relevantComponentTagNames.length} components`);
  }

  private generateComponentWrapper(component: TagName): void {
    const extendedProps = this.dataStructureBuilder.convertToExtendedProps(component);
    const rawComponentInterface = this.inputParser.getRawComponentInterface(component);
    const nonPrimitiveTypes = this.dataStructureBuilder.extractNonPrimitiveTypes(rawComponentInterface);

    const importsDefinition = this.generateImports(component, extendedProps, nonPrimitiveTypes);
    const propsDefinition = this.generateProps(component, rawComponentInterface);
    const wrapperDefinition = this.generateComponent(component, extendedProps);

    const content = this.transformContent(
      [importsDefinition, propsDefinition, wrapperDefinition].filter((x) => x).join('\n\n')
    );

    const componentSubDir = this.getComponentSubDir(component);
    if (componentSubDir) {
      this.generateDir(path.resolve(this.componentsDir, componentSubDir));
    }

    const targetFileName = this.getComponentFileName(component);
    const targetFile = path.resolve(this.componentsDir, componentSubDir, targetFileName);

    fs.writeFileSync(targetFile, content);
    // console.log(`Generated wrapper: ${targetFileName}`);
  }

  private generateAdditionalFiles(): void {
    const files = this.getAdditionalFiles();
    if (files.length) {
      files.forEach(({ name, content, relativePath = '' }) => {
        const targetDir = path.resolve(this.componentsDir, relativePath);
        const targetFile = path.resolve(targetDir, name);

        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(targetFile, content);
        console.log(`Generated file: ${relativePath}/${name}`);
      });
    }
  }

  public stripFileExtension(component: TagName): string {
    return path.parse(this.getComponentFileName(component)).name;
  }

  // helper to possibly inject additional contents into barrel file
  public getAdditionalBarrelFileContent(): string {
    return '';
  }

  // helper that can be used to inject other files to be generated
  public getAdditionalFiles(): AdditionalFile[] {
    return [];
  }

  // helper that can be used to have wrapper generated into separate folder
  public shouldGenerateFolderPerComponent(_: TagName): boolean {
    return false;
  }

  public getBarrelFileContent(componentFileNameWithoutExtension: string, componentSubDir?: string): string {
    return `export * from './${componentSubDir ? componentSubDir + '/' : ''}${componentFileNameWithoutExtension}';`;
  }

  // Can be used to transform content e.g. indentation
  public transformContent(content: string): string {
    return content;
  }

  // prettier-ignore
  public abstract generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string;
  public abstract generateProps(component: TagName, rawComponentInterface: string): string;
  public abstract generateComponent(component: TagName, extendedProps: ExtendedProp[]): string;
  public abstract getComponentFileName(component: TagName): string;
}
