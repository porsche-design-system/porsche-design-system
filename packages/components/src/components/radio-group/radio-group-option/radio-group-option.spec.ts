import { vi } from 'vitest';
import { RadioGroupOption } from './radio-group-option';

describe('RadioGroupOption', () => {
  let component: RadioGroupOption;
  let host: HTMLElement;
  let inputElement: HTMLInputElement & { focus: ReturnType<typeof vi.fn>; click: ReturnType<typeof vi.fn> };

  const triggerHostClick = (target: HTMLElement): void => {
    component['onHostClick']({ target } as unknown as MouseEvent);
  };

  const expectInputUntouched = (): void => {
    expect(inputElement.focus).not.toHaveBeenCalled();
    expect(inputElement.click).not.toHaveBeenCalled();
  };

  beforeEach(() => {
    component = new RadioGroupOption();
    host = document.createElement('p-radio-group-option');
    host.attachShadow({ mode: 'open' });

    component['host'] = host;

    inputElement = document.createElement('input') as typeof inputElement;
    inputElement.focus = vi.fn();
    inputElement.click = vi.fn();

    component['inputElement'] = inputElement;
  });

  it('should focus and click the internal input for allowed targets', () => {
    const target = document.createElement('span');

    triggerHostClick(target);

    expect(inputElement.focus).toHaveBeenCalledTimes(1);
    expect(inputElement.click).toHaveBeenCalledTimes(1);
  });

  it('should not interact when target equals the host', () => {
    triggerHostClick(host);

    expectInputUntouched();
  });

  it('should not interact when target is an anchor element', () => {
    const target = document.createElement('a');

    triggerHostClick(target);

    expectInputUntouched();
  });

  it('should not interact when target is a button element', () => {
    const target = document.createElement('button');

    triggerHostClick(target);

    expectInputUntouched();
  });

  it('should not interact when target shadow root contains interactive descendants', () => {
    const target = document.createElement('div');
    const shadowRoot = target.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(document.createElement('button'));

    triggerHostClick(target);

    expectInputUntouched();
  });
});
