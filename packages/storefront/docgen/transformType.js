/**
 * Replaces something like
 * BreakpointCustomizable<"column-reverse" | "column" | "row-reverse" | "row">
 * with
 * BreakpointCustomizable | "column-reverse" | "column" | "row-reverse" | "row"
 * to not break enum parsing.
 */
const replaceBreakpointCustomizable = (type) => {
  const test = /^BreakpointCustomizable<(.+)>$/g
  const match = test.exec(type)

  if (!match || match.length < 1) {
    return type
  }

  return `BreakpointCustomizable | ${match[1]}`
}

/** Finds types like:
 * 0 | 6 | 12 | "auto_matic" | ... 98 more ... | "red-1"
 * BreakpointCustomizable<boolean | "reverse">
 * */
const isEnum = (type) => {
  const test = /^(\s*"?[\w\d-_\.\s]+"?\s*\|\s*){1,}"?[\w\d-_]+"?\s*$/g
  const match = test.exec(replaceBreakpointCustomizable(type))

  return (
    match &&
    match.length > 0 &&
    !type.includes("string") &&
    !type.includes("number") &&
    !type.includes("object") &&
    !type.includes("any") &&
    !type.includes("void") &&
    !type.includes("null") &&
    !type.includes("undefined")
  )
}

/**
 * Extracts the single values of a union type as an enum value array. Boolean will be destructured to its single values.
 */
const parseEnumValues = (type) => {
  const values = replaceBreakpointCustomizable(type)
    .replace("boolean", "true | false")
    .split("|")
  return values.map((value) => {
    return value.trim()
  })
}

/** Finds fat arrow functions */
const isFunction = (type) => {
  const test = /^\s*\([\w\d\s:<div>,=[\]]*\)\s*=>\s*\(?[\w\d\s:<div>,=[\]]+\)?$/g
  const match = test.exec(type)

  return match && match.length > 0
}

function transformType(type) {
  if (isFunction(type.name)) {
    return {
      name: "func",
      description: type.description
    }
  } else if (isEnum(type.name)) {
    return {
      name: "enum",
      description: type.description,
      value: parseEnumValues(type.name)
    }
  } else if (type.name === "string | ComponentClass<{}, any>") {
    return {
      name: "string | ComponentClass"
    }
  }

  return type
}

module.exports = transformType
