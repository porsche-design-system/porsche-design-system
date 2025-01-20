import { PDisplay, PLinkTile, PText } from '@porsche-design-system/components-react/ssr';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <PDisplay className="mt-lg max-w-lg" size="medium">
        Welcome to the new digital
      </PDisplay>
      <PText className="mt-md max-w-prose" color="contrast-high" size="large">
        Become today a part of tomorrow’s Porsche new design language with the new Porsche Design System v3.
      </PText>

      <article className="mt-lg max-w-prose">
        <PText size="large">
          The Porsche Design System provides the design fundamentals and elements for efficiently creating aesthetic and
          high-quality web applications, including easy-to-use Figma and UX Pin libraries, coded Web Components and
          comprehensive usage guidelines. Everything is built and tested following the Porsche quality standards and
          corporate design principles.
        </PText>
        <PText className="mt-md" color="contrast-high">
          We provide protected
          <a href="https://figma.com/file/EkdP468u4ZVuIRwalKCscb/Design-System-v3?type=design&node-id=105-146">Figma</a>
          and UX Pin libraries, as well as public accessible
          <a href="https://npmjs.com/org/porsche-design-system">npm releases</a> for Vanilla JS,
          <a href="https://angular.io">Angular</a>, <a href="https://react.dev">React</a>,
          <a href="https://nextjs.org">Next.js</a>, <a href="https://remix.run">Remix</a> and
          <a href="https://vuejs.org">Vue</a> based on Web Components with TypeScript and SSR support and appreciate any
          feedback, feature requests or suggestions on our public accessible
          <a href="https://github.com/porsche-design-system/porsche-design-system/issues">issue board</a>.
        </PText>
      </article>

      <div className="mt-lg grid gap-md sm:grid-cols-2">
        <PLinkTile
          href="designing/introduction"
          aspectRatio={{ base: '4:3', xs: '16:9', s: '3:4' }}
          description="Start Designing"
          label="Start Designing"
          weight="regular"
          compact={true}
        >
          <Image src="assets/start-designing.jpg" width={1052} height={1398} alt="Some wireframes" />
        </PLinkTile>
        <PLinkTile
          href="developing/introduction"
          aspectRatio={{ base: '4:3', xs: '16:9', s: '3:4' }}
          description="Start Developing"
          label="Start Developing"
          weight="regular"
          compact={true}
        >
          <Image
            src="assets/start-developing.jpg"
            width={1052}
            height={1398}
            alt="Some woman developing with Porsche Design System version 3."
          />
        </PLinkTile>
        <PLinkTile
          className="sm:col-span-2"
          href="news/migration-guide/porsche-design-system"
          aspectRatio={{ base: '4:3', xs: '16:9' }}
          description="Migrate from v2 to v3"
          label="Migrate from v2 to v3"
          weight="regular"
          compact={true}
        >
          <picture>
            {/* <source
              v-if="storefrontTheme === 'auto'"
              srcSet="/assets/migrate-v2-to-v3-light.jpg"
              media="(prefers-color-scheme: light)"
            />
            <source
              v-if="storefrontTheme === 'auto'"
              srcSet="/assets/migrate-v2-to-v3-dark.jpg"
              media="(prefers-color-scheme: dark)"
            />
            <img
              v-if="storefrontTheme === 'dark'"
              src="/assets/migrate-v2-to-v3-dark.jpg"
              alt="Sample Porsche web application with Porsche Design System version 3."
            />
            <img
              v-else={true}
              src="/assets/migrate-v2-to-v3-light.jpg"
              alt="Sample Porsche web application with Porsche Design System version 3."
            /> */}
            <Image
              src="assets/migrate-v2-to-v3-light.jpg"
              width={2168}
              height={1222}
              alt="Sample Porsche web application with Porsche Design System version 3."
            />
          </picture>
        </PLinkTile>
      </div>
    </>
  );
}
