import React from "react"
import { Link } from "react-router-dom"
import styles from "./home.module.scss"
import Teaser from "./assets/img/teaser.jpg"
import { Button } from "@porsche/ui-kit-react"
import { Flex, Spacing, Text } from "@porscheui/porsche-ui-kit"
import { Markdown } from "../../../components/markdown/Markdown"
import Releases from "../../../releases.json"

export const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <header className={styles.teaser}>
        <div className={styles["img-wrap"]}>
          <img src={Teaser} alt="Porsche UI Kit - teaser" className={styles.img} />
        </div>
        <div className={styles.text}>
          <Text className={styles.headline} as="h1" type="1-bold" align="center">
            Welcome to the
            <span className={styles["headline-large"]}>Porsche UI Kit</span>
          </Text>
          <Text className={styles.subline} as="p" align="center">
            A Porsche initiative to empower teams and partners to create great digital Porsche experiences, that feel
            like being designed by one. <br />
            United around a global design community with shared tools, methods and components.
          </Text>
          <Spacing marginTop={30}>
            <Flex justifyContent="center" gap={30}>
              <Flex.Item>
                <Button type="highlight" as={Link} {...{ to: "/design/introduction" }}>
                  Start Designing
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button type="highlight" as={Link} {...{ to: "/code/introduction" }}>
                  Start Coding
                </Button>
              </Flex.Item>
            </Flex>
          </Spacing>
        </div>
      </header>

      <Spacing className={styles["mail-teaser"]} marginTop={60} wrap>
        <Flex gap={24}>
          <Flex.Item>
            <Text as="h3" type="3-bold">
              Always stay informed
            </Text>
            <Text>Join our mailing list and get informed about Porsche UI.</Text>
          </Flex.Item>
          <Flex.Item>
            <Button as="a" {...{ href: "http://eepurl.com/ghVSjH", target: "_blank" }}>
              Subscribe to mailing list
            </Button>
          </Flex.Item>
        </Flex>
      </Spacing>

      <section className={styles.content}>
        <Markdown path={require("./home.md")} />
      </section>
      <Spacing marginTop={30}>
        <Text as="h3" type="3-bold">
          Release History
        </Text>
        <Flex>
          <Flex.Item flex="equal">
            <Text as="h4" type="copy-bold">
              Version v1
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
              Version v0 Core (deprecated)
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
              Version v0 React (deprecated)
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
