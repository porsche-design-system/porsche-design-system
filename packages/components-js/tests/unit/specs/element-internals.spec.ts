import * as fs from 'fs';
import * as path from 'path';

/**
 * Checks if 'attachInternals' is used without optional chaining (?.).
 */
const containsInvalidAttachInternals = (content: string): boolean => {
  const regex = /\battachInternals(?!\?\.)/;
  return regex.test(content);
};

const containsInvalidThisInternals = (content: string): boolean => {
  /**
   * Checks if 'this.internals' is accessed with a property (.) and followed by a function without using optional chaining (?.).
   */
  const regex = /\bthis\.internals\.(?!\?\.)/;
  return regex.test(content);
};

describe('Element Internals', () => {
  const dirPath = './dist/components';

  it('should ensure both attachInternals and this.internals use optional chaining (?.) only', () => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const hasInvalidAttachInternals = containsInvalidAttachInternals(content);
      const hasInvalidThisInternals = containsInvalidThisInternals(content);

      if (hasInvalidAttachInternals || hasInvalidThisInternals) {
        console.error(`Invalid usage found in file: ${file}`);
      }

      expect(hasInvalidAttachInternals).toBe(false);
      expect(hasInvalidThisInternals).toBe(false);
    });
  });
});
