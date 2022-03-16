import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta, INTERNAL_TAG_NAMES } from '@porsche-design-system/shared';
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
export type AbstractWrapperGeneratorConfig = {
  hasSkeletonSupport?: boolean;
};
export type SkeletonProps = { propName: string; shouldAddValueToClassName: boolean }[];

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

  constructor(private config: AbstractWrapperGeneratorConfig = {}) {}

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
    console.log(`Generated shared types: ${targetFileName}`);
  }

  private getComponentSubDir(component: TagName): string {
    return this.shouldGenerateFolderPerComponent(component) ? this.getComponentFileName(component, true) : '';
  }

  private generateBarrelFile(): void {
    const targetFile = path.resolve(this.componentsDir, this.barrelFileName);

    const componentExports = this.relevantComponentTagNames
      .map((component) => {
        const componentSubDir = this.getComponentSubDir(component);
        const componentFileName = this.getComponentFileName(component, true);
        return `export * from './${componentSubDir ? componentSubDir + '/' : ''}${componentFileName}';`;
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
    const componentMeta = getComponentMeta(component);
    const hasSkeleton = this.config.hasSkeletonSupport && componentMeta.hasSkeleton;

    const importsDefinition = this.generateImports(component, extendedProps, nonPrimitiveTypes, hasSkeleton);
    const propsDefinition = this.generateProps(component, rawComponentInterface);
    const wrapperDefinition = this.generateComponent(
      component,
      extendedProps,
      hasSkeleton ? componentMeta.skeletonProps : []
    );

    const content = [importsDefinition, propsDefinition, wrapperDefinition].filter((x) => x).join('\n\n');

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

  // helper to possible inject additional contents into barrel file
  public getAdditionalBarrelFileContent(): string {
    return '';
  }

  // helper that can be used to inject other files to be generated
  public getAdditionalFiles(): AdditionalFile[] {
    return [];
  }

  // helper that can be used to have wrapper generated into separate folder
  public shouldGenerateFolderPerComponent(component: TagName): boolean {
    return false;
  }

  // prettier-ignore
  public abstract generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[], hasSkeleton?: boolean): string;
  public abstract generateProps(component: TagName, rawComponentInterface: string): string;
  public abstract generateComponent(
    component: TagName,
    extendedProps: ExtendedProp[],
    skeletonProps: SkeletonProps
  ): string;
  public abstract getComponentFileName(component: TagName, withOutExtension?: boolean): string;
}
