import Types from "./Types"
import { storiesOf, TYPE } from "src/app/stories"
import Groups from "./Groups"

storiesOf(TYPE.MOLECULE, "Radio", [], module)
    .add(Types)
    .add(Groups)
