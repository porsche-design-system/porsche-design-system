import * as path from 'path';
import * as fs from 'fs';
import * as globby from 'globby';
import { paramCase, pascalCase } from 'change-case';
import { breakpoint } from '@porsche-design-system/utilities-v2';

const prepareSsrComponents = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const componentsDirectory = path.resolve(rootDirectory, 'src/components');
  const destinationDirectory = path.resolve(
    rootDirectory,
    '../components-react/projects/components-wrapper/src/lib/components-stencil'
  );

  const componentPaths = globby.sync(`${componentsDirectory}/**/*.tsx`).sort();

  const componentFileContents = componentPaths
    // .filter((filePath) => filePath.includes('accordion'))
    .map((filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const componentName = pascalCase(filePath.split('/')!.pop()!.split('.')![0]);

      let newFileContent = fileContent
        .replace(/@Component\({[\S\s]+?\)\n/g, '')
        .replace(/@Element\(\) /g, '')
        .replace(/\n  \/\*\*[\s\S]*?@Prop\(.*?\) [\s\S]*?;\n/g, '')
        .replace(/\n  @Listen\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@Watch\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@Method\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@State\(\) /g, '')
        .replace(/\n.*\n  @Event\(.*\).*\n/g, '')
        .replace(/\n  public componentWillLoad\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentDidLoad\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentWillUpdate\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentDidUpdate\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentDidRender\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public disconnectedCallback\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentShouldUpdate\([\S\s]+?\n  }\n/g, '')
        // .replace(/\n  private .*;/g, '') // private members
        .replace(/\n  private (?!get).*{[\S\s]+?\n  };?\n/g, '') // private methods without getters
        .replace(/\nconst propTypes[\s\S]*?};\n/g, '') // temporary
        // .replace(/    validateProps\(this, propTypes\);\n/, '') // temporary
        // .replace(/attachComponentCss\(this\.host, (get)Component(Css), /, `return $1${componentName}$2(`)
        .replace(/\s+ref={.*?}/g, '') // ref props
        .replace(/\s+onMouseDown={.*?}/g, '') // onMouseDown props
        .replace(/\s+onClick={.*?}/g, '') // onClick props
        .replace(/\s+onDismiss={.*?}/g, '') // onDismiss props
        .replace(/\s+onKeyDown={.*?}/g, '') // onKeyDown props
        .replace(/\s+onInput={.*?}/g, '') // onInput props
        .replace(/\s+onTabChange={.*?}/g, '') // onTabChange props
        .replace(/ +ref: [\s\S]*?,\n/g, '') // ref props
        .replace(/ +onClick: [\s\S]*?,\n/g, '') // onClick props
        .replace(/ +onKeyDown: [\s\S]*?,\n/g, '') // onKeyDown props
        // .replace(/(public [a-zA-Z]+\??:) [-a-zA-Z<>,'| ]+/g, '$1 any ') // change type if props to any
        .replace(/( class)=/g, '$1Name=') // change class prop to className in JSX
        // .replace(/tabindex=/g, 'tabIndex=') // fix casing
        .replace(/getPrefixedTagNames,?\s*/, '') // remove getPrefixedTagNames import
        // remove all imports except for utils and functional components which are rewritten
        .replace(/import[\s\S]*?from '(.*)';\n/g, (m, group) =>
          group.endsWith('utils')
            ? m.replace(group, '@porsche-design-system/components/dist/utils/utils-entry')
            : group.endsWith('state-message') || group.endsWith('required')
            ? m.replace(group, './' + group.split('/').pop())
            : ''
        )
        .replace(/(getPrefixedTagNames)\((?:this\.)?host\)/g, '$1()') // remove this.host param
        // .replace(/(this\.host)\./g, '$1?.') // make this.host optional
        // add new imports
        .replace(
          /^/g,
          `import { Component } from 'react';
import { getPrefixedTagNames } from '../../getPrefixedTagNames';
import { get${componentName}Css } from '@porsche-design-system/components/dist/styles/styles-entry';
`
        )
        .replace(/export class [A-Za-z]+/, '$& extends Component<any>') // make it a real React.Component
        .replace(/(<\/?)Host.*(>)/g, '$1$2') // replace Host fragment, TODO: could be removed completely with template tag
        .replace(/(public state)\?(: any)/, '$1$2') // make state required to fix linting issue with React
        .replace(/\bbreakpoint\.l\b/, `'${breakpoint.l}'`); // inline breakpoint value from utilities-v2 for marque
      // .replace(/(this\.)([a-zA-Z]+)/g, '$1props.$2') // change this.whatever to this.props.whatever
      // .replace(/(this\.)props\.(input|select|textarea)/g, '$1$2') // revert for input, select and textarea
      // .replace(/(this\.)props\.(key\+\+|tabsItemElements|slides)/g, '$1$2'); // revert for certain private members

      // TODO: take care of isRequiredAndParentNotRequired

      // inject DSR template
      if (!newFileContent.includes('FunctionalComponent')) {
        const getComponentCssParams = /attachComponentCss\([\s\S]*?getComponentCss(?:, ?([\s\S]*?))?\);/.exec(
          fileContent
        )![1];

        newFileContent = newFileContent.replace(/public render\(\)[\s\S]*?\n  }/, (match) => {
          return match.replace(/\n    return \(?([\s\S]*?(?:\n    )|.*)\)?;/, (_, g1) => {
            // TODO: minify css
            return `
    const style = get${componentName}Css(${getComponentCssParams});

    return (
      <>
        <template shadowroot="open">
          <style dangerouslySetInnerHTML={{ __html: style }}></style>
          ${g1.trim().replace(/\n/g, '$&    ')}
        </template>
        {this.children}
      </>
    );`; // TODO: add this.children only when there are children
          });
        });
      }

      newFileContent = newFileContent
        .replace(/(this\.)([a-zA-Z]+)/g, '$1props.$2') // change this.whatever to this.props.whatever
        .replace(/(this\.)props\.(input|select|textarea)/g, '$1$2') // revert for input, select and textarea
        .replace(/(this\.)props\.(key\+\+|tabsItemElements|slides)/g, '$1$2'); // revert for certain private members

      // remove leftover lifecycles
      newFileContent = newFileContent
        .replace(/\n  public connectedCallback\(\): void {[\S\s]+?\n  }\n/g, '')
        .replace(/\n  public componentWillRender\(\): void {[\S\s]+?\n  }\n/g, '');

      // rewire default slot
      if (newFileContent.includes('<slot') && !newFileContent.includes('FunctionalComponent')) {
        newFileContent = newFileContent
          // .replace(/this\.props\.children/, 'defaultChildren')
          .replace(
            /public render\(\): JSX\.Element {/,
            `$&
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : this.props.children
      ? [this.props.children]
      : [];
    const namedSlottedChildren = children.filter((child) => child.props?.slot);
    const defaultChildren = children.filter((child) => !child.props?.slot);\n`
          )
          .replace(/this\.(?:input|select|textarea)/g, 'defaultChildren[0].props'); // fallback for undefined input, select and textarea reference

        // adjust named slot conditions
        newFileContent = newFileContent
          .replace(
            /has(?:Heading|Label|Description)\(this\.props\.host, (this\.props\.(heading|label|description))\)/g,
            `($1 || namedSlottedChildren.filter(({ props: { slot } }) => slot === '$2').length > 0)`
          )
          .replace(
            /hasMessage\(this\.props\.host, (this\.props\.message), (this\.props\.state)\)/,
            `($1 || namedSlottedChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes($2)`
          )
          .replace(/namedSlottedChildren\.filter\(\({ props: { slot } }\) => slot === '(?:subline|caption)'\)/, '{$&}')
          .replace(
            /hasSlottedSubline\(this\.props\.host\)/g,
            `namedSlottedChildren.filter(({ props: { slot } }) => slot === 'subline').length > 0`
          )
          .replace(
            /hasNamedSlot\(this\.props\.host, '(caption|title|description)'\)/g,
            `namedSlottedChildren.filter(({ props: { slot } }) => slot === '$1').length > 0`
          );
      }

      // fix various issues
      newFileContent = newFileContent
        .replace(/(this\.props)\.host/g, '$1') // general
        .replace('grid.gutter', '{ base: 16, s: 24, m: 36 }') // grid
        .replace(/tabs\.theme \|\| ('light')/, '$1') // tabs
        .replace(/(getSegmentedControlCss)\(getItemMaxWidth\(this\.props\)\)/, '$1(100)') // segmented-control
        .replace(/this\.props\.getAttribute\('tabindex'\)/g, 'null') // button
        .replace(/(getTextListItemCss\(listType, orderType, isNestedList\))/, "''; // $1") // text-list-item
        .replace(
          /(getHeadlineTagName|getHTMLElement|getClosestHTMLElement|getDirectChildHTMLElement)\(this\.props/,
          '$1(null'
        ); // headline, text, text-list, tag

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
