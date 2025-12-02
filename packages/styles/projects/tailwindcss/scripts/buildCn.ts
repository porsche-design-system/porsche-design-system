import fs from 'node:fs';
import { getTailwindcssTheme } from '../src';

const targetPath = './dist/cn';
const targetFile = 'index.css';

fs.rmSync(targetPath, { force: true, recursive: true });
fs.mkdirSync(targetPath, { recursive: true });
fs.writeFileSync(`./${targetPath}/${targetFile}`, getTailwindcssTheme('cn'));
