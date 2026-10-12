import { renderMdxFileToMarkdown } from '../../src/markdown';

const [file] = process.argv.slice(2);

process.stdout.write(await renderMdxFileToMarkdown(file, { framework: 'react', destination: 'web' }));
