import * as fs from 'fs';
import * as path from 'path';
import { PDS_PATCH_END, PDS_PATCH_START } from './constants';
import { backupOrRestoreFile, escapeString, getPatchMarkerCount } from './utils';

/**
 * ## Stencil Compiler Patch: Boolean Shorthand Prop Fix
 *
 * This patch ensures boolean shorthand props work with complex types like `BreakpointCustomizable<boolean>`.
 *
 * ### **Background**
 * Stencil determines prop types using `propTypeFromTSType`. If a prop is a **union of primitive types**
 * (e.g., `string | boolean | number`), Stencil defaults to `any`, breaking shorthand usage (`<my-component compact />`).
 *
 * ### **Problem**
 * Stencil classifies mixed primitive types as `any` using:
 * ```typescript
 * if (Number(isStr) + Number(isNu) + Number(isBool) > 1) {
 *   return 'any';
 * }
 * ```
 * This makes `number | boolean` → `any`, preventing `parsePropertyValue` from applying boolean parsing.
 *
 * ### **Solution**
 * This patch **prioritizes `boolean` when present in a union**, ensuring shorthand usage works.
 *
 * ### **Patch Behavior**
 * - **Before:** `compact: number | boolean` → `any` (**breaks**)
 * - **After:** `compact: number | boolean` → `boolean` (**works**)
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
