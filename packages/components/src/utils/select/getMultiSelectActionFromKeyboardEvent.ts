export type MultiSelectAction =
  | 'Close' // Close select dropdown
  | 'Select' // Select or deselect the currently highlighted option
  | 'First' // Highlight first option
  | 'Last' // Highlight last option
  | 'Next' // Highlight next option
  | 'Open' // Open select dropdown
  | 'PageDown' // Go 10 options down or to the last option
  | 'PageUp' // Go 10 options up or to the first option
  | 'Previous' // Highlight the previous option
  | 'Type'; // Jump to the matching option by searching

/**
 * Determines the action to be taken based on a keyboard event and the state of the select menu.
 *
 * @param {KeyboardEvent} event - The keyboard event triggering the action.
 * @param {boolean} menuOpen - A boolean indicating whether the select menu is open or closed.
 * @returns {SelectAction} - The corresponding action to be performed.
 */
export const getMultiSelectActionFromKeyboardEvent = (
  event: KeyboardEvent,
  menuOpen: boolean
): MultiSelectAction | undefined => {
  const { key, altKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
  // handle opening when closed
  if (!menuOpen && openKeys.includes(key)) {
    return 'Open';
  }

  // home and end move the selected option when open or closed
  if (key === 'Home') {
    return 'First';
  }
  if (key === 'End') {
    return 'Last';
  }

  // handle keys when open
  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return 'Select';
    }
    if (key === 'ArrowDown' && !altKey) {
      return 'Next';
    }
    if (key === 'ArrowUp') {
      return 'Previous';
    }
    if (key === 'PageUp') {
      return 'PageUp';
    }
    if (key === 'PageDown') {
      return 'PageDown';
    }
    if (key === 'Escape' || key === 'Tab') {
      return 'Close';
    }
    if (key === 'Enter' || key === ' ') {
      return 'Select';
    }
  }
  return undefined;
};
