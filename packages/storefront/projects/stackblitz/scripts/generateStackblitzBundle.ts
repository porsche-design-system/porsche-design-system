import fs from 'node:fs';
import path from 'node:path';

export const readSetup = (dir: string) => {
  const rootDir = path.resolve(__dirname, dir);
  const files: Record<string, string> = {};

  const readDirectory = (dir: string, relativePath = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      const entryRelativePath = path.join(relativePath, entry.name);

      // Skip anything inside node_modules
      if (
        entry.name === './node_modules' ||
        entry.name === 'node_modules' ||
        entry.name === 'package-lock.json' ||
        entry.name === '.angular'
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        readDirectory(entryPath, entryRelativePath);
      } else if (entry.isFile()) {
        const fileContent = fs.readFileSync(entryPath, 'utf-8');
        files[entryRelativePath.replace(/\\/g, '/')] = fileContent;
      }
    }
  };

  readDirectory(rootDir);
  return files;
};

export const generateStackblitzBundle = (outputFilePath: string) => {
  const bundleVanillaJs = readSetup('../src/vanilla-js');
  const bundleAngular = readSetup('../src/angular');
  const bundleReact = readSetup('../src/react');
  const bundleVue = readSetup('../src/vue');

  const outputDir = path.dirname(outputFilePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate valid TypeScript object file
  const tsContent = `export const vanillaJsBundle: Record<string, string> = ${JSON.stringify(bundleVanillaJs, null, 2)};
export const angularBundle: Record<string, string> = ${JSON.stringify(bundleAngular, null, 2)};
export const reactBundle: Record<string, string> = ${JSON.stringify(bundleReact, null, 2)};
export const vueBundle: Record<string, string> = ${JSON.stringify(bundleVue, null, 2)};`;

  fs.writeFileSync(outputFilePath, tsContent, 'utf-8');
  console.log(`Bundle written to ${outputFilePath}`);
};

generateStackblitzBundle('./generated/bundle.ts');
