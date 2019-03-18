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
        {/* <Text as="h2" type="2-bold">
          Dear friends of great design!
        </Text>
        <Spacing marginTop={30}>
          <Text>
            Welcome to Porsche UI - the Porsche initiative to unite digital design at Porsche around a common system
            with a shared language, tools and partials. We want to empower everyone who is working on digital products
            for Porsche by a qualitative and brand-aligned collection of design elements with complemented guidance and
            supporting working methods.
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text>
            The Porsche UI Kit contains all the fundamental styles and pattern-based components to build aesthetic,
            familiar and consistent designs for Porsche products. Ready to use both as Sketch Libraries and reusable
            React Components or compiled HTML and CSS. Everything centrally pre-built and tested with Porsche quality
            standards and following the global Porsche Corporate Design.
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text as="h3" type="3-bold">
            Benefits
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text type="copy-bold" as="h4">
            Ship faster and focus on value.
          </Text>
          <Text>
            Use the Porsche UI Kit stops wasting time on repetitive work and creation of what's already existing.
            Additionally the organization, documentation and methods around, enable faster releases and quick
            iterations. Design capacity can be focused on more value results and solving the hard design problems.
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text type="copy-bold" as="h4">
            Better user experience.
          </Text>
          <Text>
            Reuse the pre-built essential design elements increases a consistent look and feel across different
            products, platforms and disciplines. Repetitive design patterns within the products that match the marketing
            measures improves the familarity, brand awareness and the overall experience for the user.
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text type="copy-bold" as="h4">
            Quality for the long term.
          </Text>
          <Text>
            A designated built and managed design system with standardised components and unified toolings pays off in
            clean code and design results.
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text type="copy-bold" as="h4">
            Laverage knowledge and clarity.
          </Text>
          <Text>
            With all teams having access to the system and using the same language, it is much easier to collaborate and
            share knowledge with a clear understanding. Also the onboarding of new members is much easier and faster.
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text as="h3" type="3-bold">
            Our Principles
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
        </Spacing> */}
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
