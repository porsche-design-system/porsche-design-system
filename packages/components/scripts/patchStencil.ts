import * as fs from 'fs';
import * as path from 'path';

const patchStencil = (): void => {
  const FIELDSET_TAG_NAME = 'p-fieldset-wrapper';
  const rootDirectory = path.resolve(__dirname, '../../../');
  const stencilIndexFilePath = path.resolve(rootDirectory, 'node_modules/@stencil/core/internal/client', 'index.js');
  const stencilIndexFile = fs.readFileSync(stencilIndexFilePath, 'utf-8');

  const removeSkeletonFirstChild = 'elm.shadowRoot.removeChild(elm.shadowRoot.firstChild);';

  if (!stencilIndexFile.includes(removeSkeletonFirstChild)) {
    const skeletonSlotScript = `                        if (cmpMeta.$tagName$ === '${FIELDSET_TAG_NAME}') {
                          const skeletonSlot = document.createElement('slot');
                          self.shadowRoot.appendChild(skeletonSlot)
                        }
`;
    const removeSkeletonSlotScript = `            if (elm.tagName === '${FIELDSET_TAG_NAME.toUpperCase()}') {
              ${removeSkeletonFirstChild}
            }
`;

    const patchedStencilIndexFile = stencilIndexFile
      .replace(/(self\.attachShadow\(\{ mode: 'open' \}\);\n.*?\}\n)/g, `$1${skeletonSlotScript}`) // add skeleton slot script
      .replace(/(.*?addHydratedFlag\(elm\);)/g, `${removeSkeletonSlotScript}$1`); // remove skeleton slot script

    fs.writeFileSync(stencilIndexFilePath, patchedStencilIndexFile);
    process.stdout.write(`Successfully patched skeleton slot for ${FIELDSET_TAG_NAME} into stencil.\n`);
  }
};

patchStencil();
