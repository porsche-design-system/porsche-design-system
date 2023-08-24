/**
 * Sets attributes on an HTMLElement.
 *
 * @param {HTMLElement} host - The target HTMLElement to set attributes on.
 * @param {{ [x: string]: string }} attributes - An object of attribute names and their corresponding values.
 * @returns {void}
 */
export const setAttributes = (host: HTMLElement, attributes: { [x: string]: string }): void =>
  Object.entries(attributes).forEach((args) => host.setAttribute(...args));
