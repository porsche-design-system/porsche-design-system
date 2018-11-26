import docInfo from "./docgenInfo.json"
import { kebabCase, get, filter } from "lodash"

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
                name: item.component,
                type: item.type
            }
        })
        .filter((item) => {
            return item.name === name
        })
        .shift()
}

function getComponentGroup(component, subComponents) {
    let result = {
        [component]: {
            description: get(docInfo[component], "docBlock.description"),
            props: get(docInfo[component], "props")
        }
    }

    subComponents.forEach((subComponent) => {
        const name = subComponent.replace(".", "")
        result = {
            ...result,
            [name]: {
                description: get(docInfo[name], "docBlock.description"),
                props: get(docInfo[name], "props")
            }
        }
    })

    return result
}

export function load(storyReferences) {
    const result = []

    storyReferences.forEach((ref) => {
        const docBlock = docInfo[ref.component] || {}

        result.push({
            name: ref.component,
            type: ref.type,
            description: docBlock.description || [""],
            examples: ref.examples,
            route: getStoryRoute(ref.type, ref.component),
            path: docBlock.path || "",
            subComponentNames: ref.subComponents,
            seeItems: getSeeItems(storyReferences, ref.component),
            componentGroup: getComponentGroup(ref.component, ref.subComponents)
        })
    })

    return result
}
