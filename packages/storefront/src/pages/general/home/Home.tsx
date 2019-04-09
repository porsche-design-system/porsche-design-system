import React from "react"
import {Link} from "react-router-dom"
import styles from "./home.module.scss"
import {Button} from "@porsche/ui-kit-react"
import {Flex, Spacing, Text} from "@porscheui/porsche-ui-kit"

export const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>

      <header className={styles.teaser}>
        <div className={styles.cover}>
          <video src={require("./assets/porsche-ui-kit.mp4")} autoPlay muted/>
        </div>
      </header>

      <Spacing marginTop={64}>
        <Flex gap={32}>
          <Flex.Item width="one-third">
            <Text as="h1" type="2-bold">Porsche UI Kit</Text>
            <Text as="h2" type="4-regular">Design System</Text>
          </Flex.Item>
          <Flex.Item width="two-thirds">
            <Text type="2-regular">The Porsche UI Kit provides the fundamental elements to build aesthetic, quialitative
              and intuitive designs. Ready to use as designed Sketch Libraries, coded React Components or simple CSS
              with compiled HTML. Everything built and tested following the Porsche Quality Standards and Corporate
              Design.</Text>
            <Spacing marginTop={32}>
              <Flex gap={12}>
                <Flex.Item>
                  <Button type="highlight" as={Link} {...{to: "/design/introduction"}}>Start Designing</Button>
                </Flex.Item>
                <Flex.Item>
                  <Button type="highlight" as={Link} {...{to: "/code/introduction"}}>Start Coding</Button>
                </Flex.Item>
              </Flex>
            </Spacing>
          </Flex.Item>
        </Flex>
      </Spacing>

      <Spacing marginTop={80}>
        <article className={styles.newsletter}>
          <Flex gap={32}>
            <Flex.Item width="one-third">
              <Text as="h1" type="2-bold">Always stay informed</Text>
            </Flex.Item>
            <Flex.Item width="two-thirds">
              <Text type="2-regular">Join our mailing list and get informed about Porsche UI.</Text>
              <Spacing marginTop={8}>
                <Text>
                  <a href="http://eepurl.com/ghVSjH" target="_blank">Subscribe to mailing list</a>
                </Text>
              </Spacing>
            </Flex.Item>
          </Flex>
        </article>
      </Spacing>

    </React.Fragment>
  )
}
