import * as fs from 'fs';
import * as path from 'path';
import globby from 'globby';

(async (): Promise<void> => {
  const updateDependencyPaths = (str: string): string => str.replace(/\(.*\/(.*?)\)/g, '(#/components/$1)');
  const updateFormPaths = (str: string): string =>
    str.replace(/\(#\/components\/(checkbox|select|text-field|radio-button|textarea)-wrapper\)/g, '(#/components/$1)');
  const updateTypographyPaths = (str: string): string =>
    str.replace(/\(#\/components\/(text|headline)\)/g, '(#/components/typography#$1)');
  const removeGraph = (str: string): string => str.replace(/### Graph\s+```.*```/gs, '');
  const removeGenerator = (str: string): string =>
    str.replace(/----------------------------------------------\s+\*Built with.*/g, '');
  const removeWhitespace = (str: string): string => str.replace(/^\s+|\s+$/g, '');
  const removeEscapedPipe = (str: string): string => str.replace(/\\\|/g, '|');
  const cleanBreakpointCustomizablePartial = (str: string): string =>
    str.replace(/(Partial<)({ base:.* })(> & {.*? \| string)( ?\|?.*?`)/g, '$2$4');
  const extendBreakpointCustomizablePartial = (str: string): string =>
    str.replace(/Partial<{ base: (\D.*?);/g, '$1 | $&');

  const files = (await globby('./src/components/**/readme.md')).sort();
  for (const file of files) {
    const dir = path.dirname(path.normalize(file));
    const name = dir.split('/').pop();
    const readme = fs.readFileSync(path.normalize(file), 'utf8');

    fs.writeFileSync(
      path.normalize(file),
      removeWhitespace(
        removeGenerator(
          removeGraph(
            cleanBreakpointCustomizablePartial(extendBreakpointCustomizablePartial(removeEscapedPipe(readme)))
          )
        )
      )
    );
    fs.writeFileSync(
      path.normalize(`${dir}/${name}.props.md`),
      removeWhitespace(
        removeGenerator(
          removeGraph(
            cleanBreakpointCustomizablePartial(
              extendBreakpointCustomizablePartial(
                removeEscapedPipe(updateTypographyPaths(updateFormPaths(updateDependencyPaths(readme))))
              )
            )
          )
        )
      )
    );
  }
})();
