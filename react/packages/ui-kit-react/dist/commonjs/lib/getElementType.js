Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {object} props A ReactElement props object
 * @param {function} [defaultValue] A string as the default element type.
 * @returns {string} A ReactElement type
 */
exports.getElementType = function (as, defaultValue) {
    // ----------------------------------------
    // user defined "as" element type
    if (as) {
        return as;
    }
    // ----------------------------------------
    // computed default element type
    if (defaultValue) {
        return defaultValue;
    }
    // ----------------------------------------
    // If no props.as and no getDefault, use 'div'
    return "div";
};
//# sourceMappingURL=getElementType.js.map