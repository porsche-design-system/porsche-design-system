import { Fragment } from 'preact';
import type { ExampleMeta } from '../../../lib/meta.ts';
import { TemplatePage } from '../../_layouts/TemplatePage.tsx';
import { FeedbackForm } from '../../_partials/feedback/FeedbackForm.tsx';
import { Footer } from '../../_partials/footer/Footer.tsx';
import { HeroVideo } from '../../_partials/HeroVideo.tsx';
import { Script } from '../../_partials/Script.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Personalized mailing',
  description:
    'A personal follow-up page for a configured vehicle, linked from a mailing. It greets the customer by name, recaps the configuration, recommends further options and hands over to a personal sales advisor.',
};

// ---------------------------------------------------------------------------------------------------------------------
// Shared class lists
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Reveal on scroll: the page script marks an element `data-revealed` once it enters the viewport, which plays the
 * `fade-in-up` keyframes of the theme. Without motion the element is simply shown.
 */
const reveal = 'motion-safe:opacity-0 motion-safe:data-revealed:animate-fade-in-up';

/** Staggers a reveal by multiples of the small duration token. */
const delay = (step: number) => (step ? `animation-delay: calc(var(--transition-duration-sm) * ${step})` : undefined);

/** Fades an element of the hero in once the page script marks the hero as mounted. */
const mountFade =
  'opacity-0 motion-safe:transition-opacity motion-safe:duration-lg motion-safe:ease-in-out group-data-mounted/hero:opacity-100';

// ---------------------------------------------------------------------------------------------------------------------
// Data – lives here, next to the markup rendering it
// ---------------------------------------------------------------------------------------------------------------------

type Kpi = { label: string; values: { to: number; decimals?: number; unit: string }[] };

const kpis: Kpi[] = [
  { label: 'Maximum engine speed', values: [{ to: 9000, unit: 'rpm' }] },
  { label: 'Acceleration 0–100 km/h', values: [{ to: 3.9, decimals: 1, unit: 's' }] },
  {
    label: 'Power (kW) / Power (PS)',
    values: [
      { to: 375, unit: 'kW' },
      { to: 510, unit: 'PS' },
    ],
  },
];

/** Bar heights of the engine sound waveform in px, repeated across its 30 bars. */
const waveHeights = [8, 14, 22, 28, 18, 24, 12, 20, 15, 10];
const waveDelays = [0.28, 0, 0.1];
const waveBars = Array.from({ length: 30 }, (_, index) => ({
  height: waveHeights[index % waveHeights.length],
  delay: waveDelays[index % waveDelays.length],
}));
/**
 * Width of the waveform in spacing units: its bars and the gaps between them are `0.75` each. The width of the playing
 * pill where `calc-size()` is not supported – a length in `rem`, so it grows with the text size.
 */
const waveWidth = (waveBars.length * 2 - 1) * 0.75;

type Highlight = { label: string; value: string; src: string; layout: string };

const highlights: Highlight[] = [
  {
    label: 'Exterior colour',
    value: 'Carmine Red',
    src: '/examples/media/pm-mosaic-1.webp',
    layout: 'aspect-3/4 md:row-span-2',
  },
  {
    label: 'Interior colour and material',
    value: 'Leather interior in Carmine Red',
    src: '/examples/media/pm-mosaic-2.webp',
    layout: 'aspect-3/2 md:aspect-auto',
  },
  {
    label: 'Exterior',
    value: 'Sports exhaust system with tailpipes in black',
    src: '/examples/media/pm-mosaic-3.webp',
    layout: 'aspect-3/2 md:aspect-auto',
  },
];

type Option = { description: string; teaser: string; src: string };

const options: Option[] = [
  {
    description: 'Burmester® High-End Surround Sound System',
    teaser: 'Your sound experience, perfected.',
    src: '/examples/media/pm-xsell-burmester.webp',
  },
  {
    description: 'HD-Matrix LED main headlights',
    teaser: 'Precise light for every situation.',
    src: '/examples/media/pm-xsell-led.webp',
  },
  {
    description: 'Sport Chrono Package',
    teaser: 'For the decisive moment.',
    src: '/examples/media/pm-xsell-chrono.webp',
  },
];

