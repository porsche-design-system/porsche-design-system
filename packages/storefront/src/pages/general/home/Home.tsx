import React from "react"
import { Link } from "react-router-dom"
import { prefix } from "../../../prefix"
import "./home.scss"
import Teaser from "./assets/img/teaser.jpg"
import { Button } from "@porsche/ui-kit-react"
import { Flex, Spacing, Text } from "@porscheui/porsche-ui-kit"
import { Markdown } from "../../../components/markdown/Markdown"
import Releases from "./releases.json"

export const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <header className={prefix("home-teaser")}>
        <img src={Teaser} alt="Porsche UI Kit - teaser" className={prefix("teaser-img")} />
        <div className={prefix("teaser-text")}>
          <Text className={prefix("teaser-headline")} as="h1" type="1-bold" align="center">
            Porsche UI Kit
          </Text>
          <Text className={prefix("teaser-subline")} as="p" align="center">
            The Porsche UI Kit enables you to build one-of-a-kind digital Porsche web experiences by providing high
            quality and CI-approved UI components and corresponding guidelines for usage and implementation.
          </Text>
        </div>
      </header>
      <section className={prefix("home-content")}>
        <Markdown path={require("./home.md")} />
      </section>
      <Spacing marginTop={30}>
        <Text as="h3" type="3-bold">
          Release History
        </Text>
        <Flex>
          <Flex.Item flex="equal">
            <Text as="h4" type="copy-bold">
              Version 1.x
            </Text>
            {Releases &&
              Releases.releases.v1.map((item) => {
                return (
                  <li key={item.version}>
                    <a href={item.link}>{item.version}</a>
                  </li>
                )
              })}
          </Flex.Item>
          <Flex.Item flex="equal">
            <Text as="h4" type="copy-bold">
              Version 0.x Core (deprecated)
            </Text>
            {Releases &&
              Releases.releases.v0Core.map((item) => {
                return (
                  <li key={item.version}>
                    <a href={item.link}>{item.version}</a>
                  </li>
                )
              })}
          </Flex.Item>
          <Flex.Item flex="equal">
            <Text as="h4" type="copy-bold">
              Version 0.x React (deprecated)
            </Text>
            {Releases &&
              Releases.releases.v0React.map((item) => {
                return (
                  <li key={item.version}>
                    <a href={item.link}>{item.version}</a>
                  </li>
                )
              })}
          </Flex.Item>
        </Flex>
      </Spacing>
      <Spacing marginTop={30}>
        <Text as="h3" type="3-bold">
          Join our mailing list
        </Text>
        <Text>Always stay informed about Porsche UI and get access by subscribing to our newsletter.</Text>
        <Flex>
          <Flex.Item flex="equal">
            <Button as="a" {...{ href: "http://eepurl.com/ghVSjH", target: "_blank" }}>
              Join our mailing list
            </Button>
          </Flex.Item>
        </Flex>
      </Spacing>
    </React.Fragment>
  )
}
