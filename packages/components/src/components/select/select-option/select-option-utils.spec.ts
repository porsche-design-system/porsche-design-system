import { validateSelectOption } from './select-option-utils';
import * as loggerUtils from '../../../utils/log/logger';

const createMockSlot = (assignedElements: Node[]): HTMLSlotElement => {
  return {
    assignedNodes: jest.fn(() => assignedElements),
  } as unknown as HTMLSlotElement;
};

describe('validateSelectOption()', () => {
  it('should log error if slot contains invalid elements', () => {
    const host = document.createElement('p-select-option');
    const consoleErrorSpy = jest.spyOn(loggerUtils, 'consoleError').mockReturnValueOnce();
    const img = document.createElement('img');
    const p = document.createElement('p');
    p.innerHTML = 'Some Text';
    const slot = createMockSlot([img, p]);
    validateSelectOption(slot, host);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `child HTMLElements of p-select-option are invalid. Expected all of: text or img.`,
      host
    );
  });
  it('should not log error if slot contains valid elements', () => {
    const host = document.createElement('p-select-option');
    const consoleErrorSpy = jest.spyOn(loggerUtils, 'consoleError').mockReturnValueOnce();
    const img = document.createElement('img');
    const text = document.createTextNode('Some Text');
    const slot = createMockSlot([img, text]);
    validateSelectOption(slot, host);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
