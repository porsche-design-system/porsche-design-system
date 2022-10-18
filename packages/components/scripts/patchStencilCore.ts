import * as fs from 'fs';
import * as path from 'path';

const PDS_PATCH_START = '//========= PDS PATCH START';
const PDS_PATCH_EMD = '//========= PDS PATCH END';

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
                                self.isSsr = true;
                            }
                            ${PDS_PATCH_EMD}\n`;

    const applySnippet = `
                            ${PDS_PATCH_START}
                            if (ssrInnerHTML) {
                                self.shadowRoot.innerHTML = ssrInnerHTML;
                            }
                            ${PDS_PATCH_EMD}\n`;

    const cleanupSnippet = `

    ${PDS_PATCH_START}
    if (elm.isSsr) {
        elm.shadowRoot.innerHTML = '';
        delete elm.isSsr;
    }
    ${PDS_PATCH_EMD}\n`;

    // inject extract snippet
    let newFileContent = fileContent.replace(
      /\/\/ adding the shadow root build conditionals to minimize runtime\s+if \(supportsShadow\) {/,
      `$&${extractSnippet}`
    );

    if (getPatchMarkerCount(newFileContent) !== 1) {
      throw new Error('Failed patching stencil core. Position for extractSnippet not found.\n');
    }

    // inject apply snippet
    newFileContent = newFileContent.replace(/self\.attachShadow\({ mode: 'open' }\);\s+}\n/, `$&${applySnippet}`);

    if (getPatchMarkerCount(newFileContent) !== 2) {
      throw new Error('Failed patching stencil core. Position for applySnippet not found.\n');
    }

    // inject cleanup snippet
    newFileContent = newFileContent.replace(
      /\s+if \(BUILD\.hydrateServerSide\) {\s+await callRender\(hostRef, instance, elm\);/,
      `${cleanupSnippet}$&`
    );

    if (getPatchMarkerCount(newFileContent) !== 3) {
      throw new Error('Failed patching stencil core. Position for cleanupSnippet not found.\n');
    } else {
      fs.writeFileSync(stencilIndexFilePath, newFileContent);
      process.stdout.write('Successfully patched stencil core.\n');
    }
  } else {
    process.stdout.write('Stencil core already patched. Doing nothing.\n');
  }
};

patchStencilCore();
