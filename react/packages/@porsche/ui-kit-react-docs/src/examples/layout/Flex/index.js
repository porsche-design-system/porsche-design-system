import Container from "./Container"
import Items from "./Items"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.LAYOUT, "Flex", [], module)
    .addPropsTable("Flex.Item")
    .add(Container)
    .add(Items)
