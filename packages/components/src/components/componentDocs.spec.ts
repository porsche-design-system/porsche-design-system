import * as fs from 'node:fs';
import * as path from 'node:path';
import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import * as globby from 'globby-legacy';

const componentsDir = path.resolve(__dirname);
const sourceFilePaths = globby.sync(`${componentsDir}/**/*.tsx`).sort();

describe.each<TagName>(
  TAG_NAMES.filter(
    (x) =>
      ![
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
              ? slotName
                  .replace(/slot/i, '')
                  .toLowerCase() // <slot name={slotHeading} /> let's hope its name matches the value
              : slotName; // <slot name="heading" />
          }
          return ''; // Default slot
        }
      );

      // Filter out duplicates (if same slots are defined more than once e.g. p-canvas for mobile/desktop view) and internal slots
      const namedSlotsUnique = [...new Set(namedSlots)].filter(
        (slot) => !slot.includes('internal') && !slot.includes('INTERNAL')
      );

      if (sourceFileContent.includes('<Label')) {
        namedSlotsUnique.push('label');
        namedSlotsUnique.push('label-after');
      }
      if (/<(Label|LegacyLabel)[\s\S]+?description/.test(sourceFileContent)) {
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

      // TODO: Add @slot type validation
    });
  } else {
    describe.skip('slots', () => {
      // vitest throw an error if no tests are defined
      it('has no slots', () => {});
    });
  }

  const hasControlledAnnotation = sourceFileContent.includes('@controlled');

  if (hasControlledAnnotation) {
    describe('controlled', () => {
      const controlledDocs: ComponentMeta['controlledMeta'] = Array.from(
        sourceFileContent.matchAll(/@controlled\s*({.*})/g)
      ).map(([, controlledInfo]) => JSON.parse(controlledInfo));
      const props = Array.from(sourceFileContent.matchAll(/@Prop\(.*\) public ([a-zA-Z]+)/g)).map(
        ([, propName]) => propName
      );
      const events = Array.from(sourceFileContent.matchAll(/@Event\(.*\) public ([a-zA-Z]+)/g)).map(
        ([, eventName]) => eventName
      );

      it('should have controlled docs including only valid props and event names.', () => {
        controlledDocs.forEach((controlledDoc) => {
          controlledDoc.props.forEach((prop) => {
            expect(props).toContain(prop);
          });
          expect(events).toContain(controlledDoc.event);
        });
      });
    });

    // TODO: Add @controlled type validation
  }
});
