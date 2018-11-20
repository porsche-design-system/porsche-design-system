import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Flex, FlexProps } from "./Flex"
import { prefix } from "../../../lib"

describe("Flex component", () => {
    const createComponent = (props?: FlexProps): ReactWrapper => {
        return mount(<Flex {...props} />)
    }

    describe("Flex inline", () => {
        it("should have a flex-inline modifier", () => {
            // Arrange
            const props: FlexProps = {
                inline: true
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--inline")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex wrap", () => {
        it("should have a wrap modifier", () => {
            // Arrange
            const props: FlexProps = {
                wrap: true
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--wrap")}`)
            expect(result.length).toBe(1)
        })

        it("should have a wrap-no modifier", () => {
            // Arrange
            const props: FlexProps = {
                wrap: false
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--wrap-no")}`)
            expect(result.length).toBe(1)
        })

        it("should have a reverse modifier", () => {
            // Arrange
            const props: FlexProps = {
                wrap: "reverse"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--wrap-reverse")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex direction", () => {
        it("should have a direction-column modifier", () => {
            // Arrange
            const props: FlexProps = {
                direction: "column"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--direction-column")}`)
            expect(result.length).toBe(1)
        })

        it("should have a direction-column-reverse modifier", () => {
            // Arrange
            const props: FlexProps = {
                direction: "column-reverse"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--direction-column-reverse")}`)
            expect(result.length).toBe(1)
        })

        it("should have a direction modifier of row", () => {
            // Arrange
            const props: FlexProps = {
                direction: "row"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--direction-row")}`)
            expect(result.length).toBe(1)
        })

        it("should have a direction-row-reverse modifier", () => {
            // Arrange
            const props: FlexProps = {
                direction: "row-reverse"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--direction-row-reverse")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex align main-axis", () => {
        it("should have a start modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignMainAxis: "start"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--main-axis-start")}`)
            expect(result.length).toBe(1)
        })

        it("should have a center modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignMainAxis: "center"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--main-axis-center")}`)
            expect(result.length).toBe(1)
        })

        it("should have a end modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignMainAxis: "end"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--main-axis-end")}`)
            expect(result.length).toBe(1)
        })

        it("should have a space-around modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignMainAxis: "space-around"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--main-axis-space-around")}`)
            expect(result.length).toBe(1)
        })

        it("should have a space-between modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignMainAxis: "space-between"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--main-axis-space-between")}`)
            expect(result.length).toBe(1)
        })

        it("should have a space-evenly modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignMainAxis: "space-evenly"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--main-axis-space-evenly")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex align cross-axis", () => {
        it("should have a start modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignCrossAxis: "start"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--cross-axis-start")}`)
            expect(result.length).toBe(1)
        })

        it("should have a center modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignCrossAxis: "center"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--cross-axis-center")}`)
            expect(result.length).toBe(1)
        })

        it("should have a end modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignCrossAxis: "end"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--cross-axis-end")}`)
            expect(result.length).toBe(1)
        })

        it("should have a baseline modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignCrossAxis: "baseline"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--cross-axis-baseline")}`)
            expect(result.length).toBe(1)
        })

        it("should have a stretch modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignCrossAxis: "stretch"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--cross-axis-stretch")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex align content", () => {
        it("should have a start modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignContent: "start"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--align-content-start")}`)
            expect(result.length).toBe(1)
        })

        it("should have a center modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignContent: "center"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--align-content-center")}`)
            expect(result.length).toBe(1)
        })

        it("should have a end modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignContent: "end"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--align-content-end")}`)
            expect(result.length).toBe(1)
        })

        it("should have a space-around modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignContent: "space-around"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--align-content-space-around")}`)
            expect(result.length).toBe(1)
        })

        it("should have a space-between modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignContent: "space-between"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--align-content-space-between")}`)
            expect(result.length).toBe(1)
        })

        it("should have a stretch modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignContent: "stretch"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--align-content-stretch")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex gap", () => {
        it("should have a gap modifier of 3", () => {
            // Arrange
            const props: FlexProps = {
                gap: 3
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--3")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 6", () => {
            // Arrange
            const props: FlexProps = {
                gap: 6
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--6")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 12", () => {
            // Arrange
            const props: FlexProps = {
                gap: 12
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--12")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 18", () => {
            // Arrange
            const props: FlexProps = {
                gap: 18
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--18")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 24", () => {
            // Arrange
            const props: FlexProps = {
                gap: 24
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--24")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 30", () => {
            // Arrange
            const props: FlexProps = {
                gap: 30
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--30")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 36", () => {
            // Arrange
            const props: FlexProps = {
                gap: 36
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--36")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 42", () => {
            // Arrange
            const props: FlexProps = {
                gap: 42
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--42")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 48", () => {
            // Arrange
            const props: FlexProps = {
                gap: 48
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--48")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 54", () => {
            // Arrange
            const props: FlexProps = {
                gap: 54
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--54")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of 60", () => {
            // Arrange
            const props: FlexProps = {
                gap: 60
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--60")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of a", () => {
            // Arrange
            const props: FlexProps = {
                gap: "a"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--a")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of b", () => {
            // Arrange
            const props: FlexProps = {
                gap: "b"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--b")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of c", () => {
            // Arrange
            const props: FlexProps = {
                gap: "c"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--c")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of d", () => {
            // Arrange
            const props: FlexProps = {
                gap: "d"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--d")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of e", () => {
            // Arrange
            const props: FlexProps = {
                gap: "e"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--e")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of f", () => {
            // Arrange
            const props: FlexProps = {
                gap: "f"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--f")}`)
            expect(result.length).toBe(1)
        })
    })
})
