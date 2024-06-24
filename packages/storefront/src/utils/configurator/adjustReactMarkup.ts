import { ComponentProps } from '@/utils/componentProps';
import { pascalCase } from 'change-case';
import { TagName } from '@porsche-design-system/shared';
import { ComponentSlots } from '@/utils/componentSlots';

type ReactComponentState = {
  stateVariable: string;
  initialValue: string;
  appliedProp: string;
};

export const adjustReactMarkup = (tagName: string, markup: string, props: ComponentProps, slots: ComponentSlots) => {
  const componentStateProps = extractComponentState(markup);
  const regularProps: ComponentProps = {};

  // Replace component state initial value
  for (const [key, value] of Object.entries(props)) {
    const stateProp = componentStateProps.find((state) => state.appliedProp === key);
    if (stateProp) {
      if (stateProp.initialValue !== value.selectedValue) {
        const initialValueRegex = new RegExp(
          `(const \\[${stateProp.stateVariable}.*useState[^(]*?\\()${stateProp.initialValue}`
        );
        markup = markup.replace(initialValueRegex, `$1${value.selectedValue}`);
      }
    } else {
      regularProps[key] = value;
    }
  }

  markup = applyPropsToMarkup(markup, 'p-flyout', regularProps);

  const componentRegexPascalCase = new RegExp(`(^\\s*)<${tagName}([\\S\\s]*)</${tagName}>`, 'm');

  return markup;
};

export const extractComponentState = (markup: string): ReactComponentState[] => {
  const useStateRegex = /const \[([^,]+).*useState[^(]*?\(([^(]+)\)/g;
  let match;

  const componentState: ReactComponentState[] = [];

  while ((match = useStateRegex.exec(markup)) !== null) {
    const stateVariable = match[1].trim();
    const initialValue = match[2].trim();
    const appliedToRegex = new RegExp(`\\b([^\\s=]+)=\\{${stateVariable}\\}`, 'g');
    const appliedProp = appliedToRegex.exec(markup)?.[1];
    if (!appliedProp) {
      throw new Error(`State ${stateVariable} not applied to component`);
    } else {
      componentState.push({ stateVariable, initialValue, appliedProp });
    }
    // console.log(`State Variable: ${stateVariable}, Initial Value: ${initialValue}, Applied To: ${appliedProp}`);
  }

  return componentState;
};

function applyPropsToMarkup(markup: string, tagName: TagName, props: ComponentProps) {
  const componentName = pascalCase(tagName);
  const component = new RegExp(`${componentName}\\s([^>]*>)`).exec(markup)?.[1];
  if (!component) throw new Error(`No component with ${componentName} found`);

  const attributes = Object.entries(props)
    .filter(([, prop]) => prop.selectedValue && prop.selectedValue !== prop.defaultValue && prop.type !== 'Theme')
    .map(([prop, { selectedValue, type }]) => {
      if (type === 'boolean') {
        return `${prop}={${selectedValue}}`;
      }
      const attributeValue =
        typeof selectedValue === 'object' ? JSON.stringify(selectedValue).replace(/"/g, "'") : selectedValue;
      return `${prop}="${attributeValue}"`;
    })
    .join(' ');

  if (attributes) {
    markup = markup.replace(new RegExp(`(<${componentName})`), `$1 ${attributes}`);
  }

  return markup;
}
