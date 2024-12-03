import * as fs from 'fs';
import * as path from 'path';

/**
 * Checks if 'attachInternals' is used without optional chaining (?.).
 * The regex matches 'attachInternals' not followed by '?.'.
 */
const containsInvalidAttachInternals = (content: string): boolean => {
  const regex = /\battachInternals(?!\?\.)/;
  return regex.test(content);
};

describe('Patch Stencil Compiler', () => {
  const dirPath = './dist/components';

  it('should verify attachInternals is used with optional chaining (?.) only', () => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const isInvalid = containsInvalidAttachInternals(content);
      expect(isInvalid).toBe(false);
    });
  });
});
