import Container from "./Container"
import Items from "./Items"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ATOM, "Flex", [], module)
    .addPropsTable("Flex.Item")
    .add(Container)
    .add(Items)
