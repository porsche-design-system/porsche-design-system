'use client';

import { PDisplay, PHeading, PLinkPure, PLinkTile, PText } from '@porsche-design-system/components-react/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import AppearAnimation from './appearAnimation';
import { useEffect, useState } from 'react';
import { fetchPdsVersions } from '@/utils/fetchPdsVersions';

export const Home = () => {
  const [latestPdsVersion, setLatestPdsVersion] = useState<string>();
  const { isDark } = useStorefrontTheme();

  useEffect(() => {
    async function load() {
      const list = await fetchPdsVersions();
      setLatestPdsVersion(list[0]);
    }

    load();
  }, []);
  return (
    <>
      <div
        className="col-span-full grid h-[90vh] grid-cols-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden "
        style={{ marginBlockStart: '-70px', marginInline: 'calc(clamp(16px, 12px + 1.25vw, 24px) * -1)' }}
      >
        <video
          key={isDark ? 'dark' : 'light'}
          className="row-start-1 col-start-1 w-full h-[90vh] object-cover"
          poster={isDark ? 'assets/hero-dark.jpg' : 'assets/hero-light.jpg'}
          slot="background"
          loop={true}
          muted={true}
          autoPlay={true}
          playsInline={true}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={isDark ? 'assets/hero-dark.mp4' : 'assets/hero-light.mp4'} type="video/mp4" />
          <source src={isDark ? 'assets/hero-dark.webm' : 'assets/hero-light.webm'} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <PDisplay
          className="z-20 mt-[100px] md:mt-fluid-lg mx-fluid-lg row-start-1 col-start-1 max-w-[768px]"
          size="medium"
          tag="h1"
        >
          Welcome to the Porsche Design System
        </PDisplay>
        {latestPdsVersion && (
        <div className="block w-full h-full relative">
          <div className="mb-[5%] ms-[5%] bg-frosted hover:bg-frosted-soft backdrop-blur-frosted transition-colors max-w-[512px] bottom-0 left-0 m-4 p-6 rounded-lg shadow-medium flex justify-between items-center gap-4">
            <Link href="/news/changelog/" className="absolute inset-0 rounded-l" tabIndex={-1} aria-hidden="true" />
            <div className="flex flex-col">
              <PText size="small" weight="semi-bold">
                Release Note
              </PText>
              <PText size="small" color="contrast-medium">
                Checkout the latest release {latestPdsVersion}
              </PText>
            </div>
            <PLinkPure hideLabel={true}>
              <Link
                href="/news/changelog/"
                aria-label={`Release Note: Checkout the latest release ${latestPdsVersion}`}
              />
            </PLinkPure>
          </div>
        </div>
          )}
      </div>

      <article className="mt-fluid-2xl col-span-full xs:col-start-4 xs:col-end-10" aria-label="Introduction">
        <PText size="large" align="center">
          This is your all-in-one toolkit for creating high-quality, visually stunning web applications. With intuitive
          Figma libraries, robust Web Components, and comprehensive guidelines, it’s built and tested to embody
          Porsche’s signature quality and design principles.
        </PText>
        <PText className="mt-fluid-md" color="contrast-high" align="center">
          We provide protected {''}
          <Link href="https://figma.com/file/EkdP468u4ZVuIRwalKCscb/Design-System-v3?type=design&node-id=105-146">
            Figma
          </Link>
          {''} library, as well as public accessible {''}
          <Link href="https://npmjs.com/org/porsche-design-system">npm releases</Link> for Vanilla JS, {''}
          <Link href="https://angular.io">Angular</Link>, <a href="https://react.dev">React</a>, {''}
          <Link href="https://nextjs.org">Next.js</Link>, <a href="https://remix.run">Remix</a> and {''}
          <Link href="https://vuejs.org">Vue</Link> based on Web Components with TypeScript and SSR support and
          appreciate any feedback, feature requests or suggestions on our public accessible {''}
          <Link href="https://github.com/porsche-design-system/porsche-design-system/issues">issue board</Link>.
        </PText>
      </article>

      <section
        className="mt-fluid-xl grid gap-fluid-md md:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12"
        aria-label="Getting started"
      >
        <AppearAnimation animation="fade-in-up">
          <div className="relative bg-surface rounded-lg overflow-hidden group flex items-center gap-4 p-4">
            <Link
              href="/designing/introduction/"
              className="absolute z-10 inset-0 rounded-l"
              tabIndex={-1}
              aria-hidden="true"
            />
            <div className="flex items-center w-full gap-3">
              <div className="relative z-0 w-16 h-16 shrink-0 overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 will-change-transform">
                  <Image
                    src="assets/design.png"
                    fill={true}
                    alt=""
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110 object-contain"
                  />
                </div>
              </div>

              <div className="grow">
                <PText size="medium">Start Designing</PText>
              </div>

              <div className="shrink-0">
                <PLinkPure hideLabel={true} className="relative z-10">
                  <Link href="/designing/introduction/" aria-label={'Start Designing'} />
                </PLinkPure>
              </div>
            </div>
          </div>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <div className="relative bg-surface rounded-lg overflow-hidden group flex items-center gap-4 p-4 group-hover:bg-hover">
            <Link
              href="/developing/introduction/"
              className="absolute z-10 inset-0 rounded-l"
              tabIndex={-1}
              aria-hidden="true"
            />
            <div className="flex items-center w-full gap-3">
              <div className="relative z-0 w-16 h-16 shrink-0 overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 will-change-transform">
                  <Image
                    src="assets/code.png"
                    fill={true}
                    alt=""
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110 object-contain"
                  />
                </div>
              </div>

              <div className="grow">
                <PText size="medium">Start Coding</PText>
              </div>

              <div className="shrink-0">
                <PLinkPure hideLabel={true} className="relative z-10">
                  <Link href="/developing/introduction/" aria-label={'Start Coding'} />
                </PLinkPure>
              </div>
            </div>
          </div>
        </AppearAnimation>
      </section>

      <section
        className="mt-fluid-xl grid gap-fluid-md md:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12"
        aria-label="Important links"
      >
        <AppearAnimation animation="fade-in-up">
          <PLinkTile
            href="styles/introduction/"
            label="Overview of styles and tokens"
            description="Styles & Tokens"
            size="medium"
            weight="regular"
            compact={true}
            gradient={false}
            className={`bg-surface rounded-lg ${isDark ? 'dark' : 'light'}`}
          >
            <Image src="assets/styles-tokens.png" alt="" width={1024} height={576} />
          </PLinkTile>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <PLinkTile
            href="components/introduction/"
            label="Coded component library"
            description="Components"
            size="medium"
            weight="regular"
            compact={true}
            gradient={false}
            className={`bg-surface rounded-lg ${isDark ? 'dark' : 'light'}`}
          >
            <Image src="assets/components.png" alt="" width={1024} height={576} />
          </PLinkTile>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <PLinkTile
            href="partials/introduction/"
            label="Overview of partials and assets"
            description="Assets"
            size="medium"
            weight="regular"
            compact={true}
            gradient={false}
            className={`bg-surface rounded-lg ${isDark ? 'dark' : 'light'}`}
          >
            <Image src="assets/assets.png" alt="" width={1024} height={576} />
          </PLinkTile>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <PLinkTile
            href="https://github.com/porsche-design-system/templates"
            label="Overview of complete page templates"
            description="Templates"
            size="medium"
            weight="regular"
            compact={true}
            gradient={false}
            className={`bg-surface rounded-lg ${isDark ? 'dark' : 'light'}`}
          >
            <Image src="assets/templates.png" alt="" width={1024} height={576} />
          </PLinkTile>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <PLinkTile
            href="news/changelog/"
            label="Find latest release notes"
            description="Release Notes"
            size="medium"
            weight="regular"
            compact={true}
            gradient={false}
            className={`bg-surface rounded-lg ${isDark ? 'dark' : 'light'}`}
          >
            <Image src="assets/release-notes.png" alt="" width={1024} height={576} />
          </PLinkTile>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <PLinkTile
            href="help/support/"
            label="How to provide feedback and make requests"
            description="Feedback & Requests"
            size="medium"
            weight="regular"
            compact={true}
            gradient={false}
            className={`bg-surface rounded-lg ${isDark ? 'dark' : 'light'}`}
          >
            <Image src="assets/feedback.png" alt="" width={1024} height={576} />
          </PLinkTile>
        </AppearAnimation>
      </section>

      <section
        className="mt-fluid-lg grid gap-fluid-md sm:grid-cols-1 col-span-full xs:col-start-2 xs:col-end-12"
        aria-label="Accessibility"
      >
        <AppearAnimation animation="fade-in-up">
          <PLinkTile
            href="must-know/accessibility/introduction/"
            label="How the Porsche Design system respects accessibility"
            description="Accessibility"
            size="large"
            weight="regular"
            compact={true}
            gradient={false}
            aspectRatio="16/9"
            className="bg-surface dark rounded-lg"
          >
            <Image src="assets/accessibility.png" alt="" width={2036} height={1144} />
          </PLinkTile>
        </AppearAnimation>
      </section>

      <section
        className="mt-fluid-2xl mb-fluid-2xl grid gap-fluid-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12"
        aria-label="How to create a feature Request"
      >
        <PHeading tag="h2" size="x-large">
          Change & Feature Requests
        </PHeading>
        <div>
          <PText size="medium" color="contrast-medium">
            We value your feedback, ideas, and contributions to help create the best possible experience with the
            Porsche Design System. Ready to get involved? Start by exploring our contributing guidelines!
          </PText>
          <PLinkPure className="mt-fluid-md" size="small">
            <Link href="/help/feature-request/">Create feature Request</Link>
          </PLinkPure>
        </div>
      </section>

      <section
        className="bg-surface rounded-lg mt-fluid-xl mb-fluid-xl pb-32 grid gap-fluid-md sm:grid-cols-full col-span-full xs:col-start-1 xs:col-end-13 grid-cols-12"
        aria-label="Benefits"
      >
        <div className="col-span-full xs:col-start-4 xs:col-end-10 mt-fluid-2xl mb-fluid-xl max-w-(--max-width-prose) mx-auto">
          <PHeading size="x-large" align="center">
            Benefits
          </PHeading>
          <PText size="medium" className="mt-fluid-md" color="contrast-medium" align="center">
            The design system offers a variety of benefits compared individual solutions: Saving time and effort while
            accelerating the development process through reusable components, consistent guidelines, and seamless
            integration.
          </PText>
        </div>
        <article className="col-start-3 md:col-end-7 col-end-11 p-6" aria-label="Short & Longterm Efficiency">
          <div className="relative rounded-lg bg-canvas w-20 h-20 m-auto">
            <Image src="assets/benefits_efficiency.png" fill={true} alt="" className="p-static-md" />
          </div>
          <PText align="center" size="x-small" color="contrast-medium" className="mb-fluid-xs mt-fluid-md">
            Short & Longterm Efficiency
          </PText>
          <PText align="center">
            Speeds up design and development by reusing maintained components and patterns. Enables better collaboration
            and delivers up to 31% faster implementation.
          </PText>
        </article>
        <article className="col-start-3 md:col-start-7 col-end-11 p-6" aria-label="Brand Fit">
          <div className="relative rounded-lg bg-canvas w-20 h-20 m-auto">
            <Image src="assets/benefits_brand_fit.png" fill={true} alt="" className="p-static-md" />
          </div>
          <PText align="center" size="x-small" color="contrast-medium" className="mb-fluid-xs mt-fluid-md">
            Brand Fit
          </PText>
          <PText align="center">
            Built on Porsche's design principles, it aligns with the brand identity, delivering a cohesive and premium
            digital experience.
          </PText>
        </article>
        <article className="col-start-3 md:col-end-7 col-end-11 p-6" aria-label="Accessibility">
          <div className="relative rounded-lg bg-canvas w-20 h-20 m-auto">
            <Image src="assets/benefits_accessibility.png" fill={true} alt="" className="p-static-md" />
          </div>
          <PText align="center" size="x-small" color="contrast-medium" className="mb-fluid-xs mt-fluid-md">
            Accessibility Compliant
          </PText>
          <PText align="center">
            WCAG compliant components ensure inclusivity and accessibility for all users, enhancing usability and user
            experience.
          </PText>
        </article>
        <article className="col-start-3 md:col-start-7 col-end-11 p-6" aria-label="Framework Agnostic">
          <div className="relative rounded-lg bg-canvas w-20 h-20 m-auto">
            <Image src="assets/benefits_framework_agnostic.png" fill={true} alt="" className="p-static-md" />
          </div>
          <PText align="center" size="x-small" color="contrast-medium" className="mb-fluid-xs mt-fluid-md">
            Framework Agnostic
          </PText>
          <PText align="center">
            Works seamlessly with any framework, offering flexibility, compatibility, and ease of use across platforms.
          </PText>
        </article>
        <article className="col-start-3 md:col-end-7 col-end-11 p-6" aria-label="Fluid & Responsive">
          <div className="relative rounded-lg bg-canvas w-20 h-20 m-auto">
            <Image src="assets/benefits_fluid_responsive.png" fill={true} alt="" className="p-static-md" />
          </div>
          <PText align="center" size="x-small" color="contrast-medium" className="mb-fluid-xs mt-fluid-md">
            Fluid & Responsive
          </PText>
          <PText align="center">
            The system is fully responsive and adaptable, ensuring an optimal user experience across all devices and
            screen sizes.
          </PText>
        </article>
        <article className="col-start-3 md:col-start-7 col-end-11 p-6" aria-label="Compliant Quality">
          <div className="relative rounded-lg bg-canvas w-20 h-20 m-auto">
            <Image src="assets/benefits_compliant_quality.png" fill={true} alt="" className="p-static-md" />
          </div>
          <PText align="center" size="x-small" color="contrast-medium" className="mb-fluid-xs mt-fluid-md">
            Compliant Quality
          </PText>
          <PText align="center">
            The system ensures flawless performance with automated tests, security checks, and smooth updates,
            delivering reliable, high-quality results every time.
          </PText>
        </article>
        <article className="col-start-3 md:col-end-7 col-end-11 p-6" aria-label="Updated Capability">
          <div className="relative rounded-lg bg-canvas w-20 h-20 m-auto">
            <Image src="assets/benefits_update_capability.png" fill={true} alt="" className="p-static-md" />
          </div>
          <PText align="center" size="x-small" color="contrast-medium" className="mb-fluid-xs mt-fluid-md">
            Updated Capability
          </PText>
          <PText align="center">
            Styles, tokens, and components can be updated anytime, enabling flexibility, improvement, and alignment with
            evolving design trends.
          </PText>
        </article>
        <article className="col-start-3 md:col-start-7 col-end-11 p-6" aria-label="Open-Source Code">
          <div className="relative rounded-lg bg-canvas w-20 h-20 m-auto">
            <Image src="assets/benefits_open_source_code.png" fill={true} alt="" className="p-static-md" />
          </div>
          <PText align="center" size="x-small" color="contrast-medium" className="mb-fluid-xs mt-fluid-md">
            Open-Source Code
          </PText>
          <PText align="center">
            It fosters collaboration by allowing everyone to use the code, ensuring transparency, innovation, and
            well-tested, dependable solutions.
          </PText>
        </article>
      </section>

      <section
        className="mt-fluid-xl grid gap-fluid-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12"
        aria-label="Resources"
      >
        <div>
          <PHeading size="x-large">Resources</PHeading>
        </div>

        <div className="mt-fluid-md mb-fluid-xl flex flex-col gap-fluid-md items-start">
          <PLinkPure
            icon="external"
            size="medium"
            href="https://github.com/porsche-design-system/porsche-design-system"
          >
            Github Repository
          </PLinkPure>
          <PLinkPure
            icon="external"
            size="medium"
            href="https://figma.com/design/EkdP468u4ZVuIRwalKCscb/Web-Design-System-v3?node-id=32923-48020"
          >
            Figma Design Library (internal)
          </PLinkPure>
          <PLinkPure icon="external" size="medium" href="https://figma.com/@porsche">
            Figma Design Library (public)
          </PLinkPure>
          <PLinkPure icon="external" size="medium" href="https://brand.porsche.com/">
            Brand Guide
          </PLinkPure>
          <PLinkPure icon="external" size="medium" href="https://brand.porsche.com/d/c57AXjojQojN/icon-library">
            Icon Library
          </PLinkPure>
        </div>
      </section>
    </>
  );
};
