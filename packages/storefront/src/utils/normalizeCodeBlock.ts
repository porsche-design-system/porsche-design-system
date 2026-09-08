export const normalizeCodeBlock = (code: string): string => {
  const lines = code.replace(/\r\n?/g, '\n').split('\n');

  while (lines[0]?.trim() === '') {
    lines.shift();
  }
  while (lines.at(-1)?.trim() === '') {
    lines.pop();
  }

  const nonEmptyLines = lines.filter((line) => line.trim() !== '');
  if (nonEmptyLines.length === 0) {
    return '';
  }

  const indentation = Math.min(...nonEmptyLines.map((line) => line.match(/^\s*/)?.[0].length ?? 0));

  return lines.map((line) => (line.trim() === '' ? '' : line.slice(indentation))).join('\n');
};
