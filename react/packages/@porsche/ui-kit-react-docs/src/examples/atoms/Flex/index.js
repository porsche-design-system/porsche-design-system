import Container from "./Container"
import Items from "./Items"

import { Flex } from "@porsche/ui-kit-react"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ATOM, Flex, [], module)
    .addPropsTable(Flex.Item)
    .add(Container)
    .add(Items)
