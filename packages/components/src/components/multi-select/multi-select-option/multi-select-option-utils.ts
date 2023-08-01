export type MultiSelectOptionUpdateEvent = { optionElement: HTMLPMultiSelectOptionElement };

export const getOptionIndex = (host: HTMLElement): number => Array.from(host.parentElement.children).indexOf(host);
