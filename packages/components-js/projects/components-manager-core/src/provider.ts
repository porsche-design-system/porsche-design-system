/**
 * this functionality is meant to be used by the provider of a web component
 * library to provide a compatible library
 */

export type { ComponentsManagerData } from './services/components-manager';
export { loadComponentLibrary, setRegisterComponentsCallback } from './services/library-handler';
