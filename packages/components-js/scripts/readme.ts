import * as fs from 'fs';
import * as path from 'path';
import { getFiles } from './utils';

const updateDependencyPaths = (str: string): string => str.replace(/\(.*\/(.*?)\)/g, '(#/components/$1)');
const removeGraph = (str: string): string => str.replace(/### Graph\s+```.*```/gs, '');
const removeGenerator = (str: string): string => str.replace(/----------------------------------------------\s+\*Built with.*/g, '');
const removeWhitespace = (str: string): string => str.replace(/^\s+|\s+$/g, '');

const files = getFiles(path.normalize('./src/components'), 'readme.md');
for (const file of files) {

  const dir = path.dirname(path.normalize(file));
  const name = dir.split('/').pop();
  const readme = fs.readFileSync(path.normalize(file), 'utf8');

  fs.writeFileSync(path.normalize(file), removeWhitespace(removeGenerator(removeGraph(readme))));
  fs.writeFileSync(path.normalize(`${dir}/${name}.props.md`), removeWhitespace(removeGenerator(removeGraph(updateDependencyPaths(readme)))));
}
