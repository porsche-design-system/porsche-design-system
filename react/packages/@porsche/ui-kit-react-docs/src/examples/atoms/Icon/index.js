import Variations from "./Variations"
import IconSet from "./IconSet"

import { Icon } from "@porsche/ui-kit-react"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ATOM, Icon, [], module)
    .add(Variations)
    .add(IconSet)
