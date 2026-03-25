'use client';

import {
  type AccordionUpdateEventDetail,
  PAccordion,
  PHeading,
  PLink,
  PLinkPure,
  PLinkTile,
  PText,
} from '@porsche-design-system/components-react/ssr';
import { kebabCase } from 'change-case';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { StickyBenefitsSection } from '@/components/layout/StickyBenefitsSection';
import { useParallax } from '@/hooks/useParallax';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';
import { localPorscheDesignSystemVersion } from '@/utils/porscheDesignSystemVersion';
import AppearAnimation from './appearAnimation';

export const Home = () => {
  const { isDark } = useStorefrontColorScheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const handleFaqUpdate = useCallback(
    (index: number) => (e: CustomEvent<AccordionUpdateEventDetail>) => {
      setOpenFaq(e.detail.open ? index : null);
    },
    []
  );

  // Parallax scroll for gradient blobs
  const blobRefs = useParallax();

  return (
    <>
      <section
        className="col-[full] relative grid grid-cols-subgrid gap-y-fluid-xl"
        aria-label="Porsche Design System v4"
      >
        {/* ── intro ── */}
        <div className="col-[wide] @container grid h-[max(580px,80vh)]">
          <PHeading className="[grid-area:1/1] [place-self:start] max-w-[22rem]" tag="h1" size="2xl">
            Porsche Design System
          </PHeading>
          <svg
            className={`[grid-area:1/1] [place-self:center_end] signature`}
            viewBox="0 0 680 522"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/** biome-ignore lint/correctness/useUniqueElementIds: ok */}
              <linearGradient id="v4-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="light-dark(#000,#FFFDF7)" />
                <stop offset="100%" stopColor="light-dark(#000, #FFFDF7)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M123.029 521.406L0 152.32H33.6864L139.872 475.27L246.057 152.32H275.35L152.321 521.406H123.029Z"
              fill="url(#v4-gradient)"
            />
            <path
              d="M310.03 388.126V366.157L545.835 0H591.238V360.298H679.116V388.126H591.238V521.407H559.016V388.126H310.03ZM347.378 360.298H559.016V27.828L347.378 360.298Z"
              fill="url(#v4-gradient)"
            />
          </svg>
          <div className="[grid-area:1/1] [place-self:end_start] max-w-[22rem] relative p-fluid-md rounded-4xl flex justify-between items-center gap-static-md bg-frosted backdrop-blur-frosted transition-colors hover:bg-frosted-soft">
            <Link
              href={`news/changelog/#${kebabCase(localPorscheDesignSystemVersion)}`}
              className="absolute inset-0"
              tabIndex={-1}
              aria-hidden="true"
            />
            <div className="flex flex-col prose-text-sm">
              <b>Release Note</b>
              <span className="text-contrast-medium">
                Checkout the latest release <code>{localPorscheDesignSystemVersion}</code>
              </span>
            </div>
            <PLink hideLabel={true} variant="secondary" icon="arrow-right" compact={true}>
              <Link
                href={`news/changelog/#${kebabCase(localPorscheDesignSystemVersion)}`}
                aria-label={`Release Note: Checkout the release ${localPorscheDesignSystemVersion}`}
              />
            </PLink>
          </div>
        </div>

        {/* ── about ── */}
        <div className="col-[wide] @md:col-[extended] mt-fluid-xl max-w-[34rem] grid gap-fluid-md">
          <PText size="lg">
            This is your all-in-one toolkit for creating high-quality, visually stunning web applications. With
            intuitive Figma libraries, robust Web Components, and comprehensive guidelines, it&apos;s built and tested
            to embody Porsche&apos;s signature quality and design principles.
          </PText>
          <PText size="sm" color="contrast-medium">
            We provide publicly available npm packages for modern frameworks, all powered by Web Components with
            TypeScript and SSR support. Share your feedback, feature requests, and ideas on our public{' '}
            <PLinkPure color="contrast-medium" underline={true} icon="none">
              <Link href="https://github.com/porsche-design-system/porsche-design-system/issues">issue board</Link>
            </PLinkPure>
            !
          </PText>
        </div>

        {/* ── getting started ── */}
        <div className="col-[wide] @md:col-[extended] grid @3xl:grid-cols-2 gap-fluid-md">
          <AppearAnimation animation="fade-in-up">
            <div className="relative p-fluid-md flex items-center gap-static-md rounded-4xl bg-frosted backdrop-blur-frosted transition-colors hover:bg-frosted-soft">
              <Link href="/designing/introduction/" className="absolute inset-0" tabIndex={-1} aria-hidden="true" />
              <Image
                src={isDark ? 'assets/design_dark.webp' : 'assets/design_light.webp'}
                alt=""
                width={160}
                height={160}
                priority
                className="shrink-0 w-16 h-16"
              />
              <PHeading className="grow-1" tag="h2" size="md">
                Start Designing
              </PHeading>
              <PLink className="shrink-0" hideLabel={true} variant="secondary" icon="arrow-right" compact={true}>
                <Link href="/designing/introduction/" aria-label="Start Designing" />
              </PLink>
            </div>
          </AppearAnimation>
          <AppearAnimation animation="fade-in-up">
            <div className="relative p-fluid-md flex items-center gap-static-md rounded-4xl bg-frosted backdrop-blur-frosted transition-colors hover:bg-frosted-soft">
              <Link href="/developing/introduction/" className="absolute inset-0" tabIndex={-1} aria-hidden="true" />
              <Image
                src={isDark ? 'assets/coding_dark.webp' : 'assets/coding_light.webp'}
                alt=""
                width={160}
                height={160}
                priority
                className="shrink-0 w-16 h-16"
              />
              <PHeading className="grow-1" tag="h2" size="md">
                Start Coding
              </PHeading>
              <PLink className="shrink-0" hideLabel={true} variant="secondary" icon="arrow-right" compact={true}>
                <Link href="/developing/introduction/" aria-label="Start Coding" />
              </PLink>
            </div>
          </AppearAnimation>
        </div>

        {/* ── quick links ── */}
        <div className="col-[wide] @md:col-[extended] grid @xl:grid-cols-2 gap-fluid-md">
          <AppearAnimation animation="fade-in-up">
            <PLinkTile
              style={{ colorScheme: 'inherit' }}
              className="bg-frosted backdrop-blur-frosted rounded-4xl"
              href="components/introduction/"
              label="Coded component library"
              description="Components"
              size="medium"
              weight="regular"
              aspectRatio="1/1"
              compact={true}
              gradient={false}
            >
              <div className="flex items-center justify-center w-full h-full pb-fluid-lg @md:p-fluid-lg">
                <Image
                  src={isDark ? 'assets/components_dark.webp' : 'assets/components_light.webp'}
                  alt=""
                  width={512}
                  height={288}
                  className="w-auto h-auto max-w-[80%] max-h-[70%] object-contain"
                />
              </div>
            </PLinkTile>
          </AppearAnimation>
          <AppearAnimation animation="fade-in-up">
            <PLinkTile
              style={{ colorScheme: 'inherit' }}
              className="bg-frosted backdrop-blur-frosted rounded-4xl"
              href="tokens/introduction/"
              label="Overview of tokens"
              description="Tokens"
              size="medium"
              weight="regular"
              aspectRatio="1/1"
              compact={true}
              gradient={false}
            >
              <div className="flex items-center justify-center w-full h-full pb-fluid-lg @md:p-fluid-lg">
                <Image
                  src={isDark ? 'assets/tokens_dark.webp' : 'assets/tokens_light.webp'}
                  alt=""
                  width={400}
                  height={400}
                  className="w-auto h-auto max-w-[80%] max-h-[70%] object-contain"
                />
              </div>
            </PLinkTile>
          </AppearAnimation>
          <AppearAnimation animation="fade-in-up">
            <PLinkTile
              style={{ colorScheme: 'inherit' }}
              className="bg-frosted backdrop-blur-frosted rounded-4xl"
              href="patterns/"
              label="Overview of patterns"
              description="Patterns"
              size="medium"
              weight="regular"
              aspectRatio="1/1"
              compact={true}
              gradient={false}
            >
              <div className="flex items-center justify-center w-full h-full pb-fluid-lg @md:p-fluid-lg">
                <Image
                  src={isDark ? 'assets/assets_dark.webp' : 'assets/assets_light.webp'}
                  alt=""
                  width={512}
                  height={288}
                  className="w-auto h-auto max-w-[80%] max-h-[70%] object-contain"
                />
              </div>
            </PLinkTile>
          </AppearAnimation>
          <AppearAnimation animation="fade-in-up">
            <PLinkTile
              style={{ colorScheme: 'inherit' }}
              className="bg-frosted backdrop-blur-frosted rounded-4xl"
              href="templates/"
              label="Overview of templates"
              description="Templates"
              size="medium"
              weight="regular"
              aspectRatio="1/1"
              compact={true}
              gradient={false}
            >
              <div className="flex items-center justify-center w-full h-full pb-fluid-lg @md:p-fluid-lg">
                <Image
                  src={isDark ? 'assets/templates_dark.webp' : 'assets/templates_light.webp'}
                  alt=""
                  width={512}
                  height={288}
                  className="w-auto h-auto max-w-[80%] max-h-[70%] object-contain"
                />
              </div>
            </PLinkTile>
          </AppearAnimation>
          <AppearAnimation animation="fade-in-up">
            <PLinkTile
              style={{ colorScheme: 'inherit' }}
              className="bg-frosted backdrop-blur-frosted rounded-4xl"
              href="news/changelog/"
              label="Find latest release notes"
              description="Release Notes"
              size="medium"
              weight="regular"
              aspectRatio="1/1"
              compact={true}
              gradient={false}
            >
              <div className="flex items-center justify-center w-full h-full pb-fluid-lg @md:p-fluid-lg">
                <Image
                  src={isDark ? 'assets/release_dark.webp' : 'assets/release_light.webp'}
                  alt=""
                  width={512}
                  height={288}
                  className="w-auto h-auto max-w-[80%] max-h-[70%] object-contain"
                />
              </div>
            </PLinkTile>
          </AppearAnimation>
          <AppearAnimation animation="fade-in-up">
            <PLinkTile
              style={{ colorScheme: 'inherit' }}
              className="bg-frosted backdrop-blur-frosted rounded-4xl"
              href="help/support/"
              label="How to provide feedback and make requests"
              description="Feedback & Requests"
              size="medium"
              weight="regular"
              aspectRatio="1/1"
              compact={true}
              gradient={false}
            >
              <div className="flex items-center justify-center w-full h-full pb-fluid-lg @md:p-fluid-lg">
                <Image
                  src={isDark ? 'assets/feedback_dark.webp' : 'assets/feedback_light.webp'}
                  alt=""
                  width={512}
                  height={288}
                  className="w-auto h-auto max-w-[80%] max-h-[70%] object-contain"
                />
              </div>
            </PLinkTile>
          </AppearAnimation>
        </div>

        {/* ── accessibility ── */}
        <div className="col-[wide] @md:col-[extended]">
          <AppearAnimation animation="fade-in-up">
            <PLinkTile
              style={{ colorScheme: 'inherit' }}
              className="bg-frosted backdrop-blur-frosted rounded-4xl"
              href="must-know/accessibility/introduction/"
              label="How the Porsche Design System respects accessibility"
              description="Accessibility"
              size="large"
              weight="regular"
              aspectRatio={{ base: '1/1', l: '16/9' }}
              compact={true}
              gradient={false}
            >
              <div className="flex items-center justify-center w-full h-full py-fluid-xl @lg:px-fluid-xl">
                <Image
                  src="assets/accessibility-circles.png"
                  alt=""
                  width={985}
                  height={289}
                  className="w-auto h-auto max-w-[80%] max-h-[60%] object-contain"
                />
              </div>
            </PLinkTile>
          </AppearAnimation>
        </div>

        {/* glow 1 */}
        <div
          className={`absolute top-[190px] [inset-inline-end:26cqw] [transform:rotate(58deg)] glow-1`}
          ref={(el) => {
            blobRefs.current[3] = el;
          }}
          data-parallax="-0.35"
          data-base-transform="rotate(58deg)"
        />

        {/* glow 2 */}
        <div
          className="absolute top-[1440px] [inset-inline-start:-344px] [transform:rotate(-180deg)] glow-2"
          ref={(el) => {
            blobRefs.current[0] = el;
          }}
          data-parallax="-0.4"
          data-base-transform="rotate(-180deg)"
        />
      </section>

      {/* ── change & feature requests ── */}
      <section
        className="col-[wide] @md:col-[extended] mt-fluid-2xl grid gap-fluid-md @3xl:grid-cols-2"
        aria-label="Change and Feature Requests"
      >
        <AppearAnimation animation="fade-in-up">
          <PHeading tag="h2" size="xl">
            Change &amp; Feature Requests
          </PHeading>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <PText size="md" color="contrast-medium">
            We value your feedback, ideas, and contributions to help create the best possible experience with the
            Porsche Design System. Ready to get involved? Start by exploring our contributing guidelines!
          </PText>
          <PLinkPure className="mt-fluid-md">
            <Link href="/help/feature-request/">Create feature Request</Link>
          </PLinkPure>
        </AppearAnimation>
      </section>

      {/* glow 3 */}
      <div className="col-[wide] relative">
        <div
          ref={(el) => {
            blobRefs.current[4] = el;
          }}
          data-parallax="0.75"
          className="absolute -top-[200px] left-[50%] glow-3"
        />
      </div>

      {/* ── benefits ── */}
      <section className="col-[full] mt-fluid-2xl grid grid-cols-subgrid bg-canvas rounded-4xl" aria-label="Benefits">
        <div className="col-[wide] justify-self-center my-fluid-xl max-w-[60ch] grid gap-fluid-md">
          <PHeading tag="h2" size="3xl" align="center">
            Benefits
          </PHeading>
          <PText size="md" align="center" color="contrast-medium">
            The design system offers a variety of benefits compared individual solutions: Saving time and effort while
            accelerating the development process through reusable components, consistent guidelines, and seamless
            integration.
          </PText>
        </div>
        <div className="col-[wide]">
          <StickyBenefitsSection />
        </div>
      </section>

      {/* ── faq ── */}
      <section
        className="col-[wide] @md:col-[extended] mt-fluid-xl grid gap-fluid-md @5xl:grid-cols-2"
        aria-label="FAQ"
      >
        <AppearAnimation animation="fade-in-up">
          <PHeading tag="h2" size="xl">
            FAQ
          </PHeading>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <div className="[--p-accordion-px:var(--p-spacing-static-lg)] [--p-accordion-py:var(--p-spacing-static-lg)] grid gap-static-xs">
            <PAccordion background="frosted" open={openFaq === 0} onUpdate={handleFaqUpdate(0)}>
              <PHeading slot="summary" tag="h3" size="md">
                How do I use the Porsche Design System?
              </PHeading>
              <PText color="contrast-medium">
                <PLinkPure icon="none" underline={true}>
                  <Link href="/developing/introduction/">Get Started</Link>
                </PLinkPure>{' '}
                by installing the Porsche Design System packages via npm and importing the components.
              </PText>
            </PAccordion>
            <PAccordion background="frosted" open={openFaq === 1} onUpdate={handleFaqUpdate(1)}>
              <PHeading slot="summary" tag="h3" size="md">
                What&apos;s the source of truth?
              </PHeading>
              <PText color="contrast-medium">
                The coded components serve as the single source of truth for both design and development. The Figma
                library is kept in sync but may occasionally diverge in minor details.
              </PText>
            </PAccordion>
            <PAccordion background="frosted" open={openFaq === 2} onUpdate={handleFaqUpdate(2)}>
              <PHeading slot="summary" tag="h3" size="md">
                Can I customize components?
              </PHeading>
              <PText color="contrast-medium">
                <PLinkPure icon="none" underline={true}>
                  <Link href="/components/introduction/">Components</Link>
                </PLinkPure>{' '}
                are designed to cover common use cases out of the box. You can customize them through their public
                interface: <code>Properties</code>, <code>Slots</code>, and <code>CSS variables</code>. Don't override
                internals, as this may break future update compatibility. If you need a feature that isn&apos;t
                available, reach out to us via our{' '}
                <PLinkPure
                  href="https://porscheag.enterprise.slack.com/archives/CT7AVHTTQ"
                  icon="none"
                  underline={true}
                >
                  Slack
                </PLinkPure>{' '}
                channel.
                <br />
                <br />
                For fully custom components, we offer styling solutions for{' '}
                <PLinkPure icon="none" underline={true}>
                  <Link href="/tailwindcss/introduction/">Tailwind CSS</Link>
                </PLinkPure>{' '}
                (recommended),{' '}
                <PLinkPure icon="none" underline={true}>
                  <Link href="/scss/introduction/">SCSS</Link>
                </PLinkPure>
                ,{' '}
                <PLinkPure icon="none" underline={true}>
                  <Link href="/emotion/introduction/">Emotion</Link>
                </PLinkPure>
                , and{' '}
                <PLinkPure icon="none" underline={true}>
                  <Link href="/vanilla-extract/introduction/">Vanilla Extract</Link>
                </PLinkPure>
                .
              </PText>
            </PAccordion>
            <PAccordion background="frosted" open={openFaq === 3} onUpdate={handleFaqUpdate(3)}>
              <PHeading slot="summary" tag="h3" size="md">
                Which frameworks are supported?
              </PHeading>
              <PText color="contrast-medium">
                The Porsche Design System offers first-class support for React, Angular, Vue, and Vanilla JS — all built
                on Web Components under the hood. Each framework comes with a dedicated wrapper package and full
                TypeScript support.
              </PText>
            </PAccordion>
          </div>
        </AppearAnimation>
      </section>

      {/* ── resources ── */}
      <section
        className="col-[wide] @md:col-[extended] my-fluid-xl grid gap-fluid-md @2xl:grid-cols-2"
        aria-label="Resources"
      >
        <AppearAnimation animation="fade-in-up">
          <PHeading size="xl">Resources</PHeading>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <div className="flex flex-col gap-fluid-md items-start">
            <PLinkPure icon="external" size="md" href="https://github.com/porsche-design-system/porsche-design-system">
              Github Repository
            </PLinkPure>
            <PLinkPure
              icon="external"
              size="md"
              href="https://figma.com/design/EkdP468u4ZVuIRwalKCscb/Web-Design-System-v3?node-id=32923-48020"
            >
              Figma Library (internal)
            </PLinkPure>
            <PLinkPure icon="external" size="md" href="https://figma.com/@porsche">
              Figma Library (public)
            </PLinkPure>
            <PLinkPure icon="external" size="md" href="https://brand.porsche.com/">
              Brand Guide
            </PLinkPure>
            <PLinkPure icon="external" size="md" href="https://brand.porsche.com/d/c57AXjojQojN/icon-library">
              Icon Library
            </PLinkPure>
          </div>
        </AppearAnimation>
      </section>
    </>
  );
};
