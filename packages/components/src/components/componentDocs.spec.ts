import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby-legacy';
import { expect } from '@jest/globals';

const componentsDir = path.resolve(__dirname);
const sourceFilePaths = globby.sync(`${componentsDir}/**/*.tsx`).sort();

describe.each<TagName>(
  TAG_NAMES.filter(
    (x) =>
      ![
        'p-table-body',
        'p-table-cell',
        'p-table-head',
        'p-table-head-cell',
        'p-table-head-row',
        'p-table-row',
        'p-carousel', // Skip for now because of dynamic slot <slot name={`slide-${i}`} />
      ].includes(x)
  )
)('%s', (tagName) => {
  const componentName = tagName.replace(/^p-/, '');
  const sourceFilePath = sourceFilePaths.find((item) => item.endsWith(`/${componentName}.tsx`));
  const sourceFileContent = fs.readFileSync(sourceFilePath, 'utf8');

  const hasSlot = sourceFileContent.includes('<slot');

  if (hasSlot) {
    describe('slots', () => {
      const documentedSlots = Array.from(sourceFileContent.matchAll(/@slot\s*{\s*"name":\s*"([^"]*)"/g)).map(
        ([, slotName]) => slotName
      );

      const namedSlots = Array.from(
        sourceFileContent.matchAll(/<slot\s*(?:name=["{]([^"}]*)["}])?/g),
        ([, slotName]) => {
          if (slotName) {
            return slotName.match(/^[a-z]+[A-Z][a-z]+/)
              ? slotName.replace(/slot/i, '').toLowerCase() // <slot name={slotHeading} /> let's hope its name matches the value
              : slotName; // <slot name="heading" />
          } else {
            return ''; // Default slot
          }
        }
      );

      // Filter out duplicates (if same slots are defined more than once e.g. p-canvas for mobile/desktop view) and internal slots
      const namedSlotsUnique = [...new Set(namedSlots)].filter(
        (slot) => !slot.includes('internal') && !slot.includes('INTERNAL')
      );

      if (sourceFileContent.includes('<Label')) {
        namedSlotsUnique.push('label');
      }
      if (/<Label[\s\S]+?description/.test(sourceFileContent)) {
        namedSlotsUnique.push('description');
      }
      if (sourceFileContent.includes('<StateMessage')) {
        namedSlotsUnique.push('message');
      }

      it.each(namedSlotsUnique)('should have @slot documentation for slot: %s', (slotName) => {
        expect(documentedSlots).toContain(slotName);
      });

      it('should not have non existent documented slots', () => {
        const nonExistentDocumentedSlots = documentedSlots.filter((slot) => !namedSlotsUnique.includes(slot));
        expect(nonExistentDocumentedSlots).toHaveLength(0);
      });
    });
  }
});
