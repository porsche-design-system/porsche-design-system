<template>
  <div>

    <header>
      <div>
        <video
          src="../assets/porsche-ui-kit.mp4"
          poster="../assets/porsche-ui-kit.jpg"
          autoPlay muted playsInline></video>
      </div>
    </header>

    <article>
      <p-grid>
        <p-grid-child size='{"base": 12, "m": 4}'>
          <p-headline type="headline-3" level="1">Porsche UI Kit</p-headline>
          <p-text>Design System</p-text>
          <p-text>
            <router-link to="/getting-started/about">Learn more about it</router-link>
          </p-text>
        </p-grid-child>
        <p-grid-child size='{"base": 12, "m": 8}'>
          <p-text type="24">
            The Porsche UI Kit provides the design fundamentals for easily creating aesthetic and qualitative
            digital products. Ready to use as reusable Sketch libraries, coded React components or HTML and CSS
            elements. Everything built and tested following the Porsche quality standards and corporate design
            principles.
          </p-text>
          <p-text>
            While Porsche UI Kit v1 is coming soon as npm package with code examples and design documentation have
            a look at v0 documentation of <a href="https://ui.porsche.com/v0/core/">Porsche UI Kit – Core v0</a>
            and <a href="https://ui.porsche.com/v0/react/">Porsche UI Kit – React v0</a> in the meantime.
          </p-text>
          <p-flex gap="16" wrap="wrap">
            <p-flex-item>
              <p-button-regular variant="highlight" href="/#/getting-started/start-designing">Start designing</p-button-regular>
            </p-flex-item>
            <p-flex-item>
              <p-button-regular variant="highlight" href="/#/getting-started/start-coding">Start coding</p-button-regular>
            </p-flex-item>
          </p-flex>
        </p-grid-child>
      </p-grid>
    </article>

    <article>
      <p-grid>
        <p-grid-child size='{"base": 12, "m": 3}'>
          <p-headline type="headline-3" level="2">Always stay informed</p-headline>
        </p-grid-child>
        <p-grid-child size='{"base": 12, "m": 8}' offset='{"base": 0, "m": 1}'>
          <p-text type="24">Join our mailing list and get informed about relevant updates and topics.</p-text>
          <p-text>
            <a href="http://eepurl.com/ghVSjH" target="_blank" rel="noopener noreferrer">Subscribe to mailing list</a>
          </p-text>
        </p-grid-child>
      </p-grid>
    </article>

  </div>
</template>

<style scoped lang="scss">
  video {
    width: 100%;
  }
</style>
