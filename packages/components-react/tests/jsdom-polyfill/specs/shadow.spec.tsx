import {
  componentsReady,
  PButton,
  PCheckboxWrapper,
  PRadioButtonWrapper,
  PSelectWrapper,
  PTextareaWrapper,
  PTextFieldWrapper,
} from '@porsche-design-system/components-react';
import { render, fireEvent, GetByRole, getByRole } from '@testing-library/react';

const getHTMLElementsWithShadowRoot = (container: HTMLElement): HTMLElement[] => {
  return Array.from(container.querySelectorAll<HTMLElement>('*')).filter((el) => !!el.shadowRoot);
};

const getByRoleShadow = (
  role: string,
  container = document.querySelector<HTMLElement>('body > div')
): ReturnType<GetByRole<HTMLElement>> => {
  console.log('getByRoleShadow', container.getRootNode().host?.tagName);
  let resultElement: HTMLElement;

  try {
    resultElement = getByRole(container, role);
  } catch (e) {
    const elements = getHTMLElementsWithShadowRoot(container);

    for (const el of elements) {
      resultElement = getByRoleShadow(role, el.shadowRoot as unknown as HTMLElement);

      if (resultElement) {
        break;
      }
    }
  }

  console.log(resultElement.innerHTML);

  return resultElement;
};

describe('getByRoleShadow()', () => {
  it('should work', async () => {
    const { container, getByRole } = render(
      <>
        {/*<PButton>Button</PButton>*/}
        <PTextFieldWrapper>
          <input type="password" />
        </PTextFieldWrapper>
        {/*<PPopover>yo</PPopover>*/}
      </>
    );

    await componentsReady();

    expect(getByRoleShadow('button')).toBeInTheDocument();
    // expect(getByRole('button')).toBeInTheDocument();

    const input = container.querySelector('input');

    expect(input.type).toBe('password');
    fireEvent.click(getByRoleShadow('button'));

    expect(input.type).toBe('text');
  });
});

describe('getByRole()', () => {
  it('should be supported for most form wrappers', async () => {
    const { getByRole } = render(
      <>
        <PCheckboxWrapper label="Checkbox">
          <input type="checkbox" />
        </PCheckboxWrapper>
        <PRadioButtonWrapper label="Radio Button">
          <input type="radio" />
        </PRadioButtonWrapper>
        <PTextFieldWrapper label="Text Field">
          <input type="text" />
        </PTextFieldWrapper>
        <PTextareaWrapper label="Textarea">
          <textarea />
        </PTextareaWrapper>
      </>
    );

    await componentsReady();

    expect(getByRole('checkbox', { name: 'Checkbox' })).toBeInTheDocument();
    expect(getByRole('radio', { name: 'Radio Button' })).toBeInTheDocument();
    expect(getByRole('textbox', { name: 'Text Field' })).toBeInTheDocument();
    expect(getByRole('textbox', { name: 'Textarea' })).toBeInTheDocument();
  });

  it('should be supported for PButton with role button', async () => {
    const { getByRole } = render(<PButton role="button">Button</PButton>);

    await componentsReady();

    expect(getByRole('button', { name: 'Button' })).toBeInTheDocument();
  });

  it('should be supported for PSelectWrapper', async () => {
    const callback = jest.fn();

    const { getByTestId } = render(
      <PSelectWrapper>
        <select data-testid="Select" value="1" onChange={(e) => callback(e.target.value)}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </PSelectWrapper>
    );

    await componentsReady();

    fireEvent.change(getByTestId('Select'), { target: { value: '2' } });

    expect(callback).toHaveBeenCalledWith('2');
  });
});
