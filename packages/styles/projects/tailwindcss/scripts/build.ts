import fs from 'node:fs';
import { tailwindcssTheme } from '../src';

const targetPath = './dist';
const targetFile = 'index.css';

fs.rmSync(targetPath, { force: true, recursive: true });
fs.mkdirSync(targetPath, { recursive: true });
fs.writeFileSync(`./${targetPath}/${targetFile}`, tailwindcssTheme);
