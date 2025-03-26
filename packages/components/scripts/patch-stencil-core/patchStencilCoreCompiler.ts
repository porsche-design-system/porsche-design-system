import * as fs from 'fs';
import * as path from 'path';
import { PDS_PATCH_COMMENT, PDS_PATCH_END, PDS_PATCH_START } from './constants';
import { backupOrRestoreFile, escapeString, getPatchMarkerCount } from './utils';

/**
 * This script patches the bindings for the `ElementInternals` object created by the Stencil compiler to support
 * lazy-load ready Stencil components (`createLazyAttachInternalsBinding`) and 'native' components
 * (`createNativeAttachInternalsBinding`).
 *
 * **Background:**
 * Browser support for the Element Internals API is limited. For the latest compatibility information, see:
 * https://caniuse.com/mdn-api_elementinternals. The Stencil team does not currently plan to support or include
 * polyfills for this browser functionality.
 *
 * **Issue:**
 * Stencil components utilizing the `@AttachInternals()` decorator and declaring `private internals: ElementInternals`
 * will fail to render in unsupported browsers, throwing a `TypeError`:
 *
 * `TypeError: e.$hostElement$.attachInternals is not a function`
 *
 * **Solution:**
 * To address this, we modify the method call to use the optional chaining operator. This ensures compatibility
 * with browsers that do not support the Element Internals API by avoiding the runtime error:
 *
 * ```typescript
 * // Original method call:
 * this.internals = hostRef.$hostElement$.attachInternals();
 *
 * // Updated method call with optional chaining:
 * this.internals = hostRef.$hostElement$.attachInternals?.();
 * ```
 */
const patchStencilElementInternals = (fileContent: string): string => {
  const pdsPatchValue = `createIdentifier("attachInternals?.") ${PDS_PATCH_COMMENT}`;
  const pdsPatchRegExPattern = escapeString(pdsPatchValue);
  const pdsPatchRegEx = new RegExp(pdsPatchRegExPattern, 'g');

  if (getPatchMarkerCount(fileContent, pdsPatchRegEx) === 0) {
    const newFileContent = fileContent.replace(/createIdentifier\("attachInternals"\)/g, pdsPatchValue);
    if (getPatchMarkerCount(newFileContent, pdsPatchRegEx) !== 2) {
      throw new Error('Failed patching @stencil/core compiler. Position for snippets not found.\n');
    }
    return newFileContent;
  }

  process.stdout.write('@stencil/core compiler already patched. Doing nothing.\n');
  return fileContent;
};

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
const patchStencilPropDecorator = (fileContent: string): string => {
  const pdsPatchSnippet = `
  const isBool = checkType(type, isBoolean2);
  ${PDS_PATCH_START}
  if (isBool) {
    return "boolean";
  }
  ${PDS_PATCH_END}\n`;

  const pdsPatchRegExPattern = escapeString(pdsPatchSnippet);
  const pdsPatchRegEx = new RegExp(pdsPatchRegExPattern, 'g');

  if (getPatchMarkerCount(fileContent, pdsPatchRegEx) === 0) {
    const newFileContent = fileContent.replace(/const isBool = checkType\(type, isBoolean2\);/g, pdsPatchSnippet);
    if (getPatchMarkerCount(newFileContent, pdsPatchRegEx) !== 1) {
      throw new Error('Failed patching @stencil/core compiler. Position for snippets not found.\n');
    }
    return newFileContent;
  }

  process.stdout.write('@stencil/core compiler already patched. Doing nothing.\n');
  return fileContent;
};

const patchStencilCoreCompiler = (): void => {
  const stencilFilePath = path.resolve(require.resolve('@stencil/core'), '../../../compiler/stencil.js');
  backupOrRestoreFile(stencilFilePath);

  let fileContent = fs.readFileSync(stencilFilePath, 'utf8');
  fileContent = patchStencilElementInternals(fileContent);
  fileContent = patchStencilPropDecorator(fileContent);

  fs.writeFileSync(stencilFilePath, fileContent);
  process.stdout.write('Successfully patched @stencil/core compiler.\n');
};

patchStencilCoreCompiler();
