import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Support',
  description:
    'A support tile offers the ways to reach a person, e.g. at the end of a service page of porsche.com. A mood image fills the whole tile, and in front of it three smaller tiles each open one of the ways. The small tiles take a frosted background, which the image shines through, so they read as part of the image rather than as a panel laid over it.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a tile holding three smaller ones, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        The tile is no link of its own: it holds three, and a link may not contain another. Its heading introduces them
        rather than naming a destination.
      </Comment>
      <Comment>{tileComments.darkScheme}</Comment>
      <Comment>
        The tile does not clip, so the focus indicators of the links inside it stay whole. The image clips itself
        instead.
      </Comment>
      <div class="col-extended relative isolate grid aspect-video rounded-3xl scheme-only-dark">
        <div class="absolute inset-0 -z-1 overflow-clip rounded-[inherit]">
          <Comment>Decorative, it sets the mood and carries no information the text does not give.</Comment>
          <img
            class="size-full object-cover"
            src="/examples/media/macan-with-owner.webp"
            alt=""
            width="1310"
            height="737"
          />
        </div>

        <Comment>{tileComments.gradient}</Comment>
        <div class="self-end flex flex-col items-center gap-fluid-md px-fluid-lg pt-fluid-2xl pb-fluid-lg rounded-b-[inherit] bg-fade-to-t">
          <div class="flex flex-col items-center gap-static-sm text-center">
            <p-heading tag="h2" size="xl" align="center">
              Need further help?
            </p-heading>
            <p-text align="center" color="contrast-medium">
              If you require further guidance, we can assist you in finding the right solution.
            </p-text>
          </div>

          <Comment>
            A list, so that how many ways there are is announced before the first of them is read, and so that they can
            be stepped through as a set.
          </Comment>
          <Comment>
            One below the other until the large breakpoint, where three of them still leave each one room for a line of
            text.
          </Comment>
          <ul class="grid w-full grid-cols-1 gap-fluid-md lg:grid-cols-3">
            <Comment>{tileComments.coverTile}</Comment>
            <Comment>
              The frosted background lets the image through and blurs what lies behind it, which keeps the text legible
              without hiding the photograph.
            </Comment>
            <Comment>
              Beside the text while the tile is wide enough for both, and above it once that would leave a few words per
              line. What decides is the width of the tile rather than the one of the window, since three of them share a
              row.
            </Comment>
            <li class="@container relative isolate rounded-2xl bg-frosted backdrop-blur-frosted p-fluid-md motion-safe:transition-colors duration-sm ease-in-out hover:bg-frosted-soft [--p-link-cover-radius:var(--radius-2xl)]">
              <div class="flex flex-col gap-static-md @2xs:flex-row-reverse @2xs:items-center">
                <Comment>{tileComments.coverLink}</Comment>
                <p-link
                  class="self-end @2xs:self-auto"
                  variant="secondary"
                  icon="arrow-up-right"
                  hide-label="true"
                  compact="true"
                  cover={true}
                >
                  <a href="#">Contact Porsche</a>
                </p-link>
                <div class="flex grow flex-col gap-static-xs">
                  <p-heading tag="h3" size="sm">
                    Contact Porsche
                  </p-heading>
                  <p-text size="xs" color="contrast-medium">
                    Personal support for questions about your Porsche.
                  </p-text>
                </div>
              </div>
            </li>

            <Comment>{tileComments.coverTile}</Comment>
            <li class="@container relative isolate rounded-2xl bg-frosted backdrop-blur-frosted p-fluid-md motion-safe:transition-colors duration-sm ease-in-out hover:bg-frosted-soft [--p-link-cover-radius:var(--radius-2xl)]">
              <div class="flex flex-col gap-static-md @2xs:flex-row-reverse @2xs:items-center">
                <Comment>{tileComments.coverLink}</Comment>
                <p-link
                  class="self-end @2xs:self-auto"
                  variant="secondary"
                  icon="arrow-up-right"
                  hide-label="true"
                  compact="true"
                  cover={true}
                >
                  <a href="#">Find your Dealer</a>
                </p-link>
                <div class="flex grow flex-col gap-static-xs">
                  <p-heading tag="h3" size="sm">
                    Find your Dealer
                  </p-heading>
                  <p-text size="xs" color="contrast-medium">
                    Your nearest Porsche Centre for advice and service.
                  </p-text>
                </div>
              </div>
            </li>

            <Comment>{tileComments.coverTile}</Comment>
            <li class="@container relative isolate rounded-2xl bg-frosted backdrop-blur-frosted p-fluid-md motion-safe:transition-colors duration-sm ease-in-out hover:bg-frosted-soft [--p-link-cover-radius:var(--radius-2xl)]">
              <div class="flex flex-col gap-static-md @2xs:flex-row-reverse @2xs:items-center">
                <Comment>{tileComments.coverLink}</Comment>
                <p-link
                  class="self-end @2xs:self-auto"
                  variant="secondary"
                  icon="arrow-up-right"
                  hide-label="true"
                  compact="true"
                  cover={true}
                >
                  <a href="#">Call Roadside Assistance</a>
                </p-link>
                <div class="flex grow flex-col gap-static-xs">
                  <p-heading tag="h3" size="sm">
                    Call Roadside Assistance
                  </p-heading>
                  <p-text size="xs" color="contrast-medium">
                    Immediate help when your Porsche breaks down.
                  </p-text>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
