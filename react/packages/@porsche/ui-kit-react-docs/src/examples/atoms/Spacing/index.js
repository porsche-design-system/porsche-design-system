import Types from "./Types"
import EdgeCases from "./EdgeCases"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ATOM, "Spacing", [], module)
    .add(Types)
    .add(EdgeCases)
