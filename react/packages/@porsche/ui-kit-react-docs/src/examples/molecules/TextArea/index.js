import Types from "./Types"
import EdgeCases from "./EdgeCases"

import { TextArea } from "@porsche/ui-kit-react"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.MOLECULE, TextArea, [], module)
    .add(Types)
    .add(EdgeCases)