type Review = { videoId: string; title: string; quote: string; source: string };

const reviews: Review[] = [
  {
    videoId: 'oK9JB7SpZWw',
    title: 'Porsche 911 Targa tested by auto motor und sport',
    quote: 'The finest roads of the Black Forest and the Porsche 911 – it simply fits.',
    source: 'auto motor und sport',
  },
  {
    videoId: 'cYvm2S3pNp8',
    title: '60 years of the Porsche 911 Targa',
    quote: 'Sixty years of Targa – a silhouette that still turns every head.',
    source: 'Porsche',
  },
  {
    videoId: 'wUGx2ZcxZok',
    title: 'Porsche 911 Targa 4 GTS driving report',
    quote: 'Open-top driving without compromise: in everyday use the Targa stays remarkably composed.',
    source: 'Driving report',
  },
  {
    videoId: 'D6irwZDE1b4',
    title: 'Porsche 911 Targa 4 GTS test report',
    quote: 'Between sports car and grand tourer, the Targa 4 GTS strikes the perfect balance.',
    source: 'Test report',
  },
];

/** The three share cards: where each one fans out to, and when. */
const fanCards = [
  { position: 'z-1 group-data-in-view/fan:-translate-x-[92%] group-data-in-view/fan:-rotate-13' },
  { position: 'z-1 delay-90 group-data-in-view/fan:-translate-x-[8%] group-data-in-view/fan:rotate-13' },
  { position: 'z-2 delay-180' },
];

type Service = { tag: string; label: string; description: string; src: string };

const services: Service[] = [
  {
    tag: 'Porsche Financial Services',
    label: 'A matter of perspective.',
    description:
      'Do some dreams seem far away? Individual instalments for your Targa – calculated transparently, without detours.',
    src: '/examples/media/pm-practical-finance.webp',
  },
  {
    tag: 'Porsche Insurance',
    label: 'What if?',
    description: 'You enjoy the here and now while we take care of everything around your insurance.',
    src: '/examples/media/pm-practical-insurance.webp',
  },
];

// ---------------------------------------------------------------------------------------------------------------------
// Page level components
// ---------------------------------------------------------------------------------------------------------------------

type GhostTitleProps = {
  id: string;
  lines: string[];
  /** The font size – a ghost title fills the width, so it scales with the viewport. */
  size?: string;
};

/** Giant section title fading from contrast-medium to transparent, which the content of its section overlaps. */
const GhostTitle = ({ id, lines, size = 'text-[clamp(3rem,12.5vw,18.75rem)]' }: GhostTitleProps) => (
  <h2
    id={id}
    class={`col-full justify-self-center text-center whitespace-nowrap font-normal leading-[1.05] bg-linear-to-b from-contrast-medium to-transparent bg-clip-text text-transparent pointer-events-none ${size}`}
  >
    {lines.map((line) => (
      <span key={line} class="block">
        {line}
      </span>
    ))}
  </h2>
);

// ---------------------------------------------------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Personalized mailing – the landing page a customer reaches from a mailing about their configured vehicle.
 *
 * The configured exterior colour is a single custom property on the main landmark: every brand coloured surface derives
 * from it, so the page can be generated for another colour by changing one value.
 */
