export const TailwindcssGrid = () => {
  return (
    <div style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
      <div className="grid-template fixed inset-0 pointer-events-none">
        <span className="bg-[rgba(125,0,255,0.1)]" />
        <span className="bg-[rgba(0,0,255,0.1)]" />
        <span className="bg-[rgba(0,0,255,0.1)]" />
        <span className="bg-[rgba(0,0,255,0.1)]" />
        <span className="bg-[rgba(0,0,255,0.1)]" />
        <span className="bg-[rgba(0,0,255,0.1)]" />
        <span className="bg-[rgba(0,0,255,0.1)]" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:bg-[rgba(125,0,255,0.1)]" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
        <span className="bg-[rgba(125,0,255,0.1)] max-sm:hidden" />
      </div>

      <div className="grid-template items-end">
        <div className="col-full row-1 bg-[rgba(0,0,255,0.25)] h-[clamp(300px,50vh,500px)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover ms-static-sm mt-static-sm">
            <b>Full</b> for Background and Media
          </span>
        </div>
        <div className="col-wide row-1 pb-fluid-md flex flex-col justify-end bg-[rgba(0,255,0,0.25)]">
          <h1 className="prose-display-lg">Hero Heading</h1>
          <p className="prose-text-lg mt-fluid-xs">Subline for the Hero Header in Wide Grid</p>
        </div>
      </div>

      <div className="grid-template mt-fluid-lg">
        <div className="col-wide sm:col-start-wide sm:col-span-5 p-fluid-md rounded-lg bg-[rgba(255,125,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Wide Sidebar</b>
          </span>
        </div>
        <div className="col-wide sm:col-span-11 sm:col-end-wide p-fluid-md rounded-lg bg-[rgba(255,125,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Wide Content</b>
          </span>
        </div>
      </div>

      <div className="grid-template mt-fluid-lg">
        <div className="col-start-extended col-span-one-half p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids
          </span>
        </div>
        <div className="col-end-extended col-span-one-half p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids
          </span>
        </div>
      </div>

      <div className="grid-template mt-fluid-md">
        <div className="col-extended sm:col-start-extended sm:col-span-8 sm:row-span-2 p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Custom (column desktop: 2-9)</b> for Image Grids
          </span>
        </div>
        <div className="col-start-extended col-span-one-half sm:col-span-6 sm:col-end-extended p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Custom (column desktop: 10-15)</b> for Image Grids
          </span>
        </div>
        <div className="col-span-one-half col-end-extended sm:col-span-5 sm:col-end-basic p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Custom (column desktop: 10-14)</b> for Image Grids
          </span>
        </div>
      </div>

      <div className="grid-template mt-fluid-lg">
        <div className="col-full row-1 bg-[rgba(0,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover ms-static-sm mt-static-sm">
            <b>Full</b> for Teaser Backgrounds and Media (Former Basic)
          </span>
        </div>
        <div className="col-basic row-1 my-fluid-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic</b> for Content in Teaser
          </span>
          <h2 className="prose-heading-xl">Heading in Teaser</h2>
          <p className="prose-text-sm mt-fluid-xs">Subline or Copy Text in Large Teaser</p>
        </div>
      </div>

      <div className="grid-template mt-fluid-lg">
        <div className="col-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic</b> for Content Tiles
          </span>
          <h3 className="prose-heading-lg">Heading in Tile</h3>
        </div>
        <div className="col-start-basic col-span-one-half p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic Half</b> for Content Tiles
          </span>
          <h3 className="prose-heading-lg">Heading in Tile</h3>
        </div>
        <div className="col-span-one-half col-end-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic Half</b> for Content Tiles
          </span>
          <h3 className="prose-heading-lg">Heading in Tile</h3>
        </div>
        <div className="col-basic sm:col-start-basic sm:col-span-one-third p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic Third</b> for Content Tiles
          </span>
          <h3 className="prose-heading-lg">Heading in Tile</h3>
        </div>
        <div className="col-basic sm:col-span-one-third p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic Third</b> for Content Tiles
          </span>
          <h3 className="prose-heading-lg">Heading in Tile</h3>
        </div>
        <div className="col-basic sm:col-span-one-third sm:col-end-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic Third</b> for Content Tiles
          </span>
          <h3 className="prose-heading-lg">Heading in Tile</h3>
        </div>
        <div className="col-basic sm:col-start-basic sm:col-span-two-thirds p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic Two Thirds</b> for Content Tiles
          </span>
        </div>
        <div className="col-basic sm:col-span-one-third sm:col-end-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Basic One Third</b> for Content Tiles
          </span>
        </div>
        <div className="col-basic sm:col-start-basic sm:col-span-5 p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Custom (desktop: column 3-7)</b> for Content
          </span>
        </div>
        <div className="col-basic sm:col-span-6 sm:col-end-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Custom (desktop: column 9-14)</b> for Content
          </span>
        </div>
      </div>

      <div className="grid-template mt-fluid-lg">
        <div className="col-narrow rounded-lg bg-[rgba(255,255,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover ms-static-sm mt-static-sm">
            <b>Narrow</b> for small Components and Content
          </span>
        </div>
        <div className="col-start-narrow col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,255,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Narrow</b> Half for small Content Tiles
          </span>
          <h3 className="prose-heading-lg">Experience</h3>
          <p className="prose-text-sm mt-fluid-xs">
            Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
            to your wishes.
          </p>
        </div>
        <div className="col-span-one-half col-end-narrow p-fluid-sm rounded-lg bg-[rgba(255,255,0,0.25)]">
          <span className="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
            <b>Narrow</b> Half for small Content Tiles
          </span>
          <h3 className="prose-heading-lg">Experience</h3>
          <p className="prose-text-sm mt-fluid-xs">
            Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
            to your wishes.
          </p>
        </div>
      </div>
    </div>
  );
};
