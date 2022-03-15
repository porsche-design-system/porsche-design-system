import * as fs from 'fs';
import * as path from 'path';
import { componentMeta } from '@porsche-design-system/shared';

const PDS_PATCH_START = '// PDS PATCH START';
const PDS_PATCH_EMD = '// PDS PATCH END';

/**
 * This script patches stencil.js behaviour when loading components:
 * When the shadowDom is attached by stencil, any child becomes "invisible".
 * To enable us to see skeleton components slotted inside e.g. p-fieldset-wrapper while it is being loaded, we patch a slot into it.
 * Finally, once the component is loaded, we remove that added slot again.
 */
const patchStencil = (): void => {
  const tagNamesToAddSlotTo = Object.entries(componentMeta).reduce((prev, [tagName, value]) => {
    return value.shouldPatchSlot ? [...prev, tagName] : prev;
  }, []);
  const tagNamesToAddSlotToAsString = `[${tagNamesToAddSlotTo.map((x) => `'${x}'`).join(', ')}]`;

  const stencilIndexFilePath = path.resolve(require.resolve('@stencil/core'), '../../client', 'index.js');
  const stencilIndexFile = fs.readFileSync(stencilIndexFilePath, 'utf-8');
  const pdsPatchStartRegEx = new RegExp(`(${PDS_PATCH_START})`, 'g');
  const getScriptPatchMarkerCount = (script: string) => (script.match(pdsPatchStartRegEx) || []).length;

  if (getScriptPatchMarkerCount(stencilIndexFile) === 0) {
    // no markers found, patch the stencil script
    const addSkeletonSlotScript = `                            ${PDS_PATCH_START}
                            if (${tagNamesToAddSlotToAsString}.includes(cmpMeta.$tagName$)) {
                              self.shadowRoot.appendChild(document.createElement('slot'))
                            }
                            ${PDS_PATCH_EMD}
`;
    const removeSkeletonSlotScript = `    ${PDS_PATCH_START}
    const hasPatchedSkeletonSlot = ${tagNamesToAddSlotToAsString}.some(tagName => {
        const tagNameRegExp = new RegExp(\`\${tagName.toUpperCase()}(?!-)\`);
        return elm.tagName.match(tagNameRegExp);
    });
    if (hasPatchedSkeletonSlot) {
        elm.shadowRoot.removeChild(elm.shadowRoot.firstChild);
    }
    ${PDS_PATCH_EMD}
`;
    // add skeleton slot script
    let patchedStencilIndexFile = stencilIndexFile.replace(
      /(self\.attachShadow\(\{ mode: 'open' \}\);\n.*?\}\n)/g,
      `$1${addSkeletonSlotScript}`
    );

    if (getScriptPatchMarkerCount(patchedStencilIndexFile) !== 1) {
      process.stderr.write(
        `Failed patching skeleton slot for ${tagNamesToAddSlotToAsString} into stencil. Position for addSkeletonSlotScript not found.\n`
      );
      return;
    }
    // remove skeleton slot script
    patchedStencilIndexFile = patchedStencilIndexFile.replace(
      /(.*?if \(BUILD\.style && isInitialLoad\) \{)/g,
      `${removeSkeletonSlotScript}$1`
    );

    if (getScriptPatchMarkerCount(patchedStencilIndexFile) === 2) {
      // patched successfully
      fs.writeFileSync(stencilIndexFilePath, patchedStencilIndexFile);
      process.stdout.write(`Successfully patched skeleton slot for ${tagNamesToAddSlotToAsString} into stencil.\n`);
    } else if (getScriptPatchMarkerCount(patchedStencilIndexFile) === 1) {
      process.stderr.write(
        `Failed patching skeleton slot for ${tagNamesToAddSlotToAsString} into stencil. Position for removeSkeletonSlotScript not found.\n`
      );
    } else {
      // something went wrong, not writing to file
      process.stderr.write(
        `Failed patching skeleton slot for ${tagNamesToAddSlotToAsString} into stencil. Not all markers were found.\n`
      );
    }
  } else {
    process.stderr.write(`Stencil already patched. Doing nothing.\n`);
  }
};

patchStencil();
