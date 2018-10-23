import docInfo from "./docgenInfo.json"
import { kebabCase, get, filter } from "lodash"

function getComponentName(component) {
    const name = component.displayName || component.name
    return name && name.replace("_", "")
}

function getComponentNames(components) {
    if (!components) {
        return []
    }

    return components.map((component) => {
        return getComponentName(component)
    })
}

function getStoryRoute(category, name) {
    return `/${category}s/${kebabCase(name)}`
}

function getSeeItems(storyReferences, componentName) {
    const info = docInfo[componentName]

    if (!info) {
        return []
    }

    const tags = get(info, "docBlock.tags")

    const filteredTags = filter(tags, ["title", "see"])

    const items = filteredTags.map(({ description }) => {
        const ref = getStoryReferenceByName(storyReferences, description)

        if (!ref) return null
        const { type, name } = ref

        return { name, type }
    })

    return items.filter((item) => {
        return item
    })
}

function getStoryReferenceByName(storyReferences, name) {
    return storyReferences
        .map((item) => {
            return {
                name: getComponentName(item.component),
                type: item.type
            }
        })
        .filter((item) => {
            return item.name === name
        })
        .shift()
}

function getComponentGroup(name, subComponentNames) {
    let result = {
        [name]: {
            description: get(docInfo[name], "docBlock.description"),
            props: get(docInfo[name], "props")
        }
    }

    subComponentNames.forEach((subComponentName) => {
        result = {
            ...result,
            [subComponentName]: {
                description: get(docInfo[subComponentName], "docBlock.description"),
                props: get(docInfo[subComponentName], "props")
            }
        }
    })

    return result
}

export function load(storyReferences) {
    const result = []

    storyReferences.forEach((ref) => {
        const name = getComponentName(ref.component)
        const subComponentNames = getComponentNames(ref.subComponents)

        const docBlock = docInfo[name] || {}

        result.push({
            name,
            type: ref.type,
            description: docBlock.description || [""],
            examples: ref.examples,
            route: getStoryRoute(ref.type, name),
            path: docBlock.path || "",
            subComponentNames,
            seeItems: getSeeItems(storyReferences, name),
            componentGroup: getComponentGroup(name, subComponentNames)
        })
    })

    return result
}
