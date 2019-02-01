import { addDecorator, configure } from "@storybook/react"
import { checkA11y } from "@storybook/addon-a11y"
import { withBackgrounds } from "@storybook/addon-backgrounds"
import { withNotes } from "@storybook/addon-notes"
import { withInfo } from "@storybook/addon-info"

addDecorator(withInfo)
addDecorator(checkA11y)
addDecorator(withNotes)
addDecorator(
  withBackgrounds([{ name: "twitter", value: "#00aced", default: true }, { name: "facebook", value: "#3b5998" }])
)

const loadStories = () => {
  require("../stories/index.js")
}

configure(loadStories, module)
