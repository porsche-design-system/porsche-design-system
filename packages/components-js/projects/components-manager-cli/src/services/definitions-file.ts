import * as ts from 'typescript';

/**
 * The definitions file is shipped as a single file, so every module it references would be missing for consumers.
 * Uses the TypeScript scanner, so import-like text in comments and string literals is ignored.
 */
export const getModuleReferences = (content: string): string[] => {
  const { importedFiles, referencedFiles, typeReferenceDirectives } = ts.preProcessFile(content, true, true);
  return [...importedFiles, ...referencedFiles, ...typeReferenceDirectives].map(({ fileName }) => fileName);
};
