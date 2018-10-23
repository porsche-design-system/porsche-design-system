export { default as scrollToAnchor } from "./scrollToAnchor"
export { default as shallowEqual } from "./shallowEqual"
export { default as keyboardKey } from "./keyboardKey"

/**
 * Get the Webpack Context for all doc site examples.
 */
export const exampleContext = require.context("src/examples/", true, /^(?!index).*\.jsx?$/)
