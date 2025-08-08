import { hasDocument } from './has-document';

export const hasShowPickerSupport = (): boolean => (
  hasDocument &&
  'showPicker' in HTMLInputElement.prototype &&
  // TODO: it would be better to determinate support by checking for existence of "calendar-picker-indicator"
  !!window.navigator.userAgent.match(/chrome|chromium|crios|edg/i)
);
