import * as path from 'path';
import * as fs from 'fs';
import * as globby from 'globby';
import { paramCase } from 'change-case';

const prepareSsrComponents = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const componentsDirectory = path.resolve(rootDirectory, 'src/components');
  const destinationDirectory = path.resolve(
    rootDirectory,
    '../components-react/projects/components-wrapper/src/lib/components-stencil'
  );

  const componentPaths = globby.sync(`${componentsDirectory}/**/*.tsx`).sort();

  const componentFileContents = componentPaths
    // .filter((_,i) => i === 31)
    .map((filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const newFileContent = fileContent
        .replace(/@Component\({[\S\s]+?\)\n/g, '')
        .replace(/@Element\(\) /g, '')
        .replace(/@Prop\(.*\) /g, '')
        .replace(/@Watch\(.*\)\n  /g, '')
        .replace(/@Listen\(.*\)\n  /g, '')
        .replace(/@Method\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@State\(\)/g, '')
        .replace(/\n.*\n  @Event\(.*\).*\n/g, '')
        .replace(/\n  public connectedCallback\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentWillLoad\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentDidLoad\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentWillUpdate\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentDidUpdate\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentWillRender\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentDidRender\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public disconnectedCallback\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentShouldUpdate\([\S\s]+?\n  }\n/g, '')
        .replace(/\n  private .*;/g, '') // private members
        .replace(/\n  private (?!get).*{[\S\s]+?\n  };?\n/g, '') // private methods without getters
        .replace(/\nconst propTypes[\s\S]*?};\n/g, '') // temporary
        // .replace(/    validateProps\(this, propTypes\);\n/, '') // temporary
        // .replace(/attachComponentCss\(this\.host, (getComponentCss), /, 'return $1(')
        .replace(/\s+ref={.*?}/g, '') // ref props
        .replace(/\s+onClick={.*?}/g, '') // onClick props
        .replace(/(public [a-zA-Z]+\??:) [a-zA-Z<>]+/g, '$1 any') // change type if props to any
        .replace(/( class)=/g, '$1Name=') // change class prop to className in JSX
        // .replace(/import .* from '@stencil\/core';\n/, '')
        .replace(/import[\s\S]*?from.*\n/g, '')
        .replace(/(<\/?)Host(>)/g, '$1$2');

      // console.log(newFileContent)

      return newFileContent;
    });

  fs.rmSync(destinationDirectory, { force: true, recursive: true });
  fs.mkdirSync(destinationDirectory, { recursive: true });

  componentFileContents.forEach((fileContent) => {
    const name = /export (?:class|const) ([A-Za-z]+)/.exec(fileContent)![1];

    const fileName = `${paramCase(name)}.tsx`;
    const filePath = path.resolve(destinationDirectory, fileName);

    fs.writeFileSync(filePath, fileContent);
    console.log(`Generated SSR Component into '${fileName}'`);
  });
};

prepareSsrComponents();
