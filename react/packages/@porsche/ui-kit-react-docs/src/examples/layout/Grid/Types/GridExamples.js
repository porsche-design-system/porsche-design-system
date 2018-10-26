import React from "react"
import { Grid } from "@porsche/ui-kit-react"

const itemStyle = (color) => {
    return { minHeight: "12px", backgroundColor: color, marginTop: "12px" }
}

const GridExamples = () => {
    return (
        <React.Fragment>
            <h2 className="-pui-text-size-copy">Nested</h2>
            <Grid>
                <Grid.Child size={6}>
                    <div style={itemStyle("Aqua")}>
                        <Grid>
                            <Grid.Child size={6}>
                                <div style={itemStyle("Teal")} />
                            </Grid.Child>
                            <Grid.Child size={6}>
                                <div style={itemStyle("Teal")} />
                            </Grid.Child>
                        </Grid>
                    </div>
                </Grid.Child>
                <Grid.Child size={6}>
                    <div style={itemStyle("Aqua")}>
                        <Grid>
                            <Grid.Child size={4}>
                                <div style={itemStyle("Teal")} />
                            </Grid.Child>
                            <Grid.Child size={8}>
                                <div style={itemStyle("Teal")} />
                            </Grid.Child>
                        </Grid>
                    </div>
                </Grid.Child>
            </Grid>

            <h2 className="-pui-text-size-copy">Breakpoint</h2>
            <Grid gap={{ base: "normal", s: "zero", m: "normal" }}>
                <Grid.Child className="pui-flex" size={{ base: 12, m: 4, l: 3 }} offset={{ base: 0, m: 2, l: 0 }}>
                    <div className="pui-flex__child flex__child--auto">
                        <h3 className="-text-size-4-thin -text-color-white">Column 1</h3>
                        <p className="-text-size-copy -text-color-white">
                            xxs -- size: 12 <br />s -- gap: zero
                            <br />m -- gap: normal, size: 4, offset: 2<br />l -- size: 3, offset: 0
                        </p>
                    </div>
                </Grid.Child>
            </Grid>
        </React.Fragment>
    )
}

export default GridExamples
