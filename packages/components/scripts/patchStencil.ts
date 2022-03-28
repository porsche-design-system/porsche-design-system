import * as fs from 'fs';
import * as path from 'path';
import { componentMeta, SKELETONS_ACTIVE } from '@porsche-design-system/shared';

const PDS_PATCH_START = '// PDS PATCH START';
const PDS_PATCH_EMD = '// PDS PATCH END';

/**
 * This script patches stencil.js behaviour when loading components:
 * When the shadowDom is attached by stencil, any child becomes "invisible".
 * To enable us to see skeleton components slotted inside e.g. p-fieldset-wrapper while it is being loaded, we patch a slot into it.
 * Finally, once the component is loaded, we remove that added slot again.
 */
const patchStencil = (): void => {
  const stencilIndexFilePath = path.resolve(require.resolve('@stencil/core'), '../../client/index.js');
  const stencilIndexFileBackupPath = path.resolve(stencilIndexFilePath, '../index-original.js');

  if (fs.existsSync(stencilIndexFileBackupPath)) {
    // restore backup
    fs.copyFileSync(stencilIndexFileBackupPath, stencilIndexFilePath);
  } else {
    // create backup
    fs.copyFileSync(stencilIndexFilePath, stencilIndexFileBackupPath);
  }

  if (!SKELETONS_ACTIVE) {
    process.stdout.write(`Skeletons not active. No patch needed.\n`);
  } else {
    const tagNamesToAddSlotTo = Object.entries(componentMeta).reduce((prev, [tagName, value]) => {
      return value.shouldPatchSlot ? [...prev, tagName] : prev;
    }, [] as string[]);
    const tagNamesToAddSlotToAsString = `[${tagNamesToAddSlotTo.map((x) => `'${x}'`).join(', ')}]`;

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
    // NOTE: this following is executed on every component update
    const hasPatchedSkeletonSlot = ${tagNamesToAddSlotToAsString}.some(tagName => {
        // using $ for string end would be great but somehow does not work with string interpolation
        // at least string start is working with prefixing
        return elm.tagName.match(new RegExp(\`^(?:[\\w-]+-)?\${tagName}(?!-)\`, 'i'));
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
        throw new Error(
          `Failed patching skeleton slot for ${tagNamesToAddSlotToAsString} into stencil. Position for addSkeletonSlotScript not found.\n`
        );
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
        throw new Error(
          `Failed patching skeleton slot for ${tagNamesToAddSlotToAsString} into stencil. Position for removeSkeletonSlotScript not found.\n`
        );
      } else {
        // something went wrong, not writing to file
        throw new Error(
          `Failed patching skeleton slot for ${tagNamesToAddSlotToAsString} into stencil. Not all markers were found.\n`
        );
      }
    } else {
      process.stdout.write(`Stencil already patched. Doing nothing.\n`);
    }
  }
};

patchStencil();
