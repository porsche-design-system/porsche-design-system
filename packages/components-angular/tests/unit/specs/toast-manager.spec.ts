/**
 * @jest-environment jsdom
 */
import { ToastManager } from '../../../projects/components-wrapper/src/toast-manager';
import type { ToastMessage } from '../../../projects/components-wrapper/src/public-api';

it('should instantiate a new ToastManager', () => {
  const toastManager = new ToastManager();
  expect(toastManager).toBeDefined();
  expect(toastManager.addMessage).toBeDefined();
});

describe('addMessage()', () => {
  it('should call addMessage on toast element', async () => {
    const toastManager = new ToastManager();
    const toastElement = document.createElement('p-toast') as HTMLElement & {
      addMessage(message: ToastMessage): void;
    };

    const addMessageMock = jest.fn();
    toastElement.addMessage = addMessageMock;
    document.body.appendChild(toastElement);
    customElements.define('p-toast', class PToast extends HTMLElement {});

    const message: ToastMessage = { text: 'Test', state: 'success' };
    toastManager.addMessage(message);

    // wait for customElements.whenDefined to be resolved
    await new Promise((resolve) => setTimeout(resolve));

    expect(addMessageMock).toHaveBeenCalledWith(message);
  });
});
