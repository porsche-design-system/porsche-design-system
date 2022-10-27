import * as path from 'path';
import * as fs from 'fs';
import * as globby from 'globby';
import { paramCase, pascalCase } from 'change-case';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/shared';

const generateDSRComponents = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const componentsDirectory = path.resolve(rootDirectory, 'src/components');
  const relativeDestinationDirectory = '../components-react/projects/react-ssr-wrapper/src/lib/dsr-components';
  const destinationDirectory = path.resolve(rootDirectory, relativeDestinationDirectory);

  const componentPaths = globby.sync(`${componentsDirectory}/**/*.tsx`).sort();

  const stylesBundleImportPath = '@porsche-design-system/components/dist/styles';
  const utilsBundleImportPath = '@porsche-design-system/components/dist/utils';

  const componentFileContents = componentPaths
    // .filter((filePath) => filePath.includes('accordion'))
    .map((filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const componentName = pascalCase(filePath.split('/')!.pop()!.split('.')![0]);
      const tagName = paramCase(`P${componentName}`) as TagName;
      const componentMeta = getComponentMeta(tagName);
      const hasChildren = fileContent.includes('<slot');

      let newFileContent = fileContent
        .replace(/@Component\({[\s\S]+?\)\n/g, '')
        .replace(/@Element\(\) /g, '')
        .replace(/(?:\n  \/\*\*[\s\S]*?)?@Prop\(.*?\) [\s\S]*?;.*\n/g, '')
        .replace(/\n  @Listen\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@Watch\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@Method\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@State\(\) /g, '')
        .replace(/\n.*\n  @Event\(.*\).*\n/g, '')
        .replace(/\n  public connectedCallback\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentWillLoad\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentDidLoad\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentWillUpdate\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentWillRender\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentDidUpdate\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentDidRender\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public disconnectedCallback\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentShouldUpdate\([\s\S]+?\n  }\n/g, '')
        .replace(/\n  private (?!get).*{[\s\S]+?\n  };?\n/g, '') // private methods without getters
        .replace(/\nconst propTypes[\s\S]*?};\n/g, '') // temporary
        .replace(/\s+validateProps\(this, propTypes\);/, '')
        .replace(/\s+attachComponentCss\([\s\S]+?\);/, '')
        .replace(/\s{2,}(?:warnIf|throwIf|sync[A-Z]).+;/g, '')
        .replace(/\n.+classList\.remove[\s\S]+?;/g, '')
        .replace(/\n.+parseJSON[\s\S]+?.*/g, '')
        .replace(/ as HTML[A-Za-z]+/g, '')
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
        .replace(/(private [a-zA-Z]+\??:) [-a-zA-Z<>,'| ]+/g, '$1 any') // change type of private members to any
        .replace(/( class)([:=])/g, '$1Name$2') // change class prop to className in JSX
        .replace(/getPrefixedTagNames,?\s*/, '') // remove getPrefixedTagNames import
        // remove all imports except for utils and functional components which are rewritten
        .replace(/import[\s\S]*?from '(.*)';\n/g, (m, group) =>
          group.endsWith('utils')
            ? m.replace(group, utilsBundleImportPath)
            : group.endsWith('state-message') || group.endsWith('required')
            ? m.replace(group, './' + group.split('/').pop())
            : ''
        )
        .replace(/(getPrefixedTagNames)\((?:this\.)?host\)/g, '$1()') // remove this.host param
        // add new imports
        .replace(
          /^/g,
          `import { Component } from 'react';
import { getPrefixedTagNames } from '../../getPrefixedTagNames';
import { minifyCss } from '../../minifyCss';
import { stripFocusAndHoverStyles } from '../../stripFocusAndHoverStyles';
import { get${componentName}Css } from '${stylesBundleImportPath}';
`
        )
        .replace(/(export class) ([A-Za-z]+)/, '$1 DSR$2 extends Component<any>') // make it a real React.Component
        .replace(/(<\/?)Host.*(>)/g, '$1$2') // replace Host fragment, TODO: could be removed completely with template tag
        .replace(/(public state)\?(: any)/, '$1$2') // make state required to fix linting issue with React
        .replace(/\bbreakpoint\.l\b/, `'${breakpoint.l}'`) // inline breakpoint value from utilities-v2 for marque
        .replace(/{(isRequiredAndParentNotRequired\(.*)}/, '{/* $1 */}'); // comment out isRequiredAndParentNotRequired for now

      // inject DSR template
      if (!newFileContent.includes('FunctionalComponent')) {
        const getComponentCssParams =
          /attachComponentCss\([\s\S]*?getComponentCss(?:, ?([\s\S]*?))?\);/.exec(fileContent)![1] || '';

        const children = hasChildren
          ? `
        {this.children}`
          : '';

        newFileContent = newFileContent.replace(/public render\(\)[\s\S]*?\n  }/, (match) => {
          const delegatesFocusProp = componentMeta.isDelegatingFocus ? ' shadowrootdelegatesfocus="true"' : '';
          return match.replace(/\n    return \(?([\s\S]*?(?:\n    )|.*)\)?;/, (_, g1) => {
            return `
    const style = minifyCss(stripFocusAndHoverStyles(get${componentName}Css(${getComponentCssParams})));

    return (
      <>
        {/* @ts-ignore */}
        <template shadowroot="open"${delegatesFocusProp}>
          <style dangerouslySetInnerHTML={{ __html: style }}></style>
          ${g1.trim().replace(/\n/g, '$&    ')}
        </template>${children}
      </>
    );`;
          });
        });
      }

      newFileContent = newFileContent
        .replace(/(this\.)([a-zA-Z]+)/g, '$1props.$2') // change this.whatever to this.props.whatever
        .replace(/(this\.)props\.(input|select|textarea)/g, '$1$2') // revert for input, select and textarea
        .replace(/(this\.)props\.(key\+\+|tabsItemElements|slides)/g, '$1$2'); // revert for certain private members

      // rewire default slot
      if (hasChildren && !newFileContent.includes('FunctionalComponent')) {
        newFileContent = newFileContent
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
          .replace(/this\.(?:input|select|textarea)/g, 'defaultChildren[0]?.props'); // fallback for undefined input, select and textarea reference

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
            /hasNamedSlot\(this\.props\.host, '(caption|title|description|heading)'\)/g,
            `namedSlottedChildren.filter(({ props: { slot } }) => slot === '$1').length > 0`
          );
      } else if (newFileContent.includes('FunctionalComponent')) {
        newFileContent = newFileContent
          .replace(/import { Component } from 'react';/, "import type { FC } from 'react';")
          .replace(/FunctionalComponent/, 'FC')
          .replace(/: FormState/g, ': any')
          .replace(new RegExp(`\n.*${stylesBundleImportPath}.*`), '');
      }

      let liCounter = 0; // for pagination unique key
      // fix various issues
      newFileContent = newFileContent
        .replace(/(this\.props)\.host/g, '$1') // general
        .replace('grid.gutter', '{ base: 16, s: 24, m: 36 }') // grid
        .replace(/tabs\.theme \|\| ('light')/, '$1') // tabs
        .replace(/(getSegmentedControlCss)\(getItemMaxWidth\(this\.props\)\)/, '$1(100)') // segmented-control
        .replace(/this\.props\.getAttribute\('tabindex'\)/g, 'null') // button
        .replace(/getTextListItemCss\(listType, orderType, isNestedList\)/, "''") // text-list-item
        .replace(
          /(getHeadlineTagName|getHTMLElement|getClosestHTMLElement|getDirectChildHTMLElement)\(this\.props/,
          '$1(null'
        ) // headline, text, text-list, tag
        .replace(/ = getHeadlineTagName/, ': any$&') // headline
        .replace(
          /getSlotTextContent\(this\.props, '([a-z]+)'\)/g,
          "namedSlottedChildren.find(({ props: { slot } }) => slot === '$1')?.props.children"
        ) // carousel, select-wrapper
        .replace(/= defaultChildren\[0\]\?\.props/, '$& || {}') // text-field-wrapper
        .replace(/(required)={isRequiredAndParentNotRequired\(this\.props,.*/, '$1={false}') // select-wrapper
        .replace(/(host={)this\.props(})/g, '$1null$2') // StateMessage usage
        .replace(/toastManager\.getToast\(\)/, 'false') // toast
        .replace(/ {\.\.\.toast}/, '') // toast
        .replace(/(<div) (className={direction === 'next' \? 'action-next' : 'action-prev'}>)/, '$1 key={direction} $2') // scroller unique key warning
        .replace(/(<source) (srcSet=.*?, '?.*?([a-z]+)'?, '([a-z]+)')/g, '$1 key="$3-$4" $2') // marque unique key warning
        .replace(/<li>/g, () => {
          return `<li key=\{${liCounter++}}>`;
        }) // pagination unique key warning
        .replace(/return this\.selectRef\.selectedIndex;/, 'return 0;') // select-wrapper-dropdown
        .replace(/determineDirection\(this\.props\)/, "'down'") // select-wrapper-dropdown
        .replace(/(this\.)props\.(isDisabledOrLoading)/g, '$1$2'); // button, button-pure

      // component based tweaks
      if (tagName === 'p-carousel') {
        newFileContent = newFileContent
          .replace(/this\.slides(\.map)/, `defaultChildren$1`)
          .replace(/(<div) (className="splide__slide">)/g, '$1 key={i} $2')
          // patch named slot which usually getSlidesAndAddNamedSlots() takes care of
          .replace(
            /const defaultChildren =.*/,
            `$&
    const manipulatedChildren = children.map((child) =>
      defaultChildren.includes(child)
        ? { ...child, props: { ...child.props, slot: \`slide-\${defaultChildren.indexOf(child)}\` } }
        : child
    );`
          )
          .replace(/{this\.props\.children}/, '{manipulatedChildren}');
      } else if (tagName === 'p-modal') {
        newFileContent = newFileContent.replace(/this\.props\.(hasHeader)/g, '$1').replace(/hasHeader =/, 'const $&');
      } else if (tagName === 'p-tabs') {
        newFileContent = newFileContent
          .replace(/this\.tabsItemElements(\.map)/, `defaultChildren$1`)
          .replace(
            /(<button) (type="button">){tab\.label}(<\/button>)/g,
            '$1 key={tab.props.label} $2{tab.props.label}$3'
          )
          .replace(
            /const defaultChildren =.*/,
            `$&
    const manipulatedChildren = children.map((child, i) =>
      defaultChildren.includes(child) && this.props.activeTabIndex !== i
        ? { ...child, props: { ...child.props, hidden: true } }
        : child
    );`
          )
          .replace(/{this\.props\.children}/, '{manipulatedChildren}');
      } else if (tagName === 'p-scroller') {
        newFileContent = newFileContent.replace(/(this\.)props\.(is(?:Next|Prev)Hidden)/g, '$1$2');
      }

      return newFileContent;
    });

  fs.rmSync(destinationDirectory, { force: true, recursive: true });
  fs.mkdirSync(destinationDirectory, { recursive: true });

  componentFileContents.forEach((fileContent) => {
    const name = /export (?:class|const) ([A-Za-z]+)/.exec(fileContent)![1];

    const fileName = `${paramCase(name.replace('DSR', ''))}.tsx`;
    const filePath = path.resolve(destinationDirectory, fileName);

    fs.writeFileSync(filePath, fileContent);
    console.log(`Generated DSR Component into '${relativeDestinationDirectory}/${fileName}'`);
  });
};

generateDSRComponents();
