import Types from "./Types"
import Content from "./Content"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ORGANISM, "Modal", [], module)
    .add(Types)
    .add(Content)
