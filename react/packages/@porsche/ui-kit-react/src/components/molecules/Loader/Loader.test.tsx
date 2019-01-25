import * as React from "react"
import { shallow } from "enzyme"
import { Loader, LoaderProps } from "./Loader"
import { prefix } from "../../../lib"

describe("Loader component", () => {
    const createComponent = (props: LoaderProps) => {
        return shallow(<Loader {...props} />)
    }

    it("should be rendered as default loader", () => {
        // Arrange
        const props: LoaderProps = {}
        // Act
        const loader = createComponent(props)
        // Assert
        expect(loader.find(`.${prefix("loader")}`).length).toBe(1)
        expect(loader.find(`.${prefix("loader--small")}`).length).toBe(0)
        expect(loader.find(`.${prefix("loader--inverted")}`).length).toBe(0)
    })

    it("should be rendered as small loader", () => {
        // Arrange
        const props: LoaderProps = { size: "small" }
        // Act
        const loader = createComponent(props)
        // Assert
        expect(loader.find(`.${prefix("loader")}`).length).toBe(1)
        expect(loader.find(`.${prefix("loader--small")}`).length).toBe(1)
    })

    it("should be rendered as inverted loader", () => {
        // Arrange
        const props: LoaderProps = { inverted: true }
        // Act
        const loader = createComponent(props)
        // Assert
        expect(loader.find(`.${prefix("loader")}`).length).toBe(1)
        expect(loader.find(`.${prefix("loader--theme-inverted")}`).length).toBe(1)
    })
})
