import Variations from "./Variations"
import IconSet from "./IconSet"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ATOM, "Icon", [], module)
    .add(Variations)
    .add(IconSet)
