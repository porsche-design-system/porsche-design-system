const MODULE_REFERENCE_REGEX =
  /\bfrom\s*['"]([^'"]+)['"]|\bimport\s*\(?\s*['"]([^'"]+)['"]|\/\/\/\s*<reference\s+(?:path|types)\s*=\s*['"]([^'"]+)['"]/g;

/**
 * The definitions file is shipped as a single file, so every module it references would be missing for consumers.
 */
export const getModuleReferences = (content: string): string[] =>
  Array.from(
    content.matchAll(MODULE_REFERENCE_REGEX),
    ([, from, imported, reference]) => from || imported || reference
  );
