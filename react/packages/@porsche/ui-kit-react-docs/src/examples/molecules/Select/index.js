import Single from "./Single"
import Multi from "./Multi"
import OptionGroups from "./OptionGroups"
import EdgeCases from "./EdgeCases"

import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.MOLECULE, "Select", [], module)
    .add(Single)
    .add(Multi)
    .add(OptionGroups)
    .add(EdgeCases)