const Page = () => (
  <TemplatePage meta={meta} class="scheme-dark bg-canvas">
    <main id="main" class="grid-template gap-y-0" style="--pm-config-color: #c4001a">
      {/* Hero: the full bleed video insets into a rounded card while the hero scrolls away. The page script writes
          the inset and the radius as custom properties of the frame, everything else is a utility. */}
      <section
        id="pm-hero"
        class="group/hero col-full grid grid-cols-subgrid grid-rows-[100svh] bg-surface"
        aria-labelledby="pm-hero-heading"
      >
        <div
          class={`col-full row-start-1 self-end h-2/5 bg-linear-to-b from-transparent via-(--pm-config-color) via-45% to-(--pm-config-color) delay-350 ${mountFade}`}
          aria-hidden="true"
        />

        <div
          id="pm-hero-frame"
          class={`col-full row-start-1 grid grid-cols-subgrid overflow-hidden [clip-path:inset(var(--pm-hero-inset,0)_round_var(--pm-hero-radius,0))] delay-350 ${mountFade}`}
        >
          <HeroVideo
            poster="/examples/media/pm-hero.webp"
            sources={[
              { src: '/examples/media/pm-hero.webm', type: 'video/webm' },
              { src: '/examples/media/pm-hero.mp4', type: 'video/mp4' },
            ]}
          >
            <div
              class="z-1 col-full row-span-full bg-linear-to-b from-black/35 via-transparent via-30% to-black/40 pointer-events-none"
              aria-hidden="true"
            />
            <div
              class={`z-1 col-extended row-span-full self-end flex flex-col items-center gap-fluid-sm pb-[calc(var(--spacing-fluid-xl)+var(--spacing-static-2xl))] text-center delay-600 ${mountFade}`}
            >
              <p-heading id="pm-hero-heading" tag="h1" size="2xl" align="center">
                Mr. Niessner, your 911 Targa.
              </p-heading>
              <p-text class="max-w-[60ch]" size="md" color="contrast-medium" align="center">
                Configured together with your Porsche Centre – tailored to your style, in Carmine Red. Your personal
                road movie, Mr. Niessner.
              </p-text>
            </div>
          </HeroVideo>
        </div>

        <div
          class={`z-2 col-full row-start-1 self-start justify-self-center pt-fluid-lg pointer-events-none ${mountFade}`}
        >
          <p-wordmark aria="{ 'aria-label': 'Porsche' }" />
        </div>

        <p-button-pure
          id="pm-scroll-next"
          class="fixed inset-x-0 bottom-fluid-md z-20 mx-auto w-fit"
          type="button"
          icon="arrow-down"
          hide-label="true"
          size="md"
        >
          Scroll down
        </p-button-pure>
      </section>

      {/* A new chapter: lead, configured car, engine sound and key figures on the configured colour. Its curved lower edge
          overlaps the highlights below, which is why it is lifted above them. */}
      <section
        class="relative z-1 col-full grid grid-cols-subgrid py-fluid-2xl rounded-b-4xl bg-(--pm-config-color)"
        aria-labelledby="pm-chapter-heading"
      >
        <div class="col-narrow flex flex-col items-center gap-fluid-lg text-center">
          <p-text class={`max-w-[70ch] ${reveal}`} data-reveal size="lg" align="center">
            Your 911 Targa in Carmine Red has arrived with us – a combination that shows attitude. Now the best part
            begins: the way to your Porsche. Take the next step and talk to your personal advisor.
          </p-text>

          <div class={`relative w-full ${reveal}`} data-reveal style={delay(1)}>
            <div
              class="absolute left-1/2 top-2/5 w-4/5 max-w-[900px] -translate-1/2 pointer-events-none"
              aria-hidden="true"
            >
              {/* With `size="inherit"` the signature has no width of its own, so it takes the one of the wrapper. */}
              <p-model-signature class="w-full" model="911" color="contrast-low" size="inherit" />
            </div>
            <img
              class="relative z-1 w-full"
              src="/examples/media/pm-chapter-car.webp"
              width="1600"
              height="900"
              alt="Your 911 Targa in Carmine Red, front view"
            />
          </div>

          <div class={`flex flex-col items-center gap-fluid-sm max-w-[70ch] ${reveal}`} data-reveal style={delay(2)}>
            <p-heading id="pm-chapter-heading" tag="h2" size="xl" align="center">
              A new chapter
            </p-heading>
            <p-text size="md" color="primary" align="center">
              Since 1963 the 911 has moved people – across generations. Your Targa continues this chapter. Some cars are
              admired. Yours will be remembered.
            </p-text>
          </div>

          {/* Engine sound: while it plays, the label crossfades into the waveform and the pill widens. The label stays in
              the flow and sizes the pill at rest; playing, the pill grows by a fixed amount past it – whatever the
              length, font or size of the label – and the waveform on top spreads across it. Without `calc-size()` the
              pill takes the width of the waveform instead, and never less than its label. */}
          <div
            id="pm-sound"
            class={`group/sound flex items-center gap-static-md rounded-full bg-frosted backdrop-blur-frosted py-static-xs ps-static-xs pe-static-md ${reveal}`}
            data-reveal
            style={delay(2)}
          >
            <p-button id="pm-sound-toggle" type="button" icon="play-filled" hide-label="true">
              Play engine sound
            </p-button>
            <div
              class={`relative flex h-7 items-center overflow-hidden [interpolate-size:allow-keywords] motion-safe:transition-[width] motion-safe:duration-lg motion-safe:ease-in-out group-data-playing/sound:w-${waveWidth} group-data-playing/sound:min-w-max supports-[width:calc-size(auto,size)]:group-data-playing/sound:w-[calc-size(auto,size_+_2.5rem)]`}
            >
              <p-text
                class="whitespace-nowrap motion-safe:transition-opacity motion-safe:duration-md motion-safe:ease-in-out group-data-playing/sound:opacity-0"
                size="sm"
              >
                Sports exhaust system
              </p-text>
              <div
                class="absolute inset-0 flex items-center justify-between opacity-0 motion-safe:transition-opacity motion-safe:duration-md motion-safe:ease-in-out group-data-playing/sound:opacity-100"
                aria-hidden="true"
              >
                {waveBars.map(({ height, delay: wait }, index) => (
                  <span
                    key={index}
                    class="w-0.75 shrink-0 rounded-full bg-primary scale-y-50 motion-safe:group-data-playing/sound:animate-sound-wave"
                    style={`height: ${height}px; animation-delay: ${wait}s`}
                  />
                ))}
              </div>
            </div>
            {/* biome-ignore lint/a11y/useMediaCaption: engine sound sample without spoken content */}
            <audio id="pm-sound-audio" src="/examples/media/pm-engine-sound.mp3" preload="none" />
          </div>

          <div
            id="pm-kpis"
            class={`grid w-full grid-cols-1 gap-fluid-lg sm:grid-cols-2 lg:grid-cols-3 ${reveal}`}
            data-reveal
            style={delay(3)}
          >
            {kpis.map(({ label, values }) => (
              <div
                key={label}
                class="flex flex-col items-center gap-static-xs text-center sm:last:col-span-2 lg:last:col-span-1"
              >
                <div class="flex items-baseline gap-static-xs">
                  {values.map(({ to, decimals = 0, unit }, index) => (
                    <Fragment key={unit}>
                      {index > 0 && <p-text size="3xl">/</p-text>}
                      <p-text size="3xl">
                        <span data-countup={to} data-decimals={decimals}>
                          {to.toFixed(decimals)}
                        </span>
                      </p-text>
                      <p-text size="sm" weight="semibold">
                        {unit}
                      </p-text>
                    </Fragment>
                  ))}
                </div>
                <p-text size="sm" color="primary" align="center">
                  {label}
                </p-text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights: carries the configured colour onward and sits behind the curved lower edge of the chapter. */}
      <section
        class="col-full grid grid-cols-subgrid gap-y-fluid-xl -mt-(--radius-4xl) pt-[calc(var(--radius-4xl)+var(--spacing-fluid-2xl))] pb-fluid-2xl bg-linear-to-b from-(--pm-config-color)/22 via-(--pm-config-color)/4 via-70% to-surface"
        aria-labelledby="pm-mosaic-heading"
      >
        <div class={`col-basic flex flex-col items-center gap-fluid-sm text-center ${reveal}`} data-reveal>
          <p-heading id="pm-mosaic-heading" tag="h2" size="xl" align="center">
            What makes your 911 Targa.
          </p-heading>
          <p-text class="max-w-[70ch]" size="md" color="contrast-high" align="center">
            The equipment you chose – a combination that exists in this form only once.
          </p-text>
        </div>

        <div class="col-extended grid grid-cols-1 gap-fluid-md md:grid-cols-2 md:grid-rows-2">
          {highlights.map(({ label, value, src, layout }, index) => (
            <div
              key={src}
              class={`relative isolate flex flex-col justify-end overflow-hidden rounded-3xl ${layout} ${reveal}`}
              data-reveal
              style={delay(index + 1)}
            >
              <img class="absolute inset-0 -z-1 size-full object-cover" src={src} alt="" loading="lazy" />
              <div class="flex flex-col gap-static-xs p-fluid-md">
                <p-text size="sm" color="contrast-high">
                  {label}
                </p-text>
                <p-text size="lg">{value}</p-text>
              </div>
            </div>
          ))}
        </div>

        <div class={`col-basic flex justify-center ${reveal}`} data-reveal style={delay(4)}>
          <p-link href="#">To the configurator</p-link>
        </div>
      </section>

      {/* Cross-sell: options other drivers chose, below a ghost title the lead overlaps. */}
      <section
        class="col-full grid grid-cols-subgrid gap-y-fluid-md pt-fluid-lg pb-fluid-2xl overflow-hidden bg-linear-to-b from-surface to-[color-mix(in_srgb,var(--pm-config-color)_45%,black)]"
        aria-labelledby="pm-crosssell-heading"
      >
        <GhostTitle id="pm-crosssell-heading" lines={['Extend', 'your dream.']} />

        <div class={`z-1 col-extended -mt-[6vw] ${reveal}`} data-reveal>
          <p-text class="max-w-md" size="lg" color="contrast-high">
            Options other drivers particularly value on the 911 Targa.
          </p-text>
        </div>

        <p-carousel
          class={`z-1 col-full ${reveal}`}
          data-reveal
          style={delay(1)}
          width="extended"
          slides-per-page="{ base: 1, s: 2 }"
          pagination="true"
          rewind={true}
          aria="{ 'aria-label': 'Recommended options' }"
        >
          {options.map(({ description, teaser, src }) => (
            <p-link-tile
              key={src}
              href="#"
              label="To the configurator"
              description={description}
              aspect-ratio="4/3"
              gradient={true}
            >
              <p-tag slot="header" variant="secondary" compact={true}>
                Popular
              </p-tag>
              <img src={src} alt="" loading="lazy" />
              <p-text slot="footer">{teaser}</p-text>
            </p-link-tile>
          ))}
        </p-carousel>
      </section>

      {/* Reviews: each play button opens its clip in the video modal at the end of the page. */}
      <section
        id="pm-voices"
        class="col-full grid grid-cols-subgrid gap-y-fluid-md py-fluid-2xl overflow-hidden bg-surface"
        aria-labelledby="pm-voices-heading"
      >
        <GhostTitle id="pm-voices-heading" lines={['Expert opinions', '& reviews.']} size="text-5xl" />

        <ul class="z-1 col-extended -mt-[3vw] grid gap-fluid-md md:grid-cols-2">
          {reviews.map(({ videoId, title, quote, source }, index) => (
            <li
              key={videoId}
              class={`flex items-center gap-fluid-md rounded-lg bg-frosted p-fluid-sm backdrop-blur-frosted ${reveal}`}
              data-reveal
              style={delay(index)}
            >
              <div class="relative isolate aspect-video shrink-0 basis-[clamp(7.5rem,38%,21.25rem)] overflow-hidden rounded-md">
                <img
                  class="absolute inset-0 size-full object-cover"
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                />
                <p-button
                  class="absolute top-1/2 left-1/2 -translate-1/2"
                  type="button"
                  icon="play-filled"
                  hide-label="true"
                  data-video-id={videoId}
                >
                  Play video: {title}
                </p-button>
              </div>
              <div class="flex flex-col gap-static-xs">
                <p-text size="md">“{quote}”</p-text>
                <p-text size="sm" color="contrast-medium">
                  {source}
                </p-text>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Sharing: a fan of share cards that spreads out once it enters the viewport. */}
      <section
        class="col-full grid grid-cols-subgrid gap-y-fluid-lg pt-fluid-lg pb-fluid-2xl overflow-hidden bg-surface"
        aria-labelledby="pm-share-heading"
      >
        <GhostTitle id="pm-share-heading" lines={['Joy that', 'is shared.']} />

        <div id="pm-fan" class="group/fan relative z-1 col-basic -mt-[10vw] h-[clamp(20rem,34vw,30rem)]">
          {fanCards.map(({ position }) => (
            <img
              key={position}
              class={`absolute left-1/2 top-1/2 w-[clamp(12rem,20vw,18rem)] rounded-lg shadow-high -translate-1/2 scale-90 opacity-0 motion-safe:transition motion-safe:duration-lg motion-safe:ease-in-out group-data-in-view/fan:scale-100 group-data-in-view/fan:opacity-100 ${position}`}
              src="/examples/media/pm-share-card.webp"
              alt=""
              loading="lazy"
            />
          ))}
        </div>

        <div class="col-basic flex flex-col items-center gap-fluid-lg">
          <p-text class={`max-w-[70ch] ${reveal}`} data-reveal size="lg" color="contrast-high" align="center">
            A 911 is a feeling – and anticipation grows when it is shared. Show your loved ones what you are looking
            forward to.
          </p-text>
          <p-button class={reveal} data-reveal style={delay(1)} type="button" icon="download">
            Save
          </p-button>
        </div>
      </section>

      <section
        class="col-full grid grid-cols-subgrid gap-y-fluid-lg py-fluid-2xl"
        aria-labelledby="pm-services-heading"
      >
        <p-heading
          id="pm-services-heading"
          class={`col-basic justify-self-center max-w-[42ch] ${reveal}`}
          data-reveal
          tag="h2"
          size="xl"
          align="center"
        >
          Useful things on your way to the 911.
        </p-heading>

        <div class="col-basic grid grid-cols-1 gap-fluid-md md:grid-cols-2">
          {services.map(({ tag, label, description, src }, index) => (
            <p-link-tile
              key={src}
              class={reveal}
              data-reveal
              style={delay(index)}
              href="#"
              label={label}
              description={description}
              aspect-ratio="{ base: '1/1', m: '3/4' }"
              gradient={true}
            >
              <p-tag slot="header" variant="secondary" compact={true}>
                {tag}
              </p-tag>
              <img src={src} alt="" loading="lazy" />
            </p-link-tile>
          ))}
        </div>
      </section>

      <section
        id="pm-contact"
        class="col-full grid grid-cols-subgrid pt-fluid-md pb-fluid-2xl"
        aria-labelledby="pm-contact-heading"
      >
        <div class={`col-basic flex flex-col items-center gap-fluid-lg text-center ${reveal}`} data-reveal>
          <img
            class="size-26 shrink-0 rounded-full object-cover object-[50%_28%]"
            src="/examples/media/pm-advisor.webp"
            alt="Scott Lee"
          />
          <div class="flex flex-col items-center gap-static-sm">
            <p-heading id="pm-contact-heading" tag="h2" size="xl" align="center">
              Mr. Niessner,
              <br />
              Scott Lee is here for you.
            </p-heading>
            <p-text size="sm" color="contrast-medium" align="center">
              Sales advisor · Porsche Centre Stuttgart
            </p-text>
            <div class="flex flex-wrap items-center justify-center gap-static-md">
              <p-link-pure icon="phone" size="sm" underline={true}>
                <a href="#">0711 99523991</a>
              </p-link-pure>
              <p-link-pure icon="email" size="sm" underline={true}>
                <a href="#">scott.lee@porsche-stuttgart.de</a>
              </p-link-pure>
            </div>
          </div>
          <p-text class="max-w-[60ch]" size="md" color="contrast-medium" align="center">
            From confirmation to key handover, your personal advisor accompanies you – directly, uncomplicated and with
            an open ear for every question about your 911 Targa.
          </p-text>
        </div>
      </section>

      <section
        class="col-extended justify-self-center w-full max-w-prose grid gap-fluid-md justify-items-center py-fluid-md"
        aria-label="Feedback"
      >
        <FeedbackForm restartable />
      </section>
    </main>

    <Footer />

    {/* Contact bar: slides in once the hero has scrolled away and steps aside while the contact section or the footer
        is on screen. Inert while it is out of view, so its links are no tab stops. */}
    <aside
      id="pm-contact-bar"
      class="fixed inset-x-0 bottom-0 z-50 flex justify-center px-fluid-md pb-fluid-md translate-y-[130%] opacity-0 pointer-events-none motion-safe:transition motion-safe:duration-lg motion-safe:ease-in-out data-shown:translate-y-0 data-shown:opacity-100 data-shown:pointer-events-auto"
      aria-label="Your sales advisor"
      inert
    >
      <div class="flex max-w-full items-center gap-static-sm rounded-full bg-frosted backdrop-blur-frosted py-static-sm ps-static-sm pe-static-md shadow-high">
        <img
          class="size-12 shrink-0 rounded-full object-cover object-[50%_28%]"
          src="/examples/media/pm-advisor.webp"
          alt=""
        />
        <div class="flex flex-col">
          <p-text size="sm" weight="semibold">
            Scott Lee
          </p-text>
          <p-text class="max-sm:hidden" size="xs" color="contrast-medium">
            Sales advisor · Porsche Centre Stuttgart
          </p-text>
        </div>
        <div class="ms-static-md flex items-center gap-static-xs">
          <p-link href="#" variant="secondary" icon="phone" hide-label="true" compact="true">
            Call Scott Lee
          </p-link>
          <p-link href="#" variant="secondary" icon="email" hide-label="true" compact="true">
            Email Scott Lee
          </p-link>
        </div>
      </div>
    </aside>

    {/* Video modal: the clip is loaded when it opens and unloaded when it closes, which stops its playback. The player
        has no width of its own, so the modal is given one – otherwise it would shrink to its minimum. */}
    <p-modal
      id="pm-video-modal"
      class="[--p-modal-width:min(960px,calc(100%-2rem))] [--p-modal-spacing-top:clamp(16px,6vh,80px)] [--p-modal-spacing-bottom:clamp(16px,6vh,80px)]"
      aria="{ 'aria-label': 'Play video' }"
    >
      <div class="-mt-(--ref-p-modal-pt) -mx-(--ref-p-modal-px) -mb-(--ref-p-modal-pb) aspect-video overflow-hidden bg-canvas">
        <iframe
          id="pm-video-iframe"
          class="size-full border-0"
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </p-modal>

    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the hero: fades it in, insets the video frame while it scrolls away and fades the scroll hint.

      const hero = document.getElementById('pm-hero');
      const heroFrame = document.getElementById('pm-hero-frame');
      const scrollNext = document.getElementById('pm-scroll-next');
      const heroReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const clamp01 = (value) => Math.min(1, Math.max(0, value));
      const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

      let heroFrameRequest = 0;

      const updateHero = () => {
        const progress = clamp01(-hero.getBoundingClientRect().top / (window.innerHeight * 0.85));
        const eased = heroReducedMotion ? 0 : easeInOut(progress);

        heroFrame.style.setProperty('--pm-hero-inset', eased * 6 + 'vh ' + eased * 6 + 'vw');
        heroFrame.style.setProperty('--pm-hero-radius', eased * 1.5 + 'rem');

        const hintOpacity = clamp01(1 - progress * 2.5);
        scrollNext.style.opacity = String(hintOpacity);
        scrollNext.inert = hintOpacity === 0;
      };

      window.addEventListener('scroll', () => {
        cancelAnimationFrame(heroFrameRequest);
        heroFrameRequest = requestAnimationFrame(updateHero);
      }, { passive: true });
      window.addEventListener('resize', updateHero);

      scrollNext.addEventListener('click', () => {
        window.scrollBy({ top: window.innerHeight * 0.9, behavior: heroReducedMotion ? 'auto' : 'smooth' });
      });

      updateHero();
      requestAnimationFrame(() => {
        hero.dataset.mounted = '';
      });
    `
    }</Script>

    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the reveal on scroll: every marked element plays its entrance once it enters the viewport.

      const revealObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.dataset.revealed = '';
          observer.unobserve(entry.target);
        }
      });

      for (const element of document.querySelectorAll('[data-reveal]')) {
        revealObserver.observe(element);
      }
    `
    }</Script>

    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the key figures: they count up from zero once they enter the viewport.

      const kpiGrid = document.getElementById('pm-kpis');
      const countUps = [...kpiGrid.querySelectorAll('[data-countup]')];

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        for (const element of countUps) {
          element.textContent = (0).toFixed(Number(element.dataset.decimals));
        }

        const countUpObserver = new IntersectionObserver((entries, observer) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();

          for (const element of countUps) {
            const target = Number(element.dataset.countup);
            const decimals = Number(element.dataset.decimals);
            let start;

            const tick = (time) => {
              start ??= time;
              const progress = Math.min(1, (time - start) / 1400);
              element.textContent = (target * (1 - (1 - progress) ** 3)).toFixed(decimals);
              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
          }
        }, { threshold: 0.4 });

        countUpObserver.observe(kpiGrid);
      }
    `
    }</Script>

    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the engine sound: plays and pauses the sample and follows its actual state.

      const soundPlayer = document.getElementById('pm-sound');
      const soundToggle = document.getElementById('pm-sound-toggle');
      const soundAudio = document.getElementById('pm-sound-audio');

      const syncSoundPlayer = () => {
        const playing = !soundAudio.paused;
        soundPlayer.toggleAttribute('data-playing', playing);
        soundToggle.icon = playing ? 'pause' : 'play-filled';
        soundToggle.textContent = playing ? 'Pause engine sound' : 'Play engine sound';
      };

      soundToggle.addEventListener('click', () => {
        if (soundAudio.paused) {
          soundAudio.play();
        } else {
          soundAudio.pause();
        }
      });

      for (const type of ['play', 'pause', 'ended']) {
        soundAudio.addEventListener(type, syncSoundPlayer);
      }
    `
    }</Script>

    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the share cards: they fan out once they enter the viewport – right away without motion.

      const fan = document.getElementById('pm-fan');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        fan.dataset.inView = '';
      } else {
        const fanObserver = new IntersectionObserver((entries, observer) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          fan.dataset.inView = '';
          observer.disconnect();
        }, { threshold: 0.15 });

        fanObserver.observe(fan);
      }
    `
    }</Script>

    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the reviews: a play button opens its clip in the modal, closing the modal unloads the player.

      const videoModal = document.getElementById('pm-video-modal');
      const videoFrame = document.getElementById('pm-video-iframe');

      for (const button of document.getElementById('pm-voices').querySelectorAll('[data-video-id]')) {
        button.addEventListener('click', () => {
          videoFrame.src = 'https://www.youtube-nocookie.com/embed/' + button.dataset.videoId + '?autoplay=1&rel=0';
          videoModal.open = true;
        });
      }

      videoModal.addEventListener('dismiss', () => {
        videoModal.open = false;
        videoFrame.removeAttribute('src');
      });
    `
    }</Script>

    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the contact bar: shown once the hero has scrolled away, unless the contact section or the footer
      // is on screen.

      const contactBar = document.getElementById('pm-contact-bar');
      const contactSection = document.getElementById('pm-contact');
      const pageFooter = document.querySelector('footer');
      const coveringSections = new Set();

      const syncContactBar = () => {
        const shown = window.scrollY > window.innerHeight * 0.7 && coveringSections.size === 0;
        contactBar.toggleAttribute('data-shown', shown);
        contactBar.inert = !shown;
      };

      const contactBarObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            coveringSections.add(entry.target);
          } else {
            coveringSections.delete(entry.target);
          }
        }
        syncContactBar();
      });

      contactBarObserver.observe(contactSection);
      contactBarObserver.observe(pageFooter);
      window.addEventListener('scroll', syncContactBar, { passive: true });
      syncContactBar();
    `
    }</Script>
  </TemplatePage>
);

export default Page;
