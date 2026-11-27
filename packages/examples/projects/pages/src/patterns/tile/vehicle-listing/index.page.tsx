import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { VehicleListingTile } from '../../../_partials/tile/VehicleListingTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Vehicle Listing',
  description:
    'A vehicle listing presents a single vehicle in a search result, e.g. of the Porsche Finder, with the vehicle cut out above its details. The tile adapts its height to the content. It carries several controls of its own – a popover explaining the price, a link to the technical data and the two actions, one below the other – so it is no link as a whole: a link covering the tile would lie over all of them.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a vehicle of a search result, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} background="surface" centered>
    <main id="main" class="grid-template py-fluid-lg">
      <VehicleListingTile
        class="col-basic justify-self-center w-full max-w-[460px]"
        model="718 Cayman GTS 4.0"
        price="From €103,500.00 incl. VAT"
        financing="e.g. €1,256.94 / month"
        priceInfo="The price includes VAT and country-specific equipment. The rate is an example and depends on the term, the deposit and the final instalment."
        year="2027"
        properties={['Petrol', 'Rear-wheel drive', 'Manual']}
        figures={[
          { value: '4.5 s', term: 'Acceleration 0 - 100 km/h with Launch Control' },
          { value: '294 kW / 400 PS', term: 'Power up to (kW) / Power up to (PS)' },
          { value: '293 km/h', term: 'Top speed' },
          { value: '10.9 l/100 km', term: 'Fuel consumption combined (WLTP)' },
        ]}
        consumption="Fuel consumption combined (WLTP): 10.9 l/100 km, CO₂ emissions combined (WLTP): 247 g/km, CO₂ class: G"
        image={{ src: '/examples/media/718-gt4-rs-side-view.webp', width: 1000, height: 313 }}
        links={{ technicalData: '#', discover: '#', configure: '#' }}
      />
    </main>
  </PatternPage>
);

export default Page;
