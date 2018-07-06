/** Finds type {[key: string]: any} */
const isCustomAttribute = (type) => {
    const test = /^{?\s*\[\s*key\s*:\s*string\s*\]\s*:\s*any;?\s*}?$/g
    const match = test.exec(type)

    return match && match.length > 0
}

/** Finds types like: 0 | 6 | 12 | "auto_matic" | "red-1" */
const isEnum = (type) => {
    const test = /^(\s*"?[a-z\d-_]+"?\s*\|\s*){1,}"?[a-z\d-_]+"?\s*$/g
    const match = test.exec(type)

    return (
        match &&
        match.length > 0 &&
        !type.includes("string") &&
        !type.includes("number") &&
        !type.includes("boolean") &&
        !type.includes("object") &&
        !type.includes("any") &&
        !type.includes("void") &&
        !type.includes("null") &&
        !type.includes("undefined")
    )
}

const parseEnumValues = (type) => {
    const values = type.split("|")
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

export default ({ type }) => {
    if (isCustomAttribute(type.name)) {
        return {
            name: "object",
            description: type.description
        }
    }
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
    }

    return type
}
