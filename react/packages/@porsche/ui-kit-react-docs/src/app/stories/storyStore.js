import { load } from "./storyLoader"

export function storiesOf(type, component /* , module */) {
    // if (module && module.hot && module.hot.dispose) {
    //     module.hot.dispose(() => {
    //         this._storyStore.removeStoryKind(kind)
    //         this._storyStore.incrementRevision()
    //     })
    // }

    const story = {
        type,
        component,
        subComponents: [],
        examples: []
    }

    story.addPropsTable = (components) => {
        if (Array.isArray(components)) {
            story.subComponents.push(...components)
        } else {
            story.subComponents.push(components)
        }

        return story
    }

    story.add = (element) => {
        story.examples.push(element)
        return story
    }

    if (!window.storyStore) {
        window.storyStore = []
    }

    window.storyStore.push(story)

    return story
}

export function loadStories() {
    window.stories = load(window.storyStore)
}

export function getStories() {
    return window.stories
}

export function getStoryByName(name) {
    return getStories()
        .filter((story) => {
            return story.name === name
        })
        .shift()
}
