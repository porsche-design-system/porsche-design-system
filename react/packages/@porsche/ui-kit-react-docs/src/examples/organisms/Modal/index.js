import Types from "./Types"
import Content from "./Content"

import { Modal } from "@porsche/ui-kit-react"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ORGANISM, Modal, [], module)
    .add(Types)
    .add(Content)
