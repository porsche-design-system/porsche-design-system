/// <reference types="react" />
import * as React from "react"
/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {object} props A ReactElement props object
 * @param {function} [defaultValue] A string as the default element type.
 * @returns {string} A ReactElement type
 */
export declare const getElementType: (
    as?: string | React.ComponentClass<{}> | undefined,
    defaultValue?: string | undefined
) => string | React.ComponentClass<{}>
