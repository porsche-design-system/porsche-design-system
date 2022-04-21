export type HTMLElementWithRequiredProp = HTMLElement & { required: boolean };

export const isRequired = (el: HTMLElementWithRequiredProp): boolean => !!el.required;
