import _ from "lodash/fp"

// TODO: Don't duplicate this from ui-kit-react
const TYPES = {
    ATOM: "atom",
    MOLECULE: "molecule",
    ORGANISM: "organism",
    SCREEN: "screen",
    STRUCTURE: "structure"
}

const TYPE_ORDER = [TYPES.ATOM, TYPES.MOLECULE, TYPES.ORGANISM, TYPES.STRUCTURE, TYPES.SCREEN]

const META = {
    TYPES,
    TYPE_ORDER
}

const TYPE_VALUES = _.values(META.TYPES)

/**
 * Determine if an object qualifies as a META object.
 * It must have the required keys and valid values.
 * @private
 * @param {Object} _meta A proposed component _meta object.
 * @returns {Boolean}
 */
export const isMeta = (_meta) => {
    return _.includes(_.get("type", _meta), TYPE_VALUES)
}

/**
 * Extract a component's _meta object and optional key.
 * Handles literal _meta objects, classes with _meta, objects with _meta
 * @private
 * @param {function|object} metaArg A class, a component instance, or meta object..
 * @returns {object|string|undefined}
 */
const getMeta = (metaArg) => {
    // literal
    if (isMeta(metaArg)) return metaArg
    // from prop
    else if (isMeta(_.get("_meta", metaArg))) return metaArg._meta
    // from class
    else if (isMeta(_.get("constructor._meta", metaArg))) return metaArg.constructor._meta
}

const metaHasKeyValue = _.curry((key, val, metaArg) => {
    return _.flow(getMeta, _.get(key), _.eq(val))(metaArg)
})

// ----------------------------------------
// Export
// ----------------------------------------

export const typeOrder = META.TYPE_ORDER

export const isType = metaHasKeyValue("type")

// parent
export const isParent = _.flow(getMeta, _.has("parent"), _.eq(false))
export const isChild = _.flow(getMeta, _.has("parent"))

// other
export const isPrivate = _.flow(getMeta, _.get("name"), _.startsWith("_"))
