import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { paramCase } from 'change-case';
import { type TagName, TAG_NAMES, INTERNAL_TAG_NAMES } from '@porsche-design-system/shared';
import { ICONS_MANIFEST } from '@porsche-design-system/assets';

const glue = '\n\n';

global.ROLLUP_REPLACE_IS_STAGING = 'staging';

// can't resolve @porsche-design-system/components without building it first, therefore we use relative path
const sourceDirectory = path.resolve('../components/src/components');
const componentFileNames = globby.sync(`${sourceDirectory}/**/*.tsx`);

const getComponentFilePath = (tagName: TagName): string => {
  return componentFileNames.find((fileName) => fileName.match(new RegExp(`${tagName.replace(/^p-/, '/')}\\.tsx$`)));
};

const getImportFilePath = (source: string, constName: string, tagName: TagName): string => {
  const componentFilePath = getComponentFilePath(tagName);
  const [, importPath] = source.match(new RegExp(`${constName}[\\s\\S]+?from '(.+)';`));

  return importPath?.match(/^\./)
    ? path.resolve(componentFilePath, '..', importPath) // relative path
    : importPath; // absolute path to other package
};

const getEvaluablePropTypeString = (propTypes: string): string => {
  return propTypes
    ?.replace(/([a-zA-Z]+): (.+),/g, '$1: "$2",') // wrap values in quotes to make the object evaluable
    .replace(/[^"](AllowedTypes\.(?:shape|oneOf).+\([{[][\s\S]+?(?: {2}|\b)[}\]]\)),/g, '`$1`,'); // wrap multiline shape object and oneOf array in backticks
};

const generateComponentMeta = (): void => {
  const imports = `import type { TagName } from '@porsche-design-system/shared';`;

  const types = [
    `export type PropMeta = {
  description?: string;
  type: string;
  defaultValue: boolean | number | string | object | null;
  allowedValues?: 'boolean' | 'number' | 'string' | object | string[];
  deprecatedValues?: string[];
  isRequired?: boolean;
  isDeprecated?: boolean;
  isBreakpointCustomizable?: boolean;
  isAria?: boolean;
  isArray?: boolean;
};`,
    `export type EventMeta = {
  description?: string;
  type: string;
  typeDetail?: string;
  isDeprecated?: boolean;
};`,
    `export type ComponentMeta = {
  isDeprecated?: boolean;
  deprecationMessage?: string;
  isExperimental?: boolean;
  isDelegatingFocus: boolean;
  isInternal: boolean;
  isThemeable: boolean;
  requiredParent?: TagName; // typically components with an \`-item\` suffix need the right parent in order to work
  requiredRootNode?: TagName[]; // components, that use this internal component within their shadow DOM
  requiredChild?: string; // direct and only child of kind
  requiredChildSelector?: string; // might contain multiple selectors separated by comma
  nestedComponents?: TagName[]; // array of other pds components
  propsMeta?: { [propName: string]: PropMeta }; // new format
  props?: {
    [propName: string]: boolean | number | string | object | null; // value is the prop's default value
  };
  requiredProps?: string[]; // array of props that are mandatory
  deprecatedProps?: string[]; // array of props that are deprecated
  breakpointCustomizableProps?: string[]; // array of props that are breakpointCustomizable
  arrayProps?: string[]; // array of props that are of type array
  allowedPropValues?: {
    [propName: string]: 'boolean' | 'number' | 'string' | object | string[];
  };
  deprecatedPropValues?: {
    [propName: string]: string[]; // array of values of a prop that are deprecated
  };
  internalProps?: {
    [propName: string]: boolean | number | string | object | null; // value is the prop's default value
  };
  hostAttributes?: {
    [attrName: string]: string;
  };
  hasSlot: boolean;
  namedSlots?: string[]; // array of named slots
  requiredNamedSlots?: { slotName: string; tagName: TagName }[]; // array of objects for each named slot with specific component tag
  eventsMeta?: { [eventName: string]: EventMeta }; // new format
  hasEvent: boolean;
  eventNames?: string[];
  deprecatedEventNames?: string[]; // array of event names
  hasAriaProp: boolean;
  hasObserveAttributes: boolean;
  observedAttributes?: string[];
  hasObserveChildren: boolean;
  styling: 'jss' | 'scss' | 'hybrid';
};`,
    `type ComponentsMeta = Record<TagName, ComponentMeta>;`,
  ].join(glue);

  type PropMeta = {
    description?: string;
    type: string;
    defaultValue: boolean | number | string | object | null;
    allowedValues?: 'boolean' | 'number' | 'string' | object | string[];
    deprecatedValues?: string[];
    isRequired?: boolean;
    isDeprecated?: boolean;
    isBreakpointCustomizable?: boolean;
    isAria?: boolean;
    isArray?: boolean;
  };

  type EventMeta = {
    description?: string;
    type: string;
    typeDetail?: string;
    isDeprecated?: boolean;
  };

  type ComponentMeta = {
    isDeprecated?: boolean;
    deprecationMessage?: string;
    isExperimental?: boolean;
    isDelegatingFocus: boolean;
    isInternal: boolean;
    isThemeable: boolean;
    requiredParent?: TagName; // typically components with an `-item` suffix need the right parent in order to work
    requiredRootNode?: TagName[]; // components, that use this internal component within their shadow DOM
    requiredChild?: string; // direct and only child of kind
    requiredChildSelector?: string; // might contain multiple selectors separated by comma
    nestedComponents?: TagName[]; // array of other pds components
    propsMeta?: { [propName: string]: PropMeta }; // new format
    props?: {
      [propName: string]: boolean | number | string | object | null; // value is the prop's default value
    };
    requiredProps?: string[]; // array of props that are mandatory
    deprecatedProps?: string[]; // array of props that are deprecated
    breakpointCustomizableProps?: string[]; // array of props that are breakpointCustomizable
    arrayProps?: string[]; // array of props that are of type array
    allowedPropValues?: {
      [propName: string]: 'boolean' | 'number' | 'string' | object | string[];
    };
    deprecatedPropValues?: {
      [propName: string]: string[]; // array of values of a prop that are deprecated
    };
    internalProps?: {
      [propName: string]: boolean | number | string | object | null; // value is the prop's default value
    };
    hostAttributes?: {
      [attrName: string]: string;
    };
    hasSlot: boolean;
    namedSlots?: string[]; // array of named slots
    requiredNamedSlots?: { slotName: string; tagName: TagName }[]; // array of objects for each named slot with specific component tag
    eventsMeta?: { [eventName: string]: EventMeta }; // new format
    hasEvent: boolean;
    eventNames?: string[];
    deprecatedEventNames?: string[]; // array of event names
    hasAriaProp: boolean;
    hasObserveAttributes: boolean;
    observedAttributes?: string[];
    hasObserveChildren: boolean;
    styling: 'jss' | 'scss' | 'hybrid';
  };

  type ComponentsMeta = Record<TagName, ComponentMeta>;

  const componentSourceCode: Record<TagName, string> = componentFileNames.reduce(
    (result, filePath) => {
      const tagName: TagName = ('p-' + path.basename(filePath).replace('.tsx', '')) as TagName;

      // get rid of functional components like StateMessage
      if (TAG_NAMES.includes(tagName)) {
        result[tagName] = fs.readFileSync(filePath, 'utf8');
      }

      return result;
    },
    {} as Record<TagName, string>
  );

  const meta: ComponentsMeta = TAG_NAMES.reduce((result, tagName) => {
    const source = componentSourceCode[tagName];

    const [deprecated, rawDeprecationMessage] = /\/\*\* @deprecated (.*)\*\/\n@Component\({/.exec(source) || [];
    const isDeprecated = !!deprecated;
    const deprecationMessage = rawDeprecationMessage?.trim();
    const isExperimental = !!/\/\*\* __Experimental__ \*\/\n@Component\({/.exec(source);
    const isDelegatingFocus = source.includes('delegatesFocus: true');
    const isInternal = INTERNAL_TAG_NAMES.includes(tagName);
    const isThemeable = source.includes('public theme?: Theme');
    const hasSlot = source.includes('<slot');
    const hasEvent = source.includes('@Event') && source.includes('EventEmitter');
    const hasAriaProp = source.includes('public aria?: SelectedAriaAttributes');
    const hasObserveAttributes = source.includes('observeAttributes(this.'); // this should be safe enough, but would miss a local variable as first parameter
    const hasObserveChildren = !!source.match(/\bobserveChildren\(\s*this./); // this should be safe enough, but would miss a local variable as first parameter
    const usesScss = source.includes('styleUrl:');
    const usesJss = source.includes('attachComponentCss');
    const styling = usesScss && usesJss ? 'hybrid' : usesJss ? 'jss' : 'scss';

    // required parent
    const [, requiredParent] =
      (/throwIfParentIsNotOfKind\(.+'([a-z-]+)'\)/.exec(source) as unknown as [string, TagName]) || [];

    // required root nodes
    let [, requiredRootNodes] =
      (/throwIfRootNodeIsNotOneOfKind\(.+\[([a-z-,\s']+)]\)/.exec(source) as unknown as [string, TagName[]]) || [];
    requiredRootNodes = requiredRootNodes
      ? ((requiredRootNodes as unknown as string).replace(/['\s]/g, '').split(',') as TagName[])
      : [];

    // required child
    let [, requiredChild] = /getOnlyChildOfKindHTMLElementOrThrow\(\s*this\.host,([\s\S]+?)\);/.exec(source) || [];
    requiredChild = requiredChild?.trim();
    let requiredChildSelector: string;

    if (requiredChild) {
      const cleanSelector = (markup: string): string =>
        markup
          .replace(/\[/g, ' ') // replace opening bracket of attribute selector
          .replace(/]/g, ''); // replace closing bracket of attribute selector

      if (requiredChild.startsWith("'") && requiredChild.endsWith("'")) {
        // it's a simple string
        requiredChild = requiredChild.slice(1, -1);
        requiredChildSelector = requiredChild;
        requiredChild = cleanSelector(requiredChild);
      } else {
        // it's a variable or some dynamic value
        const [, valueRaw] = new RegExp(`const ${requiredChild} = ((?:.|\\s)*?;)`).exec(source) || [];
        const value = eval(valueRaw || requiredChild);
        requiredChild = value.split(',')[0];
        requiredChild = cleanSelector(requiredChild);
        requiredChildSelector = value;
      }
    }

    // nested pds components
    const nestedComponents: TagName[] = [
      ...Array.from(source.matchAll(/<PrefixedTagNames\.(p[A-Za-z]+)/g)).map(
        ([, tagName]) => paramCase(tagName) as TagName
      ),
      ...(source.match(/<StateMessage/) ? ['p-icon' as TagName] : []),
    ].filter((x, idx, arr) => arr.findIndex((t) => t === x) === idx); // remove duplicates;

    const deprecatedProps: ComponentMeta['deprecatedProps'] = [];

    const arrayProps: ComponentMeta['arrayProps'] = [];

    // props
    const propsMeta: ComponentMeta['propsMeta'] = {};

    const props: ComponentMeta['props'] = Array.from(
      source.matchAll(/(  \/\*\*[\s\S]+?)?@Prop\(.*\) public ([a-zA-Z]+)\??(?:(?:: (.+?))| )(?:=[^>]\s*([\s\S]+?))?;/g)
    ).reduce(
      (result, [, jsdoc, propName, propType, propValue]) => {
        let cleanedValue: boolean | number | string | object =
          propValue === 'true'
            ? true
            : propValue === 'false'
              ? false
              : // undefined values get lost in JSON.stringify, but null is allowed
                propValue
                  ?.replace(/^['"](.*)['"]$/, '$1') // propValue is a string and might contain a string wrapped in quotes since it is extracted like this
                  .replace(/\s+/g, ' ') // remove new lines and multiple spaces
                  .replace(/,( })/, '$1') ?? null; // remove trailing comma in original multiline objects

        if (typeof cleanedValue === 'string') {
          if (cleanedValue.match(/^\d+$/)) {
            // parse numbers
            cleanedValue = parseInt(cleanedValue);

            if (tagName === 'p-model-signature' && cleanedValue === 911) {
              cleanedValue = `${cleanedValue}`; // convert it back to string
            }
          } else if (cleanedValue.match(/^{.+}$/)) {
            // parse objects
            cleanedValue = eval(`(${cleanedValue})`);
          } else if (cleanedValue.match(/\[.*]/g)) {
            // parse arrays
            if (cleanedValue !== '[]') {
              // TODO: Support non empty array values
              throw new Error(`Expected an empty array '[]' for prop '${propName}', but found '${propValue}'`);
            }
            arrayProps.push(propName);
            cleanedValue = [];
          }
        }

        if (jsdoc?.match(/@deprecated/)) {
          deprecatedProps.push(propName);
        }

        // new format
        propsMeta[propName] = {
          description: jsdoc
            ?.replace(/\/\*\*/, '')
            .replace(/\*\/\n/, '')
            .replace(/\s+\*/g, '')
            .trim(),
          type: propType.replace(/(?:BreakpointCustomizable|SelectedAriaAttributes)<(.+?)>/, '$1').trim(), // contains trailing space
          defaultValue: cleanedValue,
          ...(jsdoc?.match(/@deprecated/) && { isDeprecated: true }),
          ...(propType.match(/SelectedAriaAttributes/) && { isAria: true }),
          ...(Array.isArray(cleanedValue) && { isArray: true }),
        };

        return {
          ...result,
          [propName]: cleanedValue,
        };
      },
      {} as ComponentMeta['props']
    );

    // required props
    const requiredProps: ComponentMeta['requiredProps'] = Array.from(
      // similar regex as above without optional ? modifier
      source.matchAll(/@Prop\(.*\) public ([a-zA-Z]+)(?:(?:: (.+?))| )(?:=[^>]\s*([\s\S]+?))?;/g)
    ).map(([, propName]) => propName);

    const [, invalidLinkUsageProp] =
      /throwIfInvalidLink(?:Pure|TileProduct)?Usage\(this\.host, this\.([a-zA-Z]+)\);/.exec(source) || [];
    if (invalidLinkUsageProp) {
      // const [, propType] = new RegExp(`@Prop\\(\\) public ${invalidLinkUsageProp}\\?: (.+);`).exec(source) || [];
      requiredProps.push(invalidLinkUsageProp);
    }

    // new format
    requiredProps.forEach((propName) => (propsMeta[propName].isRequired = true));

    let [, rawPropTypes] = /const [a-z][a-zA-Z]+: (?:Omit<)?PropTypes<.+?> = ({[\s\S]+?});/.exec(source) || [];

    // handle shared props
    let sourceWithSharedProps: string;

    const sharedPropsRegex = /\n {2}\.{3}(([a-zA-Z]+))/;
    const [, sharedPropsName] = rawPropTypes?.match(sharedPropsRegex) || [];
    if (sharedPropsName) {
      // TODO: currently the scenario for multiple shared props is not supported
      if (rawPropTypes.match(new RegExp(sharedPropsRegex, 'g')).length > 1) {
        // global flag allows iterative matches and returns array of all matches
        throw new Error('Currently the scenario for multiple shared props is not supported.');
      }
      const sharedPropsExportFilePath = getImportFilePath(source, sharedPropsName, tagName);

      const sharedPropsExportFile = fs.readFileSync(`${sharedPropsExportFilePath}.ts`, 'utf8');
      let [, sharedProps] = /const [a-z][a-zA-Z]+: .+? = ({[\s\S]+?});/.exec(sharedPropsExportFile) || [];

      // add imports of shared properties
      // TODO: currently the scenario for multiple shared props is not supported
      // TODO: currently no other imports than from packages/components/src/utils/index.ts are supported
      const allSharedConstants = sharedPropsExportFile.match(/([A-Z]{2,}(_[A-Z]+)*)/g).join(', ');
      sourceWithSharedProps = `import { ${allSharedConstants} } from '../../utils';\n${source}`;

      // since it is more verbose to address shared proptypes using require(),
      // the next steps are to ensure the extracted object matches the required type
      const evaluableSharedProps = getEvaluablePropTypeString(sharedProps);
      const requiredKeys = Object.keys(require(sharedPropsExportFilePath)[sharedPropsName]);
      const readFileKeys = Object.keys(eval(`(${evaluableSharedProps})`) as Record<string, string>);
      if (requiredKeys.length !== readFileKeys.length || !requiredKeys.every((key) => readFileKeys.includes(key))) {
        throw new Error('Currently the scenario for shared props imported from multiple files is not supported.');
      }

      sharedProps = sharedProps.replace(/[{}]/g, ''); // remove curly brackets
      rawPropTypes = rawPropTypes.replace(sharedPropsRegex, sharedProps);
      rawPropTypes = rawPropTypes.replace(/\n,/, ''); // remove leftover comma
    }

    rawPropTypes = getEvaluablePropTypeString(rawPropTypes);

    const propTypes = eval(`(${rawPropTypes})`) as Record<string, string>;

    // breakpointCustomizableProps
    const breakpointCustomizableProps: ComponentMeta['breakpointCustomizableProps'] = [];

    // deprecatedPropValues
    const deprecatedPropValues: ComponentMeta['deprecatedPropValues'] = {};

    // allowedPropValues
    const allowedPropValues: ComponentMeta['allowedPropValues'] =
      isInternal || !propTypes
        ? {} // internal components or ones without propTypes validation don't matter
        : Object.entries(propTypes).reduce(
            (result, [propName, propType]) => {
              propType = propType.replace('AllowedTypes.', ''); // replace just the first one
              if (propType.match(/^(?:breakpoint|oneOf|aria)/)) {
                if (propType.match('breakpoint')) {
                  breakpointCustomizableProps.push(propName);
                }

                let [, values] = propType.match(/\(['"]?((?:.|\n)+?)['"]?\)$/);
                if (values.match(/^\[[\s\S]+?]$/) || values.match(/[A-Z_]{5,}/)) {
                  result[propName] = [];
                  if (values.match(/undefined/)) {
                    (result[propName] as string[]).push(undefined);
                  }

                  const [, variable] = values.match(/([A-Z_]{5,})/) || [];
                  if (variable) {
                    const variableImportFilePath = getImportFilePath(
                      source.includes(variable) ? source : sourceWithSharedProps,
                      variable,
                      tagName
                    );

                    // can be shared utils barrel, cross import from other component or component utils
                    const variableModule = require(variableImportFilePath);
                    let variableValues: string[] = variableModule[variable];

                    // check if there is a _DEPRECATED array to import
                    if (variableModule[`${variable}_DEPRECATED`]) {
                      deprecatedPropValues[propName] = variableModule[`${variable}_DEPRECATED`];
                    }

                    // in addition, check for warnIfDeprecatedPropValueIsUsed since imports could be across multiple corner
                    const deprecationMapRegEx = new RegExp(
                      `warnIfDeprecatedPropValueIsUsed<.+?>\\(this, '${propName}', ([\\s\\S]+?)\\);`
                    );
                    if (source.match(deprecationMapRegEx)) {
                      // can be inline object or variable reference
                      let [, deprecationMapVariableOrName] = source.match(deprecationMapRegEx) || [];
                      deprecationMapVariableOrName = deprecationMapVariableOrName.match(/^{/)
                        ? deprecationMapVariableOrName // inline object
                        : source.match(new RegExp(`const ${deprecationMapVariableOrName}.+=([\\s\\S]+?);`))?.[1]; // extract variable assignment

                      const deprecationMap = eval(`(${deprecationMapVariableOrName})`) as Record<string, string>;

                      deprecatedPropValues[propName] = [
                        ...(deprecatedPropValues[propName] || []),
                        ...Object.keys(deprecationMap),
                      ].filter((x, idx, arr) => arr.findIndex((t) => t === x) === idx); // remove duplicates
                    }

                    // handle stuff like ICONS_MANIFEST
                    if (values.match(/^Object\.keys/)) {
                      variableValues = Object.keys(variableValues);
                    }

                    // aria needs to be converted to object
                    if (propType.match(/^aria/)) {
                      // TODO: replace string values with real literal types as it really is
                      result[propName] = variableValues.reduce((res, curr) => ({ ...res, [curr]: 'string' }), {});
                    } else {
                      result[propName] = [...(result[propName] as string[]), ...variableValues];
                    }
                  } else if (propType.match(/^oneOf<ValidatorFunction>/)) {
                    // e.g. in segmented-control, segmented-control-item or carousel
                    const [, oneOfParam] = propType.match(/\(((?:.|\n)+)\)/);
                    const [, oneOfValues] = oneOfParam.match(/^\[((?:.|\n)+)]$/) || [];

                    if (oneOfValues) {
                      // it's an array
                      const values = oneOfValues
                        .split(',')
                        .map(
                          (val) =>
                            val
                              .trim()
                              .replace(/^AllowedTypes./, '')
                              .replace(/.*'([a-z]+)'.*/, '$1') // extract string values like 'number' or 'auto' that are passed to a nested validator funnction
                        )
                        .filter((val) => val);
                      result[propName] = values;
                    } else {
                      // TODO: support this scenario once it occurs
                      console.log('unsupported scenario', propType);
                      result[propName] = ['// TODO'];
                    }
                  } else if (!variable) {
                    // must be array of inline values
                    result[propName] = eval(`(${values})`);
                  } else {
                    throw new Error(
                      `Unsupported propType for breakpoint or oneOf in "${tagName}" "${propName}": ${propType}`
                    );
                  }
                } else if (values === 'boolean' || values === 'number') {
                  result[propName] = values;
                }
              } else if (propType === 'boolean' || propType === 'number' || propType === 'string') {
                // need to retrieve array of possible icons
                if (propName === 'icon' || propName === 'actionIcon') {
                  const supportsNone = source.match(
                    new RegExp(`@Prop\\(\\) public ${propName}\\?: ${propsMeta[propName].type} = 'none';`)
                  );
                  result[propName] = [...Object.keys(ICONS_MANIFEST), ...(supportsNone ? ['none'] : [''])].sort();
                } else if (
                  propName === 'target' &&
                  propType === 'string' &&
                  source.match(new RegExp(`@Prop\\(\\) public ${propName}\\?: ${propsMeta[propName].type} = '_self';`))
                ) {
                  // target props support literal type and string
                  const utils = require(path.resolve(sourceDirectory, '../utils'));
                  result[propName] = [...utils.LINK_TARGETS, propType];
                } else {
                  result[propName] = propType;
                }
              } else if (propType.match(/^shape/)) {
                const [, shapeValues] = propType.match(/({[\s\S]+?})/) || [];
                const shapeValuesObject = eval(`(${shapeValues})`) as Record<string, string>;
                result[propName] = Object.fromEntries(
                  Object.entries(shapeValuesObject).map(([key, val]) => {
                    val = val.replace('AllowedTypes.', '');

                    if (val.match(/^oneOf/)) {
                      // extract oneOf parameter
                      let [, values] = val.match(/\(['"]?((?:.|\n)+?)['"]?\)/);
                      if (values.match(/^\[.+]$/)) {
                        // only inline values are supported
                        val = eval(`(${values})`);
                      }
                    }

                    return [key, val];
                  })
                );
              } else if (propType.match(/^array/)) {
                propType = propType.replace(/.*AllowedTypes\.(string|number|boolean).*/, '$1');
                if (propType !== 'string' && propType !== 'number' && propType !== 'boolean') {
                  throw new Error(`Unsupported propType in "${tagName}" "${propName}": ${propType}`);
                }
                // only arrays of same type are supported, e.g. string[], number[] or boolean[]
                result[propName] = propType;
              } else {
                throw new Error(`Unsupported propType in "${tagName}" "${propName}": ${propType}`);
              }
              return result;
            },
            {} as ComponentMeta['allowedPropValues']
          );

    // new format
    breakpointCustomizableProps.forEach((propName) => (propsMeta[propName].isBreakpointCustomizable = true));
    Object.entries(allowedPropValues).forEach(
      // TODO: values of certain shared types like IconName or SelectedAriaAttributes are not resolved, yet
      ([propName, propValues]) => (propsMeta[propName].allowedValues = propValues)
    );
    Object.entries(deprecatedPropValues).forEach(
      ([propName, propValues]) => (propsMeta[propName].deprecatedValues = propValues)
    );

    // internal props set by parent
    const internalProps: ComponentMeta['internalProps'] = {};

    // extract properties from this.host that are set by parent element
    const [, rawAttachComponentCssParams] = /attachComponentCss\(([\s\S]+?)\);/.exec(source) || [];
    if (rawAttachComponentCssParams) {
      const attachComponentCssParams = rawAttachComponentCssParams
        .replace(/\/\/.*/g, '') // strip comments
        .split(rawAttachComponentCssParams.includes('\n') ? '\n' : ',')
        .map((x) => x.trim());
      const internalPropParams = attachComponentCssParams
        .slice(2) // get rid of first 2 params: this.host and getComponentCss
        .filter((param) => param.startsWith('this.host.')) // get rid of regular props, states and private members
        .map((param) => /this\.host\.([A-Za-z]+)(?: \|\| '?([\dA-Za-z: ,{}]+)'?)?/.exec(param) || []) // extract param and default value if there is any
        .map(([, param, value]) => [param, value]);

      internalPropParams.forEach(([prop, value]) => {
        internalProps[prop] = value || null; // null is needed to not lose property in JSON.stringify
      });
    }

    // host attributes
    // TODO: currently only hardcoded attributes are extracted
    let hostAttributes: ComponentMeta['hostAttributes'] = {};
    const [, rawHostAttributes] = /<Host (.*)>/.exec(source) || [];
    if (rawHostAttributes) {
      hostAttributes = rawHostAttributes
        .split(' ')
        .map((attrKeyValuePair) =>
          Array.from(attrKeyValuePair.matchAll(/([-a-z]+)="(.+?)"/g)).map(([, attr, val]) => [attr, val])
        )
        .flat()
        .reduce((result, [attr, val]) => ({ ...result, [attr]: val }), {} as ComponentMeta['hostAttributes']);
    }

    // named slots
    const namedSlots = Array.from(source.matchAll(/<slot name="((?!internal-)[a-z-]+?)"/g)).map(
      ([, slotName]) => slotName
    );

    if (source.includes('<Label')) {
      namedSlots.push('label');
    }
    if (/<Label[\s\S]+?description/.test(source)) {
      namedSlots.push('description');
    }
    if (source.includes('<StateMessage')) {
      namedSlots.push('message');
    }

    // required named slots
    const requiredNamedSlots: ComponentMeta['requiredNamedSlots'] = Array.from(
      source.matchAll(/const ([a-zA-Z]+) = getNamedSlotOrThrow\(this\.host, '([a-zA-Z]+)'\)/g)
    ).map(([, constName, slotName]) => {
      if (!namedSlots.includes(slotName)) {
        throw new Error(`Extracted slotName '${slotName}' is not included in namedSlots: ${namedSlots.join(', ')}`);
      }

      const [, tagName] = (new RegExp(`throwIfElementIsNotOfKind\\(this\\.host, ${constName}, '([a-zA-Z-]+)'\\)`).exec(
        source
      ) || []) as unknown as [string, TagName];

      return { slotName, tagName };
    });

    const deprecatedEventNames: ComponentMeta['deprecatedEventNames'] = [];

    // events
    const eventsMeta: ComponentMeta['eventsMeta'] = {};

    const eventNames = Array.from(
      source.matchAll(/(  \/\*\*(?:.*\n){0,3})?.+?([A-Za-z]+)\??: EventEmitter<(.+)>/g)
    ).map(([, jsdoc, eventName, eventType]) => {
      if (jsdoc?.match(/@deprecated/)) {
        deprecatedEventNames.push(eventName);
      }

      let typeDetail: string;
      if (eventType !== 'void') {
        // let's find the file where the type is defined
        const [, relativeEventTypePath] =
          source.match(new RegExp(`import [\\s\\S]+?${eventType}[\\s\\S]+?from '([\\s\\S]+?)';`)) || [];

        const componentSourceFilePath = componentFileNames.find((fileName) =>
          fileName.match(new RegExp(`${tagName.replace('p-', '')}\.tsx$`))
        );
        const eventTypePath = path.resolve(componentSourceFilePath, `../${relativeEventTypePath}.ts`);
        const eventTypeFileContent = fs.readFileSync(eventTypePath, 'utf8');

        // type can be an alias of another type
        const [, eventTypeAlias] =
          eventTypeFileContent.match(new RegExp(`type ${eventType} = ([A-Z][a-z][A-Za-z]+);`)) || [];
        let [, eventTypeDetail] =
          eventTypeFileContent.match(new RegExp(`type ${eventTypeAlias || eventType} = ({[\\s\\S]+?});\\n`)) || [];

        if (eventTypeDetail) {
          typeDetail = eventTypeDetail;
        } else {
          // the type is imported from somewhere else
          const [, relativeAliasTypePath] =
            eventTypeFileContent.match(
              new RegExp(`import [\\s\\S]+?${eventTypeAlias}[\\s\\S]+?from '([\\s\\S]+?)';`)
            ) || [];
          const eventAliasTypePath = path.resolve(eventTypePath, `../${relativeAliasTypePath}.ts`);
          const eventAliasTypeFileContent = fs.readFileSync(eventAliasTypePath, 'utf8');

          // alias type can be an alias of another type
          const [, eventAliasTypeAlias] =
            eventAliasTypeFileContent.match(new RegExp(`type ${eventTypeAlias} = ([A-Z][a-z][A-Za-z]+);`)) || [];
          const [, eventAliasTypeDetail] =
            eventAliasTypeFileContent.match(
              new RegExp(`type ${eventAliasTypeAlias || eventTypeAlias} = ({[\\s\\S]+?});\\n`)
            ) || [];

          if (!eventAliasTypeDetail) {
            throw new Error(
              `Couldn't find alias ${eventTypeAlias} for ${eventType} in ${eventAliasTypePath}, perhaps it is another alias which isn't supported, yet.`
            );
          }

          typeDetail = eventAliasTypeDetail;
        }

        typeDetail = typeDetail
          .replace(/ \/\/.+/g, '') // remove comments
          .replace(/\s+/g, ' ') // multi line to single line
          .replace(/; }/, ' }'); // remove last semi colon
      }

      eventsMeta[eventName] = {
        description: jsdoc
          ?.replace(/\/\*\*/, '')
          .replace(/\*\/\n/, '')
          .replace(/\s+\*/g, '')
          .trim(),
        type: eventType,
        ...(typeDetail && { typeDetail }),
        ...(jsdoc?.match(/@deprecated/) && { isDeprecated: true }),
      };

      return eventName;
    });

    // observed attributes
    let observedAttributes: ComponentMeta['observedAttributes'] = [];
    const [, rawObservedAttributes] = /observeAttributes\([a-zA-Z.]+, (\[.+]),.+?\);/.exec(source) || [];
    if (rawObservedAttributes) {
      observedAttributes = eval(rawObservedAttributes);
    }

    result[tagName] = {
      ...(isDeprecated && { isDeprecated, deprecationMessage }),
      ...(isExperimental && { isExperimental }),
      isDelegatingFocus,
      isInternal,
      isThemeable,
      requiredParent,
      ...(requiredRootNodes.length && { requiredRootNode: requiredRootNodes }), // TODO: singular / plural mismatch?
      requiredChild,
      requiredChildSelector,
      ...(nestedComponents.length && { nestedComponents }),
      ...(Object.keys(propsMeta).length && { propsMeta }), // new format
      ...(Object.keys(props).length && { props }),
      ...(requiredProps.length && { requiredProps }),
      ...(deprecatedProps.length && { deprecatedProps }),
      ...(Object.keys(allowedPropValues).length && { allowedPropValues }),
      ...(Object.keys(deprecatedPropValues).length && { deprecatedPropValues }),
      ...(breakpointCustomizableProps.length && { breakpointCustomizableProps }),
      ...(arrayProps.length && { arrayProps }),
      ...(Object.keys(internalProps).length && { internalProps }),
      ...(Object.keys(hostAttributes).length && { hostAttributes }),
      hasSlot,
      ...(namedSlots.length && { namedSlots }),
      ...(requiredNamedSlots.length && { requiredNamedSlots }),
      ...(Object.keys(eventsMeta).length && { eventsMeta }), // new format
      hasEvent,
      ...(eventNames.length && { eventNames }),
      ...(deprecatedEventNames.length && { deprecatedEventNames }),
      hasAriaProp,
      hasObserveAttributes,
      ...(observedAttributes.length && { observedAttributes }),
      hasObserveChildren,
      styling,
    };
    return result;
  }, {} as ComponentsMeta);

  const functions = [
    `export const componentMeta: ComponentsMeta = ${JSON.stringify(meta)};`,
    `export const getComponentMeta = (component: TagName): ComponentMeta => componentMeta[component];`,
  ].join(glue);

  const content = [imports, types, functions].join(glue);

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'componentMeta.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName}`);
};

generateComponentMeta();
