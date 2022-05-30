const path = require('path');
const globby = require('globby');
const fs = require('fs');

const MEDIA_HOVER_EXPRESSION: string = "'@media (hover: hover)': {";

const componentsDirectory: string = path.resolve('../components');
const stylesDirectory: string = path.resolve('../styles');
const componentsStylesFiles: string[] = globby.sync(path.resolve(componentsDirectory, '**/**/*-styles.ts'));
const stylesStylesFiles: string[] = globby.sync(path.resolve(stylesDirectory, '*-styles.ts'));
const allStylesFiles: string[] = [...componentsStylesFiles, ...stylesStylesFiles];

const allStylesFilesNameMapper: string[] = allStylesFiles.map((file: string) => file.match(/([^\/]+$)/)[0]);

it.each(allStylesFilesNameMapper)(
  'should always have hover style wrapped in "@media(hover: hover)" for %s',
  (fileName) => {
    const filePath = allStylesFiles.find((file) => file.includes(fileName));
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const regExp = new RegExp('.*:hover{1}.*', 'g');
    const res = [...fileContent.matchAll(regExp)];
    res.forEach((result) => {
      expect(fileContent.substring(result.index - MEDIA_HOVER_EXPRESSION.length - 2, result.index)).toMatch(
        MEDIA_HOVER_EXPRESSION
      );
    });
  }
);
