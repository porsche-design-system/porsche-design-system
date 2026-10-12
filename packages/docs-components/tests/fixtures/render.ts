import { renderMdxFileToMarkdown } from '../../src/renderer';

const [file] = process.argv.slice(2);

process.stdout.write(await renderMdxFileToMarkdown(file, { framework: 'react', destination: 'web' }));
