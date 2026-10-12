import { renderMdxPage } from '../../src/renderer';

const [file] = process.argv.slice(2);

process.stdout.write(JSON.stringify(await renderMdxPage(file, { destination: 'web' })));
