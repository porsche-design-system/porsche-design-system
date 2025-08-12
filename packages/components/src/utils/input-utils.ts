import { hasDocument } from './has-document';

export const hasShowPickerSupport = (): boolean => (
  hasDocument &&
  'showPicker' in HTMLInputElement.prototype &&
  CSS.supports('selector(::-webkit-calendar-picker-indicator)')
);
