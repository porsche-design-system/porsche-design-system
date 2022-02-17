import * as fs from 'fs';
import * as path from 'path';

const patchStencil = (): void => {
  const tagNamesToAddSlotTo = ['p-fieldset-wrapper', 'p-text-list', 'p-text-list-item'];
  const tagNamesToAddSlotToAsString = `[${tagNamesToAddSlotTo.map((x) => `'${x}'`).join(', ')}]`;

  const rootDirectory = path.resolve(__dirname, '../../../');
  const stencilIndexFilePath = path.resolve(rootDirectory, 'node_modules/@stencil/core/internal/client', 'index.js');
  const stencilIndexFile = fs.readFileSync(stencilIndexFilePath, 'utf-8');

  const removeSkeletonFirstChild = 'elm.shadowRoot.removeChild(elm.shadowRoot.firstChild);';

  if (!stencilIndexFile.includes(removeSkeletonFirstChild)) {
    const addSkeletonSlotScript = `                        if (${tagNamesToAddSlotToAsString}.includes(cmpMeta.$tagName$)) {
                          const skeletonSlot = document.createElement('slot');
                          self.shadowRoot.appendChild(skeletonSlot)
                        }
`;
    const removeSkeletonSlotScript = `    const hasPatchedSkeletonSlot = ${tagNamesToAddSlotToAsString}.some(tagName => {
        const tagNameRegExp = new RegExp(\`\${tagName.toUpperCase()}(?!-)\`);
        return elm.tagName.match(tagNameRegExp);
    });
    if (hasPatchedSkeletonSlot) {
        console.log(elm.shadowRoot);
        ${removeSkeletonFirstChild}
    }
`;

    const patchedStencilIndexFile = stencilIndexFile
      .replace(/(self\.attachShadow\(\{ mode: 'open' \}\);\n.*?\}\n)/g, `$1${addSkeletonSlotScript}`) // add skeleton slot script
      .replace(/(.*?if \(BUILD\.style && isInitialLoad\) \{)/g, `${removeSkeletonSlotScript}$1`); // remove skeleton slot script

    fs.writeFileSync(stencilIndexFilePath, patchedStencilIndexFile);
    process.stdout.write(`Successfully patched skeleton slot for ${tagNamesToAddSlotToAsString} into stencil.\n`);
  }
};

patchStencil();
