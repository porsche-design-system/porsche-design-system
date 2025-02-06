'use client';

import { PCarousel, PDisplay, PLinkPure, PText } from '@porsche-design-system/components-react/ssr';
import Image from 'next/image';
import AppearAnimation from './appearAnimation';

export default function Home() {
  return (
    <>
      <div
        className="col-span-full grid h-[90vh] grid-cols-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden "
        style={{ marginBlockStart: '-70px', marginInline: 'calc(clamp(16px, 12px + 1.25vw, 24px) * -1)' }}
      >
        <video
          className="row-start-1 col-start-1 w-full h-[90vh] object-cover"
          style={{ filter: 'contrast(0.9) brightness(1.25) saturate(0.8)' }}
          slot="background"
          poster="/templates/assets/bg-Q94iMsVP.webp"
          loop={true}
          muted={true}
          autoPlay={true}
          playsInline={true}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/templates/assets/bg-BP9F-keA.webm" type="video/webm" />
          <source src="assets/test-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <PDisplay
          className="z-20 mt-lg ms-lg row-start-1 col-start-1 max-w-3xl dark:text-primary text-background-base"
          size="large"
          color="inherit"
        >
          Welcome to the Porsche Design System
        </PDisplay>
        <a href="https://porsche.com" className="block w-full h-full" tabIndex={-1}>
          <div
            className="backdrop-blur-sm bg-background-surface max-w-lg bottom-0 left-0 m-4 p-6 bg-white rounded-lg shadow-lg flex justify-between items-center gap-4"
            style={{ marginBottom: '5%', marginLeft: '5%' }}
          >
            <div className="flex flex-col">
              <PText size="small" weight="semi-bold">
                Release Note
              </PText>
              <PText size="small" color="contrast-medium">
                Checkout the latest release v3.22.0
              </PText>
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full">
              <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
            </div>
          </div>
        </a>
      </div>

      <article className="mt-2xl col-span-full xs:col-start-4 xs:col-end-10">
        <PText size="large" align="center">
          This is your all-in-one toolkit for creating high-quality, visually stunning web applications. With intuitive
          Figma libraries, robust Web Components, and comprehensive guidelines, it’s built and tested to embody
          Porsche’s signature quality and design principles.
        </PText>
        <PText className="mt-md" color="contrast-high" align="center">
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

      <div className="mt-xl grid gap-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12">
        <AppearAnimation animation="fade-in-up">
          <div className="element-to-animate relative bg-background-surface rounded-lg overflow-hidden group aspect-[4/3]">
            <a href="https://porsche.com" className="block w-full h-full" tabIndex={-1}>
              <div className="relative w-full h-full">
                <Image
                  src="assets/styles-tokens.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Styles & Tokens Image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className="absolute bottom-0 w-full bg-white/70 px-md py-md flex justify-between box-border">
                <PText size="medium">Styles & Tokens</PText>
                <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
              </div>
            </a>
          </div>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <div className="relative bg-background-surface rounded-lg overflow-hidden group aspect-[4/3]">
            <a href="https://porsche.com" className="block w-full h-full" tabIndex={-1}>
              <div className="relative w-full h-full">
                <Image
                  src="assets/components.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Components Image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 w-full bg-white/70 px-md py-md flex justify-between box-border">
                <PText size="medium">Components</PText>
                <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
              </div>
            </a>
          </div>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <div className="relative bg-background-surface rounded-lg overflow-hidden group aspect-[4/3]">
            <a href="https://porsche.com" className="block w-full h-full" tabIndex={-1}>
              <div className="relative w-full h-full">
                <Image
                  src="assets/assets.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Assets Image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 w-full bg-white/70 px-md py-md flex justify-between box-border">
                <PText size="medium">Assets</PText>
                <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
              </div>
            </a>
          </div>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <div className="relative bg-background-surface rounded-lg overflow-hidden group aspect-[4/3]">
            <a href="https://porsche.com" className="block w-full h-full" tabIndex={-1}>
              <div className="relative w-full h-full">
                <Image
                  src="assets/templates.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Templates Image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 w-full bg-white/70 px-md py-md flex justify-between box-border">
                <PText size="medium">Templates</PText>
                <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
              </div>
            </a>
          </div>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <div className="relative bg-background-surface rounded-lg overflow-hidden group aspect-[4/3]">
            <a href="https://porsche.com" className="block w-full h-full" tabIndex={-1}>
              <div className="relative w-full h-full">
                <Image
                  src="assets/release-notes.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Release Notes Image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 w-full bg-white/70 px-md py-md flex justify-between box-border">
                <PText size="medium">Release Notes</PText>
                <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
              </div>
            </a>
          </div>
        </AppearAnimation>
        <AppearAnimation animation="fade-in-up">
          <div className="relative bg-background-surface rounded-lg overflow-hidden group aspect-[4/3]">
            <a href="https://porsche.com" className="block w-full h-full" tabIndex={-1}>
              <div className="relative w-full h-full">
                <Image
                  src="assets/feedback.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Feedback & Requests Image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 w-full bg-white/70 px-md py-md flex justify-between box-border">
                <PText size="medium">Feedback & Requests</PText>
                <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
              </div>
            </a>
          </div>
        </AppearAnimation>
      </div>

      <div className="mt-lg grid gap-md sm:grid-cols-1 col-span-full xs:col-start-2 xs:col-end-12">
        <div className="relative bg-background-surface-dark rounded-lg overflow-hidden group aspect-[16/9]">
          <a href="https://porsche.com" className="block w-full h-full" tabIndex={-1}>
            <div className="relative w-full h-full">
              <Image
                src="assets/accessibility.png"
                layout="fill"
                objectFit="contain"
                alt="Some wireframes"
                className="transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="absolute bottom-0 w-full bg-white/70 px-md py-md flex justify-between box-border text-background-base dark:text-primary">
              <PText size="medium" color="inherit">
                Accessibility
              </PText>
              <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
            </div>
          </a>
        </div>
      </div>

      <div className="mt-xl grid gap-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12">
        <div className="relative bg-background-surface rounded-lg overflow-hidden group flex items-center gap-4 p-4">
          <a href="https://porsche.com" className="flex items-center w-full gap-3" tabIndex={-1}>
            <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
              <div className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 will-change-transform">
                <Image
                  src="assets/design.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Feedback & Requests Image"
                  className="block"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                />
              </div>
            </div>

            <div className="flex-grow">
              <PText size="medium">Start Designing</PText>
            </div>

            <div className="flex-shrink-0">
              <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
            </div>
          </a>
        </div>

        <div className="relative bg-background-surface rounded-lg overflow-hidden group flex items-center gap-4 p-4 group-hover:bg-background-hover">
          <a href="https://porsche.com" className="flex items-center w-full gap-3" tabIndex={-1}>
            <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
              <div className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 will-change-transform ">
                <Image
                  src="assets/code.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Feedback & Requests Image"
                  className="block"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                />
              </div>
            </div>

            <div className="flex-grow">
              <PText size="medium">Start Coding</PText>
            </div>

            <div className="flex-shrink-0">
              <PLinkPure size="medium" hideLabel={true} href="https://porsche.com" tabIndex={0} />
            </div>
          </a>
        </div>
      </div>

      <div className="mt-2xl mb-2xl grid gap-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12">
        <div>
          <PText size="x-large">Change & Feature Requests</PText>
        </div>
        <div>
          <PText size="medium" color="contrast-medium">
            We value your feedback, ideas, and contributions to help create the best possible experience with the
            Porsche Design System. Ready to get involved? Start by exploring our contributing guidelines!
          </PText>
          <PLinkPure className="mt-md" size="small" href="https://porsche.com" tabIndex={0}>
            Create feature Request
          </PLinkPure>
        </div>
      </div>

      <div className="bg-background-surface rounded-lg mt-xl mb-xl pb-32 grid gap-md sm:grid-cols-full col-span-full xs:col-start-1 xs:col-end-13">
        <article className="mt-2xl mb-xl max-w-prose mx-auto ">
          <PText size="x-large" align="center">
            Benefits
          </PText>
          <PText size="medium" className="mt-md" color="contrast-medium" align="center">
            The design system offers a variety of benefits compared individual solutions: Saving time and effort while
            accelerating the development process through reusable components, consistent guidelines, and seamless
            integration.
          </PText>
        </article>
        <PCarousel width="extended">
          <div>
            <article className="place-items-center min-h-[600px] mt-sm mb-sm grid gap-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12 bg-background-base rounded-lg p-[100px]">
              <div>
                <div className="mb-4">
                  <PText size="small" weight="semi-bold" align="left">
                    Updated Capability
                  </PText>
                </div>
                <PText size="large" className="" color="contrast-medium" align="left">
                  The ability to update styles, tokens, and components at any time ensures flexibility, continuous
                  improvement, and alignment with evolving design trends.
                </PText>
              </div>
              <div className="relative w-full h-full">
                <Image
                  src="assets/agnostic.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Some wireframes"
                  className="relative"
                />
              </div>
            </article>
          </div>
          <div>
            <article className="place-items-center min-h-[600px] mt-sm mb-sm grid gap-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12 bg-background-base rounded-lg p-[100px]">
              <div>
                <div className="mb-4">
                  <PText size="small" weight="semi-bold" align="left">
                    Accessibility
                  </PText>
                </div>
                <PText size="large" className="" color="contrast-medium" align="left">
                  Ensures an inclusive experience by meeting accessibility standards, enhancing usability, compliance,
                  and overall satisfaction for people with diverse abilities.
                </PText>
              </div>
              <div className="relative w-full h-full">
                <Image
                  src="assets/agnostic.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Some wireframes"
                  className="relative"
                />
              </div>
            </article>
          </div>
          <div>
            <article className="place-items-center min-h-[600px] mt-sm mb-sm grid gap-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12 bg-background-base rounded-lg p-[100px]">
              <div>
                <div className="mb-4">
                  <PText size="small" weight="semi-bold" align="left">
                    Brand Fit
                  </PText>
                </div>
                <PText size="large" className="" color="contrast-medium" align="left">
                  Built on Porsche's design guidelines, it ensures alignment with the brand’s identity, delivering a
                  cohesive and premium user experience.
                </PText>
              </div>
              <div className="relative w-full h-full">
                <Image
                  src="assets/agnostic.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Some wireframes"
                  className="relative"
                />
              </div>
            </article>
          </div>
          <div>
            <article className="place-items-center min-h-[600px] mt-sm mb-sm grid gap-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12 bg-background-base rounded-lg p-[100px]">
              <div>
                <div className="mb-4">
                  <PText size="small" weight="semi-bold" align="left">
                    Framework Agnostic
                  </PText>
                </div>
                <PText size="large" className="" color="contrast-medium" align="left">
                  Works seamlessly with any framework, offering flexibility, compatibility, and ease of use across
                  platforms.
                </PText>
              </div>
              <div className="relative w-full h-full">
                <Image
                  src="assets/agnostic.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Some wireframes"
                  className="relative"
                />
              </div>
            </article>
          </div>
        </PCarousel>
      </div>

      <div className="mt-xl grid gap-md sm:grid-cols-2 col-span-full xs:col-start-2 xs:col-end-12">
        <div>
          <PText size="x-large">Resources</PText>
        </div>

        <div className="mt-md mb-xl flex flex-col gap-md items-start">
          <PLinkPure icon="external" size="medium" href="https://porsche.com" tabIndex={0}>
            Github Repository
          </PLinkPure>
          <PLinkPure icon="external" size="medium" href="https://porsche.com" tabIndex={0}>
            Figma Design Library
          </PLinkPure>
          <PLinkPure icon="external" size="medium" href="https://porsche.com" tabIndex={0}>
            Brand Guide
          </PLinkPure>
          <PLinkPure icon="external" size="medium" href="https://porsche.com" tabIndex={0}>
            Icon Library
          </PLinkPure>
        </div>
      </div>
    </>
  );
}
