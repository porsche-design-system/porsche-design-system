import fs from 'node:fs';
import { getTailwindcssTheme } from '../src';

const targetPath = './dist';
const targetFile = 'index.css';

const isDev = process.env.NODE_ENV === 'development';
const cdn = isDev ? 'localhost' : 'com';

fs.rmSync(targetPath, { force: true, recursive: true });
fs.mkdirSync(targetPath, { recursive: true });
fs.writeFileSync(`./${targetPath}/${targetFile}`, getTailwindcssTheme(cdn));

console.log(`Built Tailwind CSS theme in ${isDev ? 'development' : 'production'} mode (cdn: ${cdn})`);
