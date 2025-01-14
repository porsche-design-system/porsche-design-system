import * as fs from 'fs';
import * as path from 'path';

const PDS_PATCH_COMMENT = '/* ========= PDS PATCH ========= */';

const escapeString = (str: string): string => str.replace(/[\\"'()\[\]{}.?+*^$|]/g, '\\$&');

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
const patchStencilCompiler = (): void => {
  const stencilFilePath = path.resolve(require.resolve('@stencil/core'), '../../../compiler/stencil.js');

  const pdsPatchValue = `createIdentifier("attachInternals?.") ${PDS_PATCH_COMMENT}`;
  const pdsPatchRegExPattern = escapeString(pdsPatchValue);

  const fileContent = fs.readFileSync(stencilFilePath, 'utf8');
  const pdsPatchRegEx = new RegExp(pdsPatchRegExPattern, 'g');
  const getPatchCount = (script: string): number => (script.match(pdsPatchRegEx) || []).length;

  if (getPatchCount(fileContent) === 0) {
    const newFileContent = fileContent.replace(/createIdentifier\("attachInternals"\)/g, pdsPatchValue);

    if (getPatchCount(newFileContent) !== 2) {
      throw new Error('Failed patching stencil core. Position for snippets not found.\n');
    } else {
      fs.writeFileSync(stencilFilePath, newFileContent);
      process.stdout.write('Successfully patched stencil compiler.\n');
    }
  } else {
    process.stdout.write('Stencil compiler already patched. Doing nothing.\n');
  }
};

patchStencilCompiler();
