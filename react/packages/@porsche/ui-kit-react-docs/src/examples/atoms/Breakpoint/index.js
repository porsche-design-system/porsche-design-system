import Settings from "./Settings"

import { Breakpoint } from "@porsche/ui-kit-react"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ATOM, Breakpoint, [], module).add(Settings)
