import React from "react"
import { prefix } from "../../../prefix"
import "./home.scss"
import Teaser from "./assets/img/teaser.jpg"
import { Button } from "@porsche/ui-kit-react"
import { Flex, Spacing, Text } from "@porscheui/porsche-ui-kit"

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
        <Text as="h2" type="2-bold">
          Dear friends of great design!
        </Text>
        <Spacing marginTop={30}>
          <Text>
            Welcome to the Porsche UI Kit - the Porsche initiative to unite every digital Porsche product around a
            common Porsche Design System and Language. We want to support everyone who is working on digital products
            for Porsche by a qualitative and brand-aligned collection of design elements with complemented guidance.
          </Text>
        </Spacing>
        <Spacing marginTop={30}>
          <Text>
            The Porsche UI Kit contains all the fundamental styles and pattern-based components to build aesthetic and
            intuitive designs for Porsche products. Both for designers providing Sketch Libraries and for Developers
            with reusable React Components or plain HTML and SCSS partials. All created and tested with Porsche quality
            standards, following a unified design language and the global Porsche Corporate Design principles.
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
        <ul>
          <li>Use the contents as ingredients for building creative designs - upon and combining them</li>
          <li>Strive for a deep alignment between design and code through a close collaboration and communication</li>
          <li>See continuous updating as operation task and avoid growing debts</li>
          <li>Join our communication channels and community rituals to receive and share information</li>
          <li>Participate in the evolvement with your contribution and feedback</li>
        </ul>
      </section>
      <Spacing marginTop={30}>
        <Flex>
          <Flex.Item flex="equal">
            <Button>Newsletteranmeldung</Button>
          </Flex.Item>
          <Flex.Item flex="equal">adfadf</Flex.Item>
        </Flex>
      </Spacing>
    </React.Fragment>
  )
}
