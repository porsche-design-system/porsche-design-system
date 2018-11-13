import React from "react"
import { Text, Grid, Spacing } from "@porsche/ui-kit-react"

const itemStyle = (color, padding) => {
    return {
        minHeight: "12px",
        backgroundColor: color,
        marginTop: "12px",
        padding
    }
}

const GridExamples = () => {
    return (
        <React.Fragment>
            <h2 className="-pui-text-size-copy">Nested</h2>
            <Grid>
                <Grid.Child size={6}>
                    <div style={itemStyle("lightskyblue")}>
                        <Grid>
                            <Grid.Child size={6}>
                                <div style={itemStyle("DeepSkyBlue")} />
                            </Grid.Child>
                            <Grid.Child size={6}>
                                <div style={itemStyle("DeepSkyBlue")} />
                            </Grid.Child>
                        </Grid>
                    </div>
                </Grid.Child>
                <Grid.Child size={6}>
                    <div style={itemStyle("lightskyblue")}>
                        <Grid>
                            <Grid.Child size={4}>
                                <div style={itemStyle("DeepSkyBlue")} />
                            </Grid.Child>
                            <Grid.Child size={8}>
                                <div style={itemStyle("DeepSkyBlue")} />
                            </Grid.Child>
                        </Grid>
                    </div>
                </Grid.Child>
            </Grid>
            <Spacing marginTop={24}>
                <h2 className="-pui-text-size-copy">Breakpoint specific</h2>
                <Grid gap={{ base: "normal", s: "zero", m: "normal" }}>
                    <Grid.Child className="pui-flex" size={{ base: 12, m: 4, l: 3 }} offset={{ base: 0, m: 2, l: 0 }}>
                        <div className="pui-flex__child pui-flex__child--auto" style={itemStyle("DeepSkyBlue", "12px")}>
                            <Text type="4-thin" color="white">
                                Column 1
                            </Text>
                            <Text color="white">
                                xxs -- size: 12 <br />s -- gap: zero <br />m -- gap: normal, size: 4, offset: 2<br />l
                                -- size: 3, offset: 0
                            </Text>
                        </div>
                    </Grid.Child>
                    <Grid.Child
                        className="pui-flex"
                        size={{
                            base: 12,
                            s: 6,
                            m: 4,
                            l: 3
                        }}
                        offset={{ base: 0, s: 3, m: 0 }}
                    >
                        <div className="pui-flex__child pui-flex__child--auto" style={itemStyle("DeepSkyBlue", "12px")}>
                            <Text type="4-thin" color="white">
                                Column 2
                            </Text>
                            <Text color="white">
                                xxs -- size: 12 <br />s -- gap: zero, size: 6, offset: 3<br />m -- gap: normal, size: 4,
                                offset: 0<br />l -- size: 3
                            </Text>
                        </div>
                    </Grid.Child>
                    <Grid.Child
                        className="pui-flex"
                        size={{
                            base: 12,
                            s: 6,
                            l: 3
                        }}
                    >
                        <div className="pui-flex__child pui-flex__child--auto" style={itemStyle("DeepSkyBlue", "12px")}>
                            <Text type="4-thin" color="white">
                                Column 3
                            </Text>
                            <Text color="white">
                                xxs -- size: 12 <br />s -- gap: zero, size: 6<br />m -- gap: normal
                                <br />l -- size: 3
                            </Text>
                        </div>
                    </Grid.Child>
                    <Grid.Child
                        className="pui-flex"
                        size={{
                            base: 12,
                            s: 6,
                            l: 3
                        }}
                    >
                        <div className="pui-flex__child pui-flex__child--auto" style={itemStyle("DeepSkyBlue", "12px")}>
                            <Text type="4-thin" color="white">
                                Column 4
                            </Text>
                            <Text color="white">
                                xxs -- size: 12 <br />s -- gap: zero, size: 6<br />m -- gap: normal
                                <br />l -- size: 3
                            </Text>
                        </div>
                    </Grid.Child>
                </Grid>
            </Spacing>
        </React.Fragment>
    )
}

export default GridExamples
