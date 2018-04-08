import * as componentLibrary from "@porsche/ui-kit-react"
import { filter, sortBy } from "lodash"

import * as META from "./META"

export getComponentGroup from "./getComponentGroup"
export getSeeItems from "./getSeeItems"
export scrollToAnchor from "./scrollToAnchor"
export shallowEqual from "./shallowEqual"
export { default as keyboardKey } from "./keyboardKey"
export * as META from "./META"

/**
 * Get the Webpack Context for all doc site examples.
 */
export const exampleContext = require.context("src/examples/", true, /(\w+Example\w*|index)\.jsx?$/)

export const parentComponents = (() => {
    const meta = filter(componentLibrary, (component) => { return META.isMeta(component._meta) })

    const parents = filter(meta, (component) => { return META.isParent(component) })

    return sortBy(parents, "_meta.name")
})()
