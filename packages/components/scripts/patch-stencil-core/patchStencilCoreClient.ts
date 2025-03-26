import * as fs from 'fs';
import * as path from 'path';
import { PDS_PATCH_END, PDS_PATCH_START } from './constants';
import { backupOrRestoreFile, escapeString, getPatchMarkerCount } from './utils';

/**
 * This script patches stencil core behaviour when initializing web components together with SSR/SSG.
 * When the shadowRoot is attached by stencil, it clears a previously initialized Declarative Shadow Root (DSR).
 * This causes any styles and markup to be removed until it renders again on client side.
 * To bridge this gap, we extract a previously rendered DSR's innerHTML, apply it after the shadowRoot was attached
 * and remove it again, once the component renders regularly.
 *
 * Basically it fixes: Flash of Hydration
 */
const patchStencilSSRHydration = (fileContent: string): string => {
  const pdsPatchStartRegEx = new RegExp(`(${PDS_PATCH_START})`, 'g');

  if (getPatchMarkerCount(fileContent, pdsPatchStartRegEx) === 0) {
    // no markers found, patch stencil core
    const extractSnippet = `
                            ${PDS_PATCH_START}
                            let ssrInnerHTML = '';
                            if (self.shadowRoot) {
                              ssrInnerHTML = self.shadowRoot.innerHTML;
                              self.hasDSR = true;
                            }
                            ${PDS_PATCH_END}\n`;

    const applySnippetPart1 = `
                                ${PDS_PATCH_START}
                                // in dsr ponyfilled browsers (e.g. Safari), the shadowRoot is already attached
                                // and a 2nd attempt fails, therefore this needs to always run without SSR
                                // and only with SSR for browsers that are not ponyfilled
                                if (!self.hasDSR || HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
                                ${PDS_PATCH_END}\n`;

    const applySnippetPart2 = `
                                ${PDS_PATCH_START}
                                    self.shadowRoot.innerHTML = ssrInnerHTML;
                                }
                                ${PDS_PATCH_END}\n\n`;

    const cleanupSnippet = `

    ${PDS_PATCH_START}
    if (elm.hasDSR) {
        elm.shadowRoot.innerHTML = '';
        delete elm.hasDSR;
    }
    ${PDS_PATCH_END}\n`;

    const newFileContent = fileContent
      // inject applying snippets
      .replace(
        /(if \(supportsShadow\) {)(\s+if \(!self\.shadowRoot\) {\s+if \(BUILD[0-9]{2}\.shadowDelegatesFocus\) {)([\s\S]+?;\n)/,
        `$1${extractSnippet}$2${applySnippetPart1}$3${applySnippetPart2}`
      )
      // inject cleanup snippet
      .replace(
        /\s+if \(BUILD[0-9]{2}\.hydrateServerSide\) {\s+await callRender\(hostRef, instance, elm, isInitialLoad\);/,
        `${cleanupSnippet}$&`
      );

    if (getPatchMarkerCount(newFileContent, pdsPatchStartRegEx) !== 4) {
      throw new Error('Failed patching @stencil/core client. Position for snippets not found.\n');
    }
    return newFileContent;
  }
  process.stdout.write('@stencil/core client already patched. Doing nothing.\n');
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
 * This patch updates `parsePropertyValue` to ensure that:
 * - If a prop has type `any`, an empty string (`""`) is interpreted as `true`, preserving shorthand behavior.
 *
 * ### **Patch Behavior**
 * - **Before:** `compact: number | boolean` → **ignored** (shorthand fails)
 * - **After:** `compact: number | boolean` → **parsed as `true`** (shorthand works)
 */
const patchStencilParsePropertyValue = (fileContent: string): string => {
  const pdsPatchSnippet = `
  if (propValue != null && !isComplexType(propValue)) {
   ${PDS_PATCH_START}
    if (propType & 8 /* Any */) {
      return propValue === '' ? true : propValue;
    }
    ${PDS_PATCH_END}\n`;

  const pdsPatchRegExPattern = escapeString(pdsPatchSnippet);
  const pdsPatchRegEx = new RegExp(pdsPatchRegExPattern, 'g');

  if (getPatchMarkerCount(fileContent, pdsPatchRegEx) === 0) {
    const newFileContent = fileContent.replace(
      /if \(propValue != null && !isComplexType\(propValue\)\) \{/g,
      pdsPatchSnippet
    );
    if (getPatchMarkerCount(newFileContent, pdsPatchRegEx) !== 1) {
      throw new Error('Failed patching @stencil/core compiler. Position for snippets not found.\n');
    }
    return newFileContent;
  }

  process.stdout.write('@stencil/core compiler already patched. Doing nothing.\n');
  return fileContent;
};

const patchStencilCoreClient = (): void => {
  const stencilFilePath = path.resolve(require.resolve('@stencil/core'), '../../client/index.js');
  backupOrRestoreFile(stencilFilePath);

  let fileContent = fs.readFileSync(stencilFilePath, 'utf8');
  fileContent = patchStencilSSRHydration(fileContent);
  fileContent = patchStencilParsePropertyValue(fileContent);

  fs.writeFileSync(stencilFilePath, fileContent);
  process.stdout.write('Successfully patched @stencil/core client.\n');
};

patchStencilCoreClient();
