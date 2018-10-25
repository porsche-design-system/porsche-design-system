import { storiesOf, TYPE } from "src/app/stories"

import Types from "./Types"
import Groups from "./Groups"
import EdgeCases from "./EdgeCases"

storiesOf(TYPE.MOLECULE, "Button", module)
    .addPropsTable("Button.Group")
    .add(Types)
    .add(Groups)
    .add(EdgeCases)
