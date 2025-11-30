/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import type { ToastMessage } from '../../../projects/angular-wrapper/src/public-api';
import { ToastManager } from '../../../projects/angular-wrapper/src/toast-manager';

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

    const addMessageMock = vi.fn();
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
