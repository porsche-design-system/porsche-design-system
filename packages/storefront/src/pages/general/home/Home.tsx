import React from "react"
import { Link } from "react-router-dom"
import styles from "./home.module.scss"
import { Button } from "@porsche/ui-kit-react"
import { Flex, Spacing, Text, Grid } from "@porscheui/porsche-ui-kit"

export const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <header className={styles.teaser}>
        <div className={styles.cover}>
          <video
            src={require("./assets/porsche-ui-kit.mp4")}
            poster={require("./assets/porsche-ui-kit.jpg")}
            autoPlay
            muted
            playsInline
          />
        </div>
      </header>

      <article className={styles.intro}>
        <Grid>
          <Grid.Child size={{ base: 12, m: 4 }}>
            <Text as="h1" type="2-bold">
              Porsche UI Kit
            </Text>
            <Text as="h2" type="4-regular">
              Design System
            </Text>
            <Spacing marginTop={8}>
              <Text>
                <Link to="/getting-started/about">Learn more about it</Link>
              </Text>
            </Spacing>
          </Grid.Child>
          <Spacing marginTop={24} className="p-spacing-mt--0-m">
            <Grid.Child size={{ base: 12, m: 8 }}>
              <Text type="3-regular">
                The Porsche UI Kit provides the design fundamentals for easily creating aesthetic and qualitative
                products. Ready to use as reusable Sketch libraries, coded React components or HTML and CSS elements.
                Everything built and tested following the Porsche quality standards and corporate design principles.
              </Text>
              <Spacing marginTop={8}>
                <Text>
                  While Porsche UI Kit v1 is coming soon as npm package with code examples and design documentation have
                  a look at v0 documentation of <a href={"https://ui.porsche.com/v0/core/"}>Porsche UI Kit – Core v0</a>{" "}
                  and <a href={"https://ui.porsche.com/v0/react/"}>Porsche UI Kit – React v0</a> in the meantime.
                </Text>
              </Spacing>
              <Spacing marginTop={16}>
                <Flex gap={16} wrap={true}>
                  <Flex.Item>
                    <Spacing marginTop={16}>
                      <Button type="highlight" as={Link} {...{ to: "/getting-started/start-designing" }}>
                        Start designing
                      </Button>
                    </Spacing>
                  </Flex.Item>
                  <Flex.Item>
                    <Spacing marginTop={16}>
                      <Button type="highlight" as={Link} {...{ to: "/getting-started/start-coding" }}>
                        Start coding
                      </Button>
                    </Spacing>
                  </Flex.Item>
                </Flex>
              </Spacing>
            </Grid.Child>
          </Spacing>
        </Grid>
      </article>

      <article className={styles.newsletter}>
        <Grid>
          <Grid.Child size={{ base: 12, m: 3 }}>
            <Text as="h2" type="2-bold">
              Always stay informed
            </Text>
          </Grid.Child>
          <Grid.Child size={{ base: 12, m: 8 }} offset={{ base: 0, m: 1 }} className="p-mt--24 p-mt--0-m">
            <Text type="3-regular">Join our mailing list and get informed about relevant updates and topics.</Text>
            <Spacing marginTop={8}>
              <Text>
                <a href="http://eepurl.com/ghVSjH" target="_blank">
                  Subscribe to mailing list
                </a>
              </Text>
            </Spacing>
          </Grid.Child>
        </Grid>
      </article>
    </React.Fragment>
  )
}
