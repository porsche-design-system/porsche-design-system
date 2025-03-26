import * as fs from 'fs';
import * as path from 'path';
import { PDS_PATCH_END, PDS_PATCH_START } from './constants';
import { backupOrRestoreFile, escapeString, getPatchMarkerCount } from './utils';

/**
 * ## Stencil Compiler Patch: Boolean Shorthand Prop Fix
 *
 * This script patches Stencil’s compiler to ensure that boolean shorthand props still work
 * when used in combination with complex types like `BreakpointCustomizable<boolean>`.
 *
 * ### **Background**
 * By default, Stencil determines prop types using `propTypeFromTSType`. However, when a prop is
 * defined as a **union of primitive types** (e.g., `string | boolean | number`), Stencil defaults
 * to `"any"`. This prevents boolean shorthand usage (`<my-component compact></my-component>`)
 * from resolving correctly.
 *
 * ### **Problem**
 * In the `propTypeFromTSType` function, Stencil marks **any combination of primitive types** as `"any"`
 * using the following logic:
 * ```typescript
 * if (Number(isStr) + Number(isNu) + Number(isBool) > 1) {
 *   return 'any';
 * }
 * ```
 * This means that a type like number | boolean will be classified as "any", which prevents shorthand boolean usage from
 * working because `parsePropertyValue` does not apply boolean parsing logic to properties of type any.
 *
 * ### **Solution**
 * This patch **injects a boolean check before the existing type resolution logic**
 * to ensure that **whenever `boolean` is present in the type union, the prop is treated as `boolean`**.
 *
 * ### **Patch Behavior**
 * - **Before:** `compact: number | boolean` → `"any"` (shorthand **breaks**)
 * - **After:** `compact: number | boolean` → `"boolean"` (shorthand **works**)
 *
 * This ensures that shorthand boolean props work **even when other types are present in the union** by injecting a
 * boolean prioritization check before Stencil's default type-handling logic.
 */
const patchStencilPropDecorator = (): void => {
  const stencilFilePath = path.resolve(require.resolve('@stencil/core'), '../../../compiler/stencil.js');
  backupOrRestoreFile(stencilFilePath);

  const pdsPatchSnippet = `
  const isBool = checkType(type, isBoolean2);
  ${PDS_PATCH_START}
  if (isBool) {
    return "boolean";
  }
  ${PDS_PATCH_END}\n`;

  const pdsPatchRegExPattern = escapeString(pdsPatchSnippet);

  const fileContent = fs.readFileSync(stencilFilePath, 'utf8');
  const pdsPatchRegEx = new RegExp(pdsPatchRegExPattern, 'g');

  if (getPatchMarkerCount(fileContent, pdsPatchRegEx) === 0) {
    const newFileContent = fileContent.replace(/const isBool = checkType\(type, isBoolean2\);/g, pdsPatchSnippet);

    if (getPatchMarkerCount(newFileContent, pdsPatchRegEx) !== 1) {
      throw new Error('Failed patching @stencil/core compiler. Position for snippets not found.\n');
    } else {
      fs.writeFileSync(stencilFilePath, newFileContent);
      process.stdout.write('Successfully patched @stencil/core compiler.\n');
    }
  } else {
    process.stdout.write('@stencil/core compiler already patched. Doing nothing.\n');
  }
};

patchStencilPropDecorator();
