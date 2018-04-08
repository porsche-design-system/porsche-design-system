import * as React from "react"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META } from "../../../lib"

import { PageWrapper, AreaWrapper, ThemeWrapper, ContentWrapper, Flex } from "../../../index"

const _meta: ComponentMeta = {
  name: "ContentStructureScreen",
  type: META.TYPES.SCREEN
}

/**
 * This is an example only screen and shows basic structuring of pages/views.
 */
const _ContentStructureScreen: React.StatelessComponent<{}> & Partial<MetaCategorizable> = (props) => {

  return (
    <PageWrapper customAttributes={{ style: {padding: "20px", backgroundColor: "#aaa"} }}>
        #PageWrapper
        <AreaWrapper as="header" customAttributes={{ style: {padding: "20px", marginTop: "20px", backgroundColor: "#bbb"} }}>
            #AreaWrapper (header)
            <ThemeWrapper customAttributes={{ style: {padding: "20px", marginTop: "20px"} }}>
                #ThemeWrapper
                <ContentWrapper
                    as="div"
                    customAttributes={{ style: {marginTop: "20px", backgroundColor: "#f7e2d5"} }}
                >
                    <span
                        style={{
                            display: "block",
                            backgroundColor: "#eee"
                        }}
                    >
                        #ContentWrapper (max-width: 1600px)
                    </span>
                    <div style={{padding: "20px 0", backgroundColor: "#eee"}}>
                        #header organism
                        <Flex wrap gap={"grid"}>
                            <Flex.Item width={{ base: 12, l: 8 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                            <Flex.Item width={{ base: 12, l: 4 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                        </Flex>
                    </div>
                </ContentWrapper>
            </ThemeWrapper>
        </AreaWrapper>
        <AreaWrapper as="main" customAttributes={{ style: {padding: "20px", backgroundColor: "#bbb"} }}>
            #AreaWrapper (main)
            <ThemeWrapper customAttributes={{ style: {padding: "20px", marginTop: "20px"} }}>
                #ThemeWrapper
                <ContentWrapper
                    as="div"
                    customAttributes={{ style: {marginTop: "20px", backgroundColor: "#f7e2d5"} }}
                >
                    <span
                        style={{
                            display: "block",
                            backgroundColor: "#eee"
                        }}
                    >
                        #ContentWrapper (max-width: 1600px)
                    </span>
                    <div style={{padding: "20px 0", backgroundColor: "#eee"}}>
                        #content organism (section 1)
                        <Flex wrap gap={"grid"}>
                            <Flex.Item width={{ base: 12, l: 4 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                            <Flex.Item width={{ base: 12, l: 8 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                        </Flex>
                    </div>
                </ContentWrapper>
            </ThemeWrapper>
            <ThemeWrapper theme="dark" customAttributes={{ style: {padding: "20px"} }}>
            #ThemeWrapper
                <ContentWrapper
                    as="div"
                    customAttributes={{ style: {marginTop: "20px", backgroundColor: "#f7e2d5"} }}
                >
                    <span
                        style={{
                            display: "block",
                            backgroundColor: "#eee"
                        }}
                    >
                        #ContentWrapper (max-width: 1600px)
                    </span>
                    <div style={{ padding: "20px 0", backgroundColor: "#eee" }}>
                        #content organism (section 2)
                        <Flex wrap gap={"grid"}>
                            <Flex.Item width={{ base: 12, l: 8 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                            <Flex.Item width={{ base: 12, l: 4 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                        </Flex>
                    </div>
                </ContentWrapper>
            </ThemeWrapper>
            <ThemeWrapper customAttributes={{ style: {padding: "20px"} }}>
                #ThemeWrapper
                <ContentWrapper
                    as="div"
                    customAttributes={{ style: {marginTop: "20px", backgroundColor: "#f7e2d5"} }}
                >
                    <span
                        style={{
                            display: "block",
                            backgroundColor: "#eee"
                        }}
                    >
                        #ContentWrapper (max-width: 1600px)
                    </span>
                    <div style={{ padding: "20px 0", backgroundColor: "#eee" }}>
                        #content organism (section 3)
                        <Flex wrap gap={"grid"}>
                            <Flex.Item width={{ base: 12, l: 4 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                            <Flex.Item width={{ base: 12, l: 8 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                        </Flex>
                    </div>
                </ContentWrapper>
            </ThemeWrapper>
        </AreaWrapper>
        <AreaWrapper as="footer" customAttributes={{ style: {padding: "20px", backgroundColor: "#bbb"} }}>
            #AreaWrapper (footer)
            <ThemeWrapper theme="dark" customAttributes={{ style: {padding: "20px", marginTop: "20px"} }}>
                #ThemeWrapper
                <ContentWrapper
                    as="div"
                    customAttributes={{ style: {marginTop: "20px", backgroundColor: "#f7e2d5"} }}
                >
                    <span
                        style={{
                            display: "block",
                            backgroundColor: "#eee"
                      }}
                    >
                        #ContentWrapper (max-width: 1600px)
                    </span>
                    <div style={{ padding: "20px 0", backgroundColor: "#eee" }}>
                        #footer organism
                        <Flex wrap gap={"grid"}>
                            <Flex.Item width={{ base: 12, l: 6 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                            <Flex.Item width={{ base: 12, l: 6 }}>
                                <div style={{ padding: "20px", backgroundColor: "#196a99" }}/>
                            </Flex.Item>
                        </Flex>
                    </div>
                </ContentWrapper>
            </ThemeWrapper>
        </AreaWrapper>
    </PageWrapper>
  )
}

_ContentStructureScreen._meta = _meta

export const ContentStructureScreen = _ContentStructureScreen as React.StatelessComponent<{}>
