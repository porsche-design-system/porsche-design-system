import * as fs from 'fs';
import * as path from 'path';

const PDS_PATCH_START = '//========= PDS PATCH START';
const PDS_PATCH_END = '//========= PDS PATCH END';

/**
 * This script patches stencil core behaviour when initializing web components together with SSR/SSG.
 * When the shadowRoot is attached by stencil, it clears a previously initialized Declarative Shadow Root (DSR).
 * This causes any styles and markup to be removed until it renders again on client side.
 * To bridge this gap, we extract a previously rendered DSR's innerHTML, apply it after the shadowRoot was attached
 * and remove it again, once the component renders regularly.
 *
 * Basically it fixes: Flash of Hydration
 */
const patchStencilCore = (): void => {
  const stencilIndexFilePath = path.resolve(require.resolve('@stencil/core'), '../../client/index.js');
  const stencilIndexFileBackupPath = path.resolve(stencilIndexFilePath, '../index-original.js');

  if (fs.existsSync(stencilIndexFileBackupPath)) {
    // restore backup
    fs.copyFileSync(stencilIndexFileBackupPath, stencilIndexFilePath);
  } else {
    // create backup
    fs.copyFileSync(stencilIndexFilePath, stencilIndexFileBackupPath);
  }

  const fileContent = fs.readFileSync(stencilIndexFilePath, 'utf8');
  const pdsPatchStartRegEx = new RegExp(`(${PDS_PATCH_START})`, 'g');
  const getPatchMarkerCount = (script: string): number => (script.match(pdsPatchStartRegEx) || []).length;

  if (getPatchMarkerCount(fileContent) === 0) {
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
        /(\/\/ adding the shadow root build conditionals to minimize runtime\s+if \(supportsShadow\) {)(\s+if \(BUILD\.shadowDelegatesFocus\) {)([\s\S]+?;\n)/,
        `$1${extractSnippet}$2${applySnippetPart1}$3${applySnippetPart2}`
      )
      // inject cleanup snippet
      .replace(
        /\s+if \(BUILD\.hydrateServerSide\) {\s+await callRender\(hostRef, instance, elm, isInitialLoad\);/,
        `${cleanupSnippet}$&`
      );

    if (getPatchMarkerCount(newFileContent) !== 4) {
      throw new Error('Failed patching stencil core. Position for snippets not found.\n');
    } else {
      fs.writeFileSync(stencilIndexFilePath, newFileContent);
      process.stdout.write('Successfully patched stencil core.\n');
    }
  } else {
    process.stdout.write('Stencil core already patched. Doing nothing.\n');
  }
};

patchStencilCore();
