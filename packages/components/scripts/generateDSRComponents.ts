import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { INTERNAL_TAG_NAMES } from '@porsche-design-system/shared';
import { breakpoint } from '@porsche-design-system/emotion';
import { kebabCase, pascalCase } from 'change-case';
import * as fs from 'fs';
import { globbySync } from 'globby';
import * as path from 'path';

const EXCLUDED_COMPONENTS: TagName[] = ['p-toast-item'];

const generateDSRComponents = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const componentsDirectory = path.resolve(rootDirectory, 'src/components');
  const relativeDestinationDirectory = '../components-react/projects/react-ssr-wrapper/src/lib/dsr-components';
  const destinationDirectory = path.resolve(rootDirectory, relativeDestinationDirectory);

  const componentPaths = globbySync(`${componentsDirectory}/**/*.tsx`).sort();

  const stylesBundleImportPath = '@porsche-design-system/components/dist/styles';
  const utilsBundleImportPath = '@porsche-design-system/components/dist/utils';

  const componentFileContents = componentPaths
    // .filter((filePath) => filePath.includes('accordion')) // for easier debugging
    .filter((filePath) => !EXCLUDED_COMPONENTS.includes(`p-${path.basename(filePath).split('.')[0]}` as TagName))
    .map((filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const componentName = pascalCase(filePath.split('/')!.pop()!.split('.')![0]);
      const tagName = kebabCase(`P${componentName}`) as TagName;
      const { isDelegatingFocus, hasSlot } = getComponentMeta(tagName) || {}; // Could be common component

      let newFileContent = fileContent
        .replace(/@Component\({[\s\S]+?\)\n/g, '')
        .replace(/ implements [A-Za-z]+/g, '')
        .replace(/@Element\(\) /g, '')
        .replace(/(?:\n  \/\*\*[\s\S]*?)?@Prop\(.*?\) [\s\S]*?;.*\n/g, '')
        .replace(/\n  @Listen\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@Watch\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@Method\(.*\)[\s\S]+?\n  }\n/g, '')
        .replace(/@State\(\) /g, '')
        .replace(/(?:\n  \/\*\*(?:.*\n){0,3})?  @Event\(.*\).*\n/g, '')
        .replace(/\n  public connectedCallback\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentWillLoad\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentDidLoad\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentWillUpdate\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentWillRender\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentDidUpdate\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentDidRender\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public disconnectedCallback\(\): void {[\s\S]+?\n  }\n/g, '')
        .replace(/\n  public componentShouldUpdate\([\s\S]+?\n  }\n/g, '')
        .replace(/private(.*?)window.matchMedia(.*?);/g, '')
        .replace(/\n  private (?!get).+(\n.+)*?\{[\s\S]+?\n  };?\n/g, '') // private methods without getters
        .replace(/\nconst propTypes[\s\S]*?};\n/g, '') // temporary
        .replace(/\s+validateProps\(this, propTypes\);/, '')
        .replace(/\s+attachComponentCss\([\s\S]+?\);/, '')
        .replace(/\s{2,}(?:warnIf|throwIf|sync)[A-Z][A-Za-z<>, \n]+\([\s\S]+?;/g, '')
        .replace(/\n.+classList\.remove[\s\S]+?;/g, '')
        .replace(/\n.+parseJSON[\s\S]+?.*/g, '')
        .replace(/ as HTML[A-Za-z]+/g, '')
        .replace(/\s+ref={.*?}/g, '') // ref props
        .replace(/\s+onMouseDown={.*?}/g, '') // onMouseDown props
        .replace(/\s+onClick={.*?}/g, '') // onClick props
        .replace(/\s+onToggle={.*?}/g, '') // onToggle props
        .replace(/\s+onCancel={.*?}/g, '') // onCancel props
        .replace(/\s+onDismiss={.*?}/g, '') // onDismiss props
        .replace(/\s+onKeyDown={.*?}/g, '') // onKeyDown props
        .replace(/\s+onPaste={.*?}/g, '') // onPaste props
        .replace(/\s+onInput={.*?}/g, '') // onInput props
        .replace(/\s+onWheel={.*?}/g, '') // onWheel props
        .replace(/\s+on(?:Tab)?Change={.*?}/g, '') // onChange and onTabChange props
        .replace(/\s+onUpdate={.*?}/g, '') // onUpdate props
        .replace(/ +ref: [\s\S]*?,\n/g, '') // ref props
        .replace(/ +onClick: [\s\S]*?,\n/g, '') // onClick props
        .replace(/ +onKeyDown: [\s\S]*?,\n/g, '') // onKeyDown props
        .replace(/(private [a-zA-Z]+\??:) [-a-zA-Z<>,'| ]+/g, '$1 any') // change type of private members to any
        .replace(/( class)([:=])/g, '$1Name$2') // change class prop to className in JSX
        .replace(/getPrefixedTagNames,?\s*/, '') // remove getPrefixedTagNames import
        .replace(/ onSlotchange={.*}/g, '') // doesn't exist in React JSX
        .replace(
          /\{\/\* @ts-expect-error although `fetchpriority` should already be supported by TSX, it's not with Stencil\/TSX \*\/}/g,
          ''
        ) // remove, otherwise ts-expect-error would through because `fetchpriority` is replaced with `fetchPriority`
        .replace(/fetchpriority/g, 'fetchPriority') // doesn't exist in Stencil JSX but in React JSX
        // remove all imports except for utils and functional components which are rewritten
        .replace(/import[\s\S]*?from '(.*)';\n/g, (m, group) =>
          group.endsWith('utils')
            ? m.replace(group, utilsBundleImportPath)
            : group.endsWith('state-message') ||
                group.endsWith('loading-message') ||
                group.endsWith('input-base') ||
                group.endsWith('required') ||
                group.endsWith('label') ||
                group.endsWith('no-results-option')
              ? m.replace(group, './' + group.split('/').pop())
              : ''
        )
        .replace(/.*= getPrefixedTagNames\((?:this\.)?host.*\n/g, '') // remove getPrefixedTagNames call
        // add new imports
        .replace(
          /^/g,
          `import { Component } from 'react';
import { minifyCss } from '../../minifyCss';
import { get${componentName}Css } from '${stylesBundleImportPath}';
`
        )
        .replace(/(export class) ([A-Za-z]+)/, '$1 DSR$2 extends Component<any>') // make it a real React.Component
        .replace(/(<\/?)Host[^>]*(>)/g, '$1$2') // replace Host fragment, TODO: could be removed completely with template tag
        .replace(/(public state)\?(: any)/, '$1$2') // make state required to fix linting issue with React
        .replace(/\bbreakpoint\.l\b/, `'${breakpoint.l}'`) // inline breakpoint value from utilities-v2 for marque
        .replace(/{(isRequiredAndParentNotRequired\(.*)}/, '{/* $1 */}') // comment out isRequiredAndParentNotRequired for now
        .replace(/{(!isParentFieldsetRequired\(.*)}/, '{/* $1 */}') // comment out isParentFieldsetRequired for now
        .replace(/(<\/?)Fragment(>)/g, '$1$2'); // replace <Fragment> with <> or </Fragment> with </>

      if (hasSlot && !newFileContent.includes('FunctionalComponent')) {
        newFileContent = newFileContent.replace(
          /^/,
          `import { splitChildren } from '../../splitChildren';
`
        );
      }

      if (!newFileContent.includes('FunctionalComponent')) {
        // inject DSR template
        const getComponentCssParams =
          /attachComponentCss\([\s\S]*?getComponentCss(?:, ?([\s\S]*?))?\);/.exec(fileContent)![1] || '';

        const children = hasSlot
          ? `
        {this.children}`
          : '';

        newFileContent = newFileContent.replace(/public render\(\)[\s\S]*?\n  }/, (match) => {
          const delegatesFocusProp = isDelegatingFocus ? ' shadowrootdelegatesfocus="true"' : '';
          return match.replace(/\n    return \(?([\s\S]*?(?:\n    )|.*)\)?;/, (_, g1) => {
            return `
    const style = minifyCss(get${componentName}Css(${getComponentCssParams}));

    return (
      <>
        {/* @ts-ignore */}
        <template shadowroot="open" shadowrootmode="open"${delegatesFocusProp}>
          <style dangerouslySetInnerHTML={{ __html: style }} />
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
        .replace(/(this\.)props\.(key\+\+|tabsItemElements|slides|inputElements)/g, '$1$2'); // revert for certain private members

      // take care of nested components of PrefixedTagNames
      const componentImports = Array.from(newFileContent.matchAll(/<PrefixedTagNames.p([A-Za-z]+)/g))
        .map(([, cmpName]) => `P${cmpName}`)
        .filter((x, idx, arr) => arr.findIndex((t) => t === x) === idx) // remove duplicates
        .filter((x) => !INTERNAL_TAG_NAMES.includes(kebabCase(x) as TagName))
        .join(', ');
      if (componentImports) {
        newFileContent = newFileContent.replace(/^/, `import { ${componentImports} } from '../components';\n`);
      }

      newFileContent = newFileContent
        .replace(/PrefixedTagNames.p([A-Za-z]+)/g, 'P$1') // reference imported components
        .replace(/<PToastItem[\S\s]+?\/>/, '<></>'); // remove internal components that don't have wrapper and are not visible anyway

      // rewire default slot
      if (hasSlot && !newFileContent.includes('FunctionalComponent')) {
        newFileContent = newFileContent
          .replace(
            /public render\(\): JSX\.Element {/,
            `$&
    const { children, namedSlotChildren, otherChildren } = splitChildren(this.props.children);\n`
          )
          .replace(
            /this\.(?:input|select|textarea)(?!Elements|edOption|edOptions)/g,
            "typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props"
          ); // fallback for undefined input, select and textarea reference

        // adjust named slot conditions
        newFileContent = newFileContent
          .replace(
            /has(?:Heading|Label|Description)\(this\.props\.host, (this\.props\.(heading|label|description))\)/g,
            `($1 || namedSlotChildren.filter(({ props: { slot } }) => slot === '$2').length > 0)`
          )
          .replace(
            /hasMessage\(this\.props\.host, (this\.props\.message), (this\.props\.state)\)/,
            `($1 || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes($2)`
          )
          .replace(/namedSlotChildren\.filter\(\({ props: { slot } }\) => slot === '(?:subline|caption)'\)/, '{$&}')
          .replace(
            /hasSlottedSubline\(this\.props\.host\)/g,
            `namedSlotChildren.filter(({ props: { slot } }) => slot === 'subline').length > 0`
          )
          .replace(
            /hasNamedSlot\(this\.props\.host, '(caption|title|description|heading|button|header|header-start|header-end|controls|footer|sub-footer|sidebar-start|sidebar-end|sidebar-end-header|background|filter|selected)'\)/g,
            `namedSlotChildren.filter(({ props: { slot } }) => slot === '$1').length > 0`
          );
      } else if (newFileContent.includes('FunctionalComponent')) {
        newFileContent = newFileContent
          .replace(/import { Component } from 'react';/, "import type { FC } from 'react';")
          .replace(/FunctionalComponent/, 'FC')
          .replace(/: FormState/g, ': any')
          .replace(/: Theme/g, ': any')
          .replace(new RegExp(`\n.*${stylesBundleImportPath}.*`), '')
          .replace(/&& !isParentFieldsetRequired\(.*?\)/, '/* $& */') // let's disable it for now
          // .replace(/\|\|\s.*\(.*isRequiredAndParentNotRequired\(.*?\)\)/, '/* $& */') // let's disable it for now
          .replace(
            /hasNamedSlot\(host, '(label-after)'\)/g,
            `namedSlotChildren.filter(({ props: { slot } }) => slot === '$1').length > 0`
          )
          .replace(/host,|formElement,/g, '// $&'); // don't destructure unused const

        if (newFileContent.includes('export const Label:')) {
          newFileContent = newFileContent
            .replace(/(type LabelProps = {)/, '$1 children?: JSX.Element; ')
            .replace(/(Label: FC<LabelProps> = \({)/, '$1 children, ')
            .replace(/(hasLabel)\(.*\)/, '$1') // replace function call with boolean const
            .replace(/(hasDescription)\(.*\)/, '$1') // replace function call with boolean const
            .replace(/(type LabelProps = {)/, '$1 hasLabel: boolean; hasDescription: boolean; ') // add types for LabelProps
            .replace(/(Label: FC<LabelProps> = \({)/, '$1 hasLabel, hasDescription, ') // destructure newly introduced hasLabel and hasDescription
            .replace(/}\) => \{/, `$& const { namedSlotChildren } = splitChildren(children);\n`)
            .replace(
              /^/,
              `import { splitChildren } from '../../splitChildren';
`
            );
        }
        if (newFileContent.includes('export const InputBase:')) {
          newFileContent = newFileContent
            .replace(/(type InputBaseProps = {)/, '$1 children?: JSX.Element; ')
            .replace(/(InputBase: FC<InputBaseProps> = \({)/, '$1 children, ')
            .replace(/(host={)host(})/g, '$1null$2')
            .replace(/onBlur=\{onBlur}/g, '')
            .replace(/value={/, 'defaultValue={')
            .replace(/maxlength/, 'maxLength')
            .replace(/minlength/, 'minLength')
            .replace(/spellcheck/, 'spellCheck')
            .replace(/\sreadonly/, 'readOnly')
            .replace(/autocomplete/, 'autoComplete')
            .replace(/\b(onInput|onKeyDown|onWheel|onChange|onBlur|refElement\s*,?)/g, '// $1')
            .replace(
              /}\) => \{/,
              `$&
    const { namedSlotChildren } = splitChildren(children);\n`
            )
            .replace(
              /^/,
              `import { splitChildren } from '../../splitChildren';
`
            );
        }
        if (newFileContent.includes('export const LegacyLabel:')) {
          newFileContent = newFileContent
            .replace(/(hasLabel)\(.*\)/, '$1') // replace function call with boolean const
            .replace(/(hasDescription)\(.*\)/, '$1') // replace function call with boolean const
            .replace(/(type LegacyLabelProps = {)/, '$1 hasLabel: boolean; hasDescription: boolean; ') // add types for LabelProps
            .replace(/(LegacyLabel: FC<LegacyLabelProps> = \({)/, '$1 hasLabel, hasDescription, ') // destructure newly introduced hasLabel and hasDescription
            .replace(/{formElement && isRequiredAndParentNotRequired.*}/, ''); // let's disable it for now
        }

        if (newFileContent.includes('export const StateMessage:')) {
          newFileContent = newFileContent
            .replace(/(hasMessage)\(.*\)/, '$1') // replace function call with boolean const
            .replace(/(type StateMessageProps = {)/, '$1 hasMessage: boolean; ') // add types for StateMessageProps
            .replace(/(StateMessage: FC<StateMessageProps> = \({)/, '$1 hasMessage, ') // destructure newly introduced hasMessage
            .replace(/(=.*?{.*?)(?:, )?host(.*?})/g, '$1$2'); // remove unused destructured host
        }
      }

      if (!newFileContent.includes('export const InputBase:')) {
        // radio-group-option uses a label component
        if (tagName === 'p-radio-group-option') {
          newFileContent = newFileContent
            .replace(/(<Label(?!Props))([\s\S]*?\/>)/, '$1 hasLabel={this.props.label} hasDescription={false}$2')
            .replace(/e\.stopImmediatePropagation\(\);/, '');
        } else {
          newFileContent = newFileContent.replace(
            /(<Label(?!Props))([\s\S]*?\/>)/,
            "$1 hasLabel={this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0} hasDescription={this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0}$2"
          );
        }
        newFileContent = newFileContent.replace(
          /(<StateMessage(?!Props))([\s\S]*?\/>)/,
          "$1 hasMessage={(this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state)}$2"
        );
      } else {
        newFileContent = newFileContent
          .replace(
            /(<Label(?!Props))([\s\S]*?\/>)/,
            "$1 hasLabel={!!label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0} hasDescription={!!description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0}$2"
          )
          .replace(
            /(<StateMessage(?!Props))([\s\S]*?\/>)/,
            "$1 hasMessage={(message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(state)}$2"
          );
      }

      // fix various issues
      newFileContent = newFileContent
        .replace(
          /(<LegacyLabel(?!Props))([\s\S]*?\/>)/,
          "$1 hasLabel={this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0} hasDescription={this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0}$2"
        )
        .replace(/(this\.props)\.host/g, '$1') // general
        .replace(/getItemWidths\(this.props, this.props.compact\)/g, '{ minWidth: 100, maxWidth: 100 }')
        .replace(/this\.props\.getAttribute\('tabindex'\)/g, 'null') // button
        .replace(/(const\s+TagType)(\s+=)/, '$1: any$2') // fix typing for display, heading, headline, text,
        .replace(
          /(getDisplayTagType|getHeadingTagType|getHeadlineTagType|getTextTagType|getHTMLElement|getClosestHTMLElement|getDirectChildHTMLElement)\(this\.props/,
          '$1(null'
        ) // replace non-existing host element with null for display, heading, headline, text, text-list, tag
        .replace(
          /Record<\s*(?:TextColor|TextWeight)Deprecated,\s*Exclude<(?:TextColor|TextWeight),\s*(?:TextColor|TextWeight)Deprecated>\s*>/g,
          'Record<any, any>'
        ) // text
        .replace(
          /Record<\s*(?:Text|Display|Heading|Headline)AlignDeprecated,\s*Exclude<(?:Text|Display|Heading|Headline)Align,\s*(?:Text|Display|Heading|Headline)AlignDeprecated>\s*>/g,
          'Record<any, any>'
        ) // text, display, heading, headline
        .replace(
          /Record<\s*(?:Switch|ButtonPure|LinkPure)AlignLabelDeprecated,\s*Exclude<(?:Switch|ButtonPure|LinkPure)AlignLabel,\s*(?:Switch|ButtonPure|LinkPure)AlignLabelDeprecated>\s*>/g,
          'Record<any, any>'
        ) // switch, button-pure, link-pure
        .replace(
          /Record<\s*CarouselAlignHeaderDeprecated,\s*Exclude<CarouselAlignHeader,\s*CarouselAlignHeaderDeprecated>\s*>/g,
          'Record<any, any>'
        ) // carousel
        .replace(/Record<\s*IconColorDeprecated,\s*Exclude<IconColor,\s*IconColorDeprecated>\s*>/g, 'Record<any, any>') // icon
        .replace(
          /Record<\s*FlyoutPositionDeprecated,\s*Exclude<FlyoutPosition,\s*FlyoutPositionDeprecated>\s*>/g,
          'Record<any, any>'
        ) // flyout
        .replace(/import type { TextTag }.*;/g, '') // text
        .replace(
          /getSlotTextContent\(this\.props, '([a-z]+)'\)/g,
          "namedSlotChildren.find(({ props: { slot } }) => slot === '$1')?.props.children"
        ) // carousel, select-wrapper
        .replace(
          /= typeof otherChildren\[0\] === 'object' && 'props' in otherChildren\[0\] && otherChildren\[0]\?\.props/,
          '$& || {}'
        ) // text-field-wrapper
        .replace(/(required)={isRequiredAndParentNotRequired\(this\.props,.*/, '$1={false}') // select-wrapper
        .replace(/(host={)this\.props(})/g, '$1null$2') // StateMessage usage
        .replace(/toastManager\.getToast\(\)/, 'false') // toast
        .replace(/ {\.\.\.toast}/, '') // toast
        .replace(/return this\.selectRef\.selectedIndex;/, 'return 0;') // select-wrapper-dropdown
        .replace(/(this\.)props\.(isDisabledOrLoading)/g, '$1$2') // button, button-pure
        .replace(/(const (?:iconProps|btnProps|linkProps|buttonProps)) =/, '$1: any =') // workaround typing issue
        .replace(/(any)Deprecated/g, '$1') // workaround typings of deprecation maps
        .replace(/Exclude<any, any>/g, 'any') // workaround typings of deprecation maps
        .replace(/ onSlotchange={this\.props\..+}/, '') // doesn't exist in React JSX and makes no sense
        .replace(/\s+private controllerHost =[\S\s]+controllerHost[\S\s]+?;/, '') // components with loading prop and LoadingController
        .replace(/this\.props\.loadingCtrl\.initialLoading/, 'false'); // components with loading prop and LoadingController

      // component based tweaks
      if (tagName === 'p-carousel') {
        newFileContent = newFileContent
          .replace(/this\.slides(\.map)/, `otherChildren$1`)
          .replace(/^/, "$&import type { BreakpointCustomizable } from '../types';\n")
          .replace(/.*onFocusin=\{.*\n/, '')
          // .replace(/this\.slidesPerPage/, 'this.props.slidesPerPage')
          .replace(/this\.props\.parsedSlidesPerPage/g, 'this.props.slidesPerPage')
          .replace(/this\.props\.parsedDisablePagination/g, 'this.props.disablePagination')
          .replace(/this\.props\.parsedPagination/g, 'this.props.pagination')
          .replace(/private\sget\sparsed.*\{\n?.*\n?}/g, '')
          // Since slidesPerPage is BreakpointCustomizable we have to replace hasNavigation with a working serverside condition
          .replace(
            /this\.props\.hasNavigation/g,
            "(this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length)"
          );
      } else if (tagName === 'p-banner') {
        // remove warning about deprecated title slot
        newFileContent = newFileContent
          .replace(/.+consoleWarn\([\s\S]+?\);\n/g, '')
          .replace(/this\.props\.(hasDismissButton)/g, 'this.$1');
      } else if (tagName === 'p-inline-notification') {
        newFileContent = newFileContent.replace(/this\.props\.(hasDismissButton)/g, 'this.$1');
      } else if (tagName === 'p-pagination') {
        newFileContent = newFileContent
          // parseJSON got stripped and removed the entire const parsedIntl, but parsing is pointless since we always have an object
          .replace(/parsedIntl/g, 'this.props.intl')
          // transform className objects to string
          .replace(
            /className=\{(\{[\S\s]+?})}/g,
            `className={Object.entries($1).map(([key, value]) => value && key).filter(Boolean).join(' ')}`
          );
      } else if (tagName === 'p-sheet') {
        newFileContent = newFileContent
          .replace(/this\.props\.(hasHeader|hasDismissButton)/g, '$1')
          .replace(/(this\.props\.ariaLabel)\(\)/g, '$1')
          .replace(/hasHeader =/, 'const $&')
          .replace(/onTransitionEnd={[^}]*}\s*/, '');
      } else if (tagName === 'p-modal') {
        newFileContent = newFileContent
          .replace(/this\.props\.(hasHeader|hasFooter|hasDismissButton)/g, '$1')
          .replace(/(this\.props\.ariaLabel)\(\)/g, '$1')
          .replace(/hasHeader =/, 'const $&')
          .replace(/hasFooter =/, 'const $&')
          .replace(
            /const hasFooter = .+\n/,
            '$&    const hasDismissButton = this.props.disableCloseButton ? false : this.props.dismissButton;'
          )
          .replace(/\n.*\/\/ eslint-disable-next-line @typescript-eslint\/member-ordering/g, '')
          // .replace(/(inert=\{this\.props\.open \? null : )true(})/, "$1''$2") // transform true to empty string ''
          .replace(/onScroll=\{hasFooter && this\.props\.onScroll}/, '')
          .replace(/if\s\(.*[^}]*}/, '') // Remove deprecation warning check
          .replace(/onTransitionEnd={[^}]*}\s*/, '');
      } else if (tagName === 'p-flyout') {
        newFileContent = newFileContent
          .replace(/this\.props\.(hasHeader|hasFooter|hasSubFooter)/g, '$1')
          .replace(/(?:hasHeader|hasFooter|hasSubFooter) =/g, 'const $&')
          .replace(/\n.*\/\/ eslint-disable-next-line @typescript-eslint\/member-ordering/g, '')
          // .replace(/(inert=\{this\.props\.open \? null : )true(})/, "$1''$2") // transform true to empty string ''
          .replace(/onTransitionEnd={[^}]*}\s*/, '');
      } else if (tagName === 'p-tabs') {
        newFileContent = newFileContent
          .replace(/this\.tabsItemElements(\.map)/, `otherChildren$1`)
          .replace(
            /(<button key={index} type="button">)\s*{tab\.label}\s*(<\/button>)/g,
            "$1{typeof tab === 'object' && 'props' in tab && tab.props.label}$2"
          )
          .replace(
            /const { children, namedSlotChildren, otherChildren } =.*/,
            `$&
    const manipulatedChildren = children.map((child, i) =>
      typeof child === 'object' && 'props' in child && otherChildren.includes(child)
        ? { ...child, props: { ...child.props, theme: this.props.theme, hidden: this.props.activeTabIndex !== i ? true : null } }
        : child
    );`
          )
          .replace(/{this\.props\.children}/, '{manipulatedChildren}');
      } else if (tagName === 'p-scroller') {
        newFileContent = newFileContent
          .replace(/(this\.)props\.(is(?:Next|Prev)Hidden)/g, '$1$2')
          .replace(/(deprecationMap\[this\.props\.gradientColorScheme)/, '$1 as ScrollerGradientColorScheme')
          .replace(/(deprecationMap\[this\.props\.gradientColor)/, '$1 as ScrollerGradientColor');
      } else if (tagName === 'p-popover') {
        // only keep :host , button, .icon & .label styles
        newFileContent = newFileContent
          .replace(
            /getPopoverCss\(.+?\)/,
            `$&.replace(/(:host {[\\S\\s]+?})[\\S\\s]+(button {[\\S\\s]+?})[\\S\\s]+(.icon {[\\S\\s]+?})[\\S\\s]+(.label {[\\S\\s]+?})[\\S\\s]+/, '\$1\\n\$2\\n$3\\n$4')`
          )
          .replace(/this\.props\.(hasSlottedButton)/g, '$1')
          .replace(/hasSlottedButton =/g, 'const $&');
      } else if (tagName === 'p-tabs-bar') {
        newFileContent = newFileContent
          // get rid of left over
          .replace(/\n.*this\.props\.setAccessibilityAttributes\(\);/, '')
          // set aria attributes on button and anchor children, what at runtime is done via this.setAccessibilityAttributes()
          .replace(
            /const { children, namedSlotChildren, otherChildren } =.*/,
            `$&
    const manipulatedChildren = children.map((child, i) =>
      typeof child === 'object' && 'props' in child && otherChildren.includes(child)
        ? child.type === 'button'
          ? {
              ...child,
              props: {
                ...child.props,
                role: 'tab',
                tabIndex: (this.props.activeTabIndex || 0) === i ? '0' : '-1',
                'aria-selected': this.props.activeTabIndex === i ? 'true' : 'false',
              },
            }
          : child.type === 'a'
          ? {
              ...child,
              props: {
                ...child.props,
                'aria-current': this.props.activeTabIndex === i ? 'true' : 'false',
              },
            }
          : child
        : child
    );`
          )
          .replace(/{this\.props\.children}/, '{manipulatedChildren}');
      } else if (tagName === 'p-toast') {
        // only keep :host styles
        newFileContent = newFileContent.replace(
          /getToastCss\(\)/,
          `$&.replace(/(:host {[\\S\\s]+?})[\\S\\s]+/, '\$1')`
        );
        // TODO: recover @media query for :host style if needed
      } else if (tagName === 'p-segmented-control') {
        // pass down value, backgroundColor and theme prop to p-segmented-control-item children
        newFileContent = newFileContent
          .replace(
            /const { children, namedSlotChildren, otherChildren } =.*/,
            `$&
    const manipulatedChildren = children.map((child) =>
      typeof child === 'object' && 'props' in child && otherChildren.includes(child)
        ? { ...child, props: { ...child.props, selected: child.props?.value === this.props.value, backgroundColor: this.props.backgroundColor, theme: this.props.theme } }
        : child
    );`
          )
          .replace(/{this\.props\.children}/, '{manipulatedChildren}')
          // TODO replace ElementInternals lifecycle callbacks (formAssociatedCallback, formDisabledCallback, formResetCallback, formStateRestoreCallback) completely
          .replace(/@AttachInternals\(\)/, '')
          .replace(/this\.props\.value = this\.props\.defaultValue;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.value = state;/, '')
          .replace(/getItemMaxWidth\(this\.props,\s*this\.props\.compact\)/, '100')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: string\)/, 'formStateRestoreCallback()');
      } else if (tagName === 'p-segmented-control-item') {
        newFileContent = newFileContent.replace(/!!this\.props\.innerHTML/, '!!children.length');
      } else if (tagName === 'p-stepper-horizontal') {
        // pass down theme prop to p-stepper-horizontal-item children
        newFileContent = newFileContent
          .replace(
            /const { children, namedSlotChildren, otherChildren } =.*/,
            `$&
    const manipulatedChildren = children.map((child) =>
      typeof child === 'object' && 'props' in child && otherChildren.includes(child)
        ? { ...child, props: { ...child.props, theme: this.props.theme } }
        : child
    );`
          )
          .replace(/{this\.props\.children}/, '{manipulatedChildren}');
      } else if (tagName === 'p-multi-select') {
        newFileContent = newFileContent
          // TODO replace ElementInternals lifecycle callbacks (formAssociatedCallback, formDisabledCallback, formResetCallback, formStateRestoreCallback) completely
          .replace(/@AttachInternals\(\)/, '')
          .replace(/this\.props\.value = this\.props\.defaultValue;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.value = state.getAll\(this.props.name\) as string\[];/, '')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: FormData\)/, 'formStateRestoreCallback()');
      } else if (tagName === 'p-multi-select-option') {
        newFileContent = newFileContent
          .replace(/this\.theme/, 'this.props.theme')
          // transform className objects to string
          .replace(
            /className=\{(\{[\S\s]+?})}/g,
            `className={Object.entries($1).map(([key, value]) => value && key).filter(Boolean).join(' ')}`
          );
      } else if (tagName === 'p-optgroup') {
        // transform className objects to string
        newFileContent = newFileContent.replace(
          /className=\{(\{[\S\s]+?})}/g,
          `className={Object.entries($1).map(([key, value]) => value && key).filter(Boolean).join(' ')}`
        );
      } else if (tagName === 'p-select') {
        newFileContent = newFileContent
          .replace(
            /getSelectedOptionString\(typeof otherChildren\[0] === 'object' && 'props' in otherChildren\[0] && otherChildren\[0]\?\.propsOptions\)/g,
            'getSelectedOptionString(otherChildren)'
          )
          // replace getSelectedOptionImagePath
          .replace(
            /this\.props\.getSelectedOptionImagePath\(typeof otherChildren\[0] === 'object' && 'props' in otherChildren\[0] && otherChildren\[0]\?\.propsOptions\)/,
            'this.getSelectedOptionImagePath(otherChildren)'
          )
          .replace(/<span className="sr-only"[^<]*<\/span>/, '')
          // .replace(/(SelectDropdownDirectionInternal)/, 'type $1')
          .replace(/private searchTimeout: any\.Timeout \| number = null;/, '')
          // TODO replace ElementInternals lifecycle callbacks (formAssociatedCallback, formDisabledCallback, formResetCallback, formStateRestoreCallback) completely
          .replace(/@AttachInternals\(\)/, '')
          .replace(/this\.props\.value = this\.props\.defaultValue;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.value = state;/, '')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: string\)/, 'formStateRestoreCallback()');
      } else if (tagName === 'p-radio-group') {
        newFileContent = newFileContent
          // TODO replace ElementInternals lifecycle callbacks (formAssociatedCallback, formDisabledCallback, formResetCallback, formStateRestoreCallback) completely
          .replace(/@AttachInternals\(\)/, '')
          .replace(/this\.props\.value = this\.props\.defaultValue;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.value = state;/, '')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: string\)/, 'formStateRestoreCallback()');
      } else if (tagName === 'p-select-option') {
        newFileContent = newFileContent
          .replace(/this\.theme/, 'this.props.theme')
          // transform className objects to string
          .replace(
            /className=\{(\{[\S\s]+?})}/g,
            `className={Object.entries($1).map(([key, value]) => value && key).filter(Boolean).join(' ')}`
          );
      } else if (tagName === 'p-pin-code') {
        newFileContent = newFileContent
          .replace(/value={/, 'defaultValue={') // fix warning about read-only field
          // TODO replace ElementInternals lifecycle callbacks (formAssociatedCallback, formDisabledCallback, formResetCallback, formStateRestoreCallback) completely
          .replace(/@AttachInternals\(\)/, '')
          .replace(/this\.props\.value = this\.props\.defaultValue;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.value = state;/, '')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: string\)/, 'formStateRestoreCallback()');
      } else if (tagName === 'p-drilldown') {
        newFileContent = newFileContent
          .replace(/validateActiveIdentifier\(.*\);/g, '')
          // .replace(/(inert=\{this\.props\.open \? null : )true(})/, "$1''$2") // transform true to empty string '';
          .replace(/this\.props\.primary = !activeItem \|\| activeItem\.parentElement === this\.props;/, '')
          .replace(/this\.props\.primary/, 'this.primary')
          .replace(/this\.props\.isSecondaryDrawerVisible/, 'this.isSecondaryDrawerVisible');
      } else if (tagName === 'p-drilldown-item') {
        newFileContent = newFileContent
          .replace(/: Theme/g, ': any')
          .replace(/this\.props\.theme(?! \|\|)/g, 'this.theme')
          .replace(/this\.props\.open(?! \|\|)/g, 'this.open')
          .replace(/this\.props\.(hasSlottedHeader|hasSlottedButton)/g, '$1')
          .replace(/hasSlottedHeader =/, 'const $&')
          .replace(/hasSlottedButton =/, 'const $&')
          .replace(/if \(hasSlottedButton\).*{[\s\S]*?}/, '');
        // .replace(/(inert=\{this\.open \? null : )true(})/, "$1''$2"); // transform true to empty string '';
      } else if (tagName === 'p-link-tile-product') {
        // TODO: why is something like this only needed here?
        newFileContent = newFileContent
          .replace(/type LinkTileProductAspectRatio,/, '')
          .replace(/type LinkTileProductLikeEventDetail,/, '')
          .replace(/type LinkTileProductTarget,/, '');
      } else if (tagName === 'p-textarea') {
        newFileContent = newFileContent
          .replace(/@AttachInternals\(\)/, '')
          .replace(/value={/, 'defaultValue={')
          .replace(/maxlength/, 'maxLength')
          .replace(/minlength/, 'minLength')
          .replace(/readonly/, 'readOnly')
          .replace(/autofocus/, 'autoFocus')
          .replace(/spellcheck/, 'spellCheck')
          .replace(/autocomplete/, 'autoComplete')
          // TODO replace ElementInternals lifecycle callbacks (formAssociatedCallback, formDisabledCallback, formResetCallback, formStateRestoreCallback) completely
          .replace(/this\.props\.value = this\.props\.defaultValue;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.value = state;/, '')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: string\)/, 'formStateRestoreCallback()');
      } else if (tagName === 'p-input-password') {
        newFileContent = newFileContent
          .replace(/@AttachInternals\(\)/, '')
          .replace(
            /<InputBase/,
            `$&
            children={this.props.children}`
          )
          .replace(/maxlength/, 'maxLength')
          .replace(/minlength/, 'minLength')
          .replace(/readonly/, 'readOnly')
          .replace(/autocomplete/, 'autoComplete')
          .replace(/\s*refElement=\{[^}]*}/g, '')
          .replace(/onBlur=\{this\.props\.onBlur}/g, '')
          // TODO replace ElementInternals lifecycle callbacks (formAssociatedCallback, formDisabledCallback, formResetCallback, formStateRestoreCallback) completely
          .replace(/this\.props\.value = this\.props\.defaultValue;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.value = state;/, '')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: string\)/, 'formStateRestoreCallback()');
      } else if (
        tagName === 'p-input-number' ||
        tagName === 'p-input-date' ||
        tagName === 'p-input-week' ||
        tagName === 'p-input-month' ||
        tagName === 'p-input-time' ||
        tagName === 'p-input-search' ||
        tagName === 'p-input-text' ||
        tagName === 'p-input-email' ||
        tagName === 'p-input-tel' ||
        tagName === 'p-input-url'
      ) {
        newFileContent = newFileContent
          .replace(/@AttachInternals\(\)/, '')
          .replace(
            /<InputBase/,
            `$&
            children={this.props.children}`
          )
          .replace(/maxlength/, 'maxLength')
          .replace(/minlength/, 'minLength')
          .replace(/readonly/, 'readOnly')
          .replace(/autocomplete/, 'autoComplete')
          .replace(/\s*refElement=\{[^}]*}/g, '')
          .replace(/onBlur=\{this\.props\.onBlur}/g, '')
          // TODO replace ElementInternals lifecycle callbacks (formAssociatedCallback, formDisabledCallback, formResetCallback, formStateRestoreCallback) completely
          .replace(/this\.props\.value = this\.props\.defaultValue;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.value = state;/, '')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: string\)/, 'formStateRestoreCallback()');
      } else if (tagName === 'p-canvas') {
        newFileContent = newFileContent
          .replace(
            /this\.props\.(hasTitle|hasSidebarStart|hasSidebarEnd|hasSidebarEndHeader|hasHeaderStart|hasHeaderEnd|hasFooter|hasBackground)/g,
            '$1'
          )
          .replace(
            /(?:hasTitle|hasSidebarStart|hasSidebarEnd|hasSidebarEndHeader|hasHeaderStart|hasHeaderEnd|hasFooter|hasBackground) =/g,
            'const $&'
          );
      } else if (tagName === 'p-checkbox') {
        newFileContent = newFileContent
          .replace(/@AttachInternals\(\)/, '')
          .replace(/this\.props\.checked = this\.props\.defaultChecked;/, '')
          .replace(/this\.props\.disabled = disabled;/, '')
          .replace(/this\.props\.checked = !!state;/, '')
          .replace(/formDisabledCallback\(disabled: boolean\)/, 'formDisabledCallback()')
          .replace(/formStateRestoreCallback\(state: string\)/, 'formStateRestoreCallback()');
      } else if (tagName === 'p-button') {
        newFileContent = newFileContent.replace(/@AttachInternals\(\)/, '');
      } else if (tagName === 'p-button-pure') {
        newFileContent = newFileContent.replace(/@AttachInternals\(\)/, '');
      }

      return newFileContent;
    });

  fs.rmSync(destinationDirectory, { force: true, recursive: true });
  fs.mkdirSync(destinationDirectory, { recursive: true });

  componentFileContents.forEach((fileContent) => {
    const name = /export (?:class|const) ([A-Z][A-Za-z]+)/.exec(fileContent)![1];

    const fileName = `${kebabCase(name.replace('DSR', ''))}.tsx`;
    const filePath = path.resolve(destinationDirectory, fileName);

    fs.writeFileSync(filePath, fileContent);
    console.log(`Generated DSR Component into '${relativeDestinationDirectory}/${fileName}'`);
  });
};

generateDSRComponents();
