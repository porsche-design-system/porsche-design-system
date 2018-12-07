import Types from "./Types"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.LAYOUT, "Grid", [], module)
    .addPropsTable("GridChild")
    .add(Types)
