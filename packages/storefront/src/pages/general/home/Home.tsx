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
          Welcome to the Porsche UI Kit
          </Text>
          <Text className={prefix("teaser-subline")} as="p" align="center">
          A Porsche initiative to empower teams and partners to create great digital Porsche experiences, that feel like beeing designed by one.
          United around a global design community with shared tools, methods and components.
          </Text>
          <Flex>
          <Flex.Item flex="equal">
            <Button as="a" {...{ href: "http://eepurl.com/ghVSjH", target: "_blank" }}>
              Start Designing
            </Button>
          </Flex.Item>
          <Flex.Item flex="equal">
            <Button as="a" {...{ href: "http://eepurl.com/ghVSjH", target: "_blank" }}>
              Start Coding
            </Button>
          </Flex.Item>
        </Flex>
        </div>
      </header>

      <Spacing marginTop={30}>
        <Text as="h3" type="3-bold">
        Always stay informed 
        </Text>
        <Text>Join our mailing list and get informed about Porsche UI.</Text>
        <Flex>
          <Flex.Item flex="equal">
            <Button as="a" {...{ href: "http://eepurl.com/ghVSjH", target: "_blank" }}>
              Subscribe to mailing list
            </Button>
          </Flex.Item>
        </Flex>
      </Spacing>

      <section className={prefix("home-content")}>
        <Markdown path={require("./home.md")} />



        <Spacing marginTop={30}>
          <Text as="h3" type="3-bold">
            Our Principles for success
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text>
            We foster trust and responsibility rather than policing; Sticking to a continuous evolvement strategy with
            open collaboration and contribution.
          </Text>
        </Spacing>
        <Spacing marginTop={18}>
          <ul>
            <li>Use the contents as ingredients for building creative designs - upon and combining them</li>
            <li>Strive for a deep alignment between design and code through a close collaboration and communication</li>
            <li>See continuous updating as operation task and avoid growing debts</li>
            <li>Join our communication channels and community rituals to receive and share information</li>
            <li>Participate in the evolvement with your contribution and feedback</li>
          </ul>
        </Spacing>
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
    </React.Fragment>
  )
}
