import * as path from 'path';
import * as fs from 'fs';

const addChunkNamesToPartialValidation = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');

  const validatePartialUsageName = 'src/utils/validation/partials/validatePartialUsage.ts';
  const validatePartialUsagePath = path.resolve(rootDirectory, validatePartialUsageName);
  const validatePartialUsageContent = fs.readFileSync(validatePartialUsagePath, 'utf8');

  const chunksManifestName = '../components-js/projects/components-wrapper/lib/chunksManifest.ts';
  const chunksManifestPath = path.resolve(rootDirectory, chunksManifestName);
  const chunksManifestContent = fs.readFileSync(chunksManifestPath, 'utf8');

  const componentChunkNamesRegex = /export const COMPONENT_CHUNK_NAMES = \[[a-z'\-, ]*]/g;
  const componentChunkNames = chunksManifestContent.match(componentChunkNamesRegex)![0];

  if (validatePartialUsageContent.match(componentChunkNamesRegex)) {
    fs.writeFileSync(
      validatePartialUsagePath,
      validatePartialUsageContent.replace(componentChunkNamesRegex, componentChunkNames)
    );
  } else {
    fs.writeFileSync(
      validatePartialUsagePath,
      `// prettier-ignore
${componentChunkNames};

${validatePartialUsageContent}`
    );
  }
};

addChunkNamesToPartialValidation();
