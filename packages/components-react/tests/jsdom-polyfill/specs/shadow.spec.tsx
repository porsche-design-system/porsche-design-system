import {
  componentsReady,
  PAccordion,
  PButton,
  PCheckboxWrapper,
  PRadioButtonWrapper,
  PSelectWrapper,
  PTextareaWrapper,
  PTextFieldWrapper,
} from '@porsche-design-system/components-react';
import {
  getByLabelTextShadowed,
  getByRoleShadowed,
  getByTextShadowed,
} from '@porsche-design-system/components-react/testing';
import { render, fireEvent } from '@testing-library/react';

describe('getByRoleShadowed()', () => {
  it('should work for native button', async () => {
    render(<button>Button</button>);

    expect(getByRoleShadowed('button')).toBeInTheDocument();
  });

  it('should work for PButton', async () => {
    render(<PButton>Button</PButton>);
    await componentsReady();

    expect(getByRoleShadowed('button')).toBeInTheDocument();
  });

  it('should work for nested PButton within PTextFieldWrapper', async () => {
    const { container } = render(
      <PTextFieldWrapper>
        <input type="password" />
      </PTextFieldWrapper>
    );
    await componentsReady();

    expect(getByRoleShadowed('button')).toBeInTheDocument();

    const input = container.querySelector('input');
    expect(input.type).toBe('password');
    fireEvent.click(getByRoleShadowed('button'));
    expect(input.type).toBe('text');
  });
});

describe('getByLabelTextShadowed()', () => {
  it('should work for native input', async () => {
    render(
      <label>
        Message
        <input type="text" />
      </label>
    );

    const el = getByLabelTextShadowed<HTMLInputElement>('Message');
    expect(el).toBeInTheDocument();
    expect(el.type).toBe('text');
  });

  it('should work for PTextFieldWrapper', async () => {
    render(
      <PTextFieldWrapper label="Message">
        <input type="text" />
      </PTextFieldWrapper>
    );
    await componentsReady();

    const el = getByLabelTextShadowed<HTMLInputElement>('Message');
    expect(el).toBeInTheDocument();
    expect(el.type).toBe('text');
  });
});

describe('getByTextShadowed()', () => {
  it('should work for native h1', async () => {
    render(<h1>Headline</h1>);

    const el = getByTextShadowed('Headline');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('H1');
  });

  it('should work for PAccordion', async () => {
    render(<PAccordion heading="Headline">Content</PAccordion>);
    await componentsReady();

    const el = getByTextShadowed('Headline');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('BUTTON');
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
