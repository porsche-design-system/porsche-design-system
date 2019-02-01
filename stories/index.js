import React from "react"
import { storiesOf } from "@storybook/react"
import { Button } from "@storybook/react/demo"
import { action } from "@storybook/addon-actions"
import ButtonREADME from "./button.md"

storiesOf("Button", module).add(
  "with some emoji",
  () => (
    <Button onClick={action("button-click")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ),
  {
    notes: { markdown: ButtonREADME }
  }
)
