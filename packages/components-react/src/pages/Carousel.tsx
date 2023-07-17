/* Auto Generated File */
import { PCarousel } from '@porsche-design-system/components-react';

export const CarouselPage = (): JSX.Element => {
  const style = `
    p-carousel div {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #00b0f4;
      height: 100px;
    }
    .playground {
      padding: 1rem 0;
    }
    .change-border-radius {
      --p-carousel-border-radius: 4px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="visualize-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="playground light" title="should render carousel on light background">
        <PCarousel heading="Heading">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground dark" title="should render carousel on dark background">
        <PCarousel heading="Heading" theme="dark">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with description on light background">
        <PCarousel heading="Heading" description="Description">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground dark" title="should render carousel with description on dark background">
        <PCarousel heading="Heading" description="Description" theme="dark">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slotted heading on light background">
        <PCarousel>
          <h2 slot="heading">Slotted heading</h2>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground dark" title="should render carousel with slotted heading on dark background">
        <PCarousel theme="dark">
          <h2 slot="heading">Slotted heading</h2>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with slotted heading and slotted description with slotted and deeply nested anchor on light background"
      >
        <PCarousel>
          <h2 slot="heading">Slotted heading</h2>
          <p slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground dark"
        title="should render carousel with slotted heading and slotted description with slotted and deeply nested anchor on dark background"
      >
        <PCarousel theme="dark">
          <h2 slot="heading">Slotted heading</h2>
          <p slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with align-header=center, heading and description on light background"
      >
        <PCarousel
          heading="Heading (align-header=center)"
          description="Description (align-header=center)"
          alignHeader="center"
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with align-header=center, slotted heading and slotted description on light background"
      >
        <PCarousel alignHeader="center">
          <h2 slot="heading">Slotted heading (align-header=center)</h2>
          <p slot="description">Slotted description (align-header=center)</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with multiline heading">
        <PCarousel
          heading="Multiline heading could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with multiline heading and multiline description">
        <PCarousel
          heading="Multiline heading could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
          description="Multiline description could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with multiline slotted heading and multiline slotted description"
      >
        <PCarousel>
          <h2 slot="heading">
            Multiline slotted heading could be quite long especially on smaller screens but it wraps luckily. Let us see if
            the alignment with prev/next buttons is correct.
          </h2>
          <p slot="description">
            Multiline slotted description could be quite long especially on smaller screens but it wraps luckily. Let us see
            if the alignment with prev/next buttons is correct.
          </p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with align-header=center and multiline heading">
        <PCarousel
          alignHeader="center"
          heading="Multiline heading (align-header=center) could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with align-header=center, multiline heading and multiline description"
      >
        <PCarousel
          alignHeader="center"
          heading="Multiline heading (align-header=center) could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
          description="Multiline description (align-header=center) could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with align-header=center, multiline slotted heading and multiline slotted description"
      >
        <PCarousel alignHeader="center">
          <h2 slot="heading">
            Multiline slotted heading (align-header=center) could be quite long especially on smaller screens but it wraps
            luckily. Let us see if the alignment with prev/next buttons is correct.
          </h2>
          <p slot="description">
            Multiline slotted description (align-header=center) could be quite long especially on smaller screens but it wraps
            luckily. Let us see if the alignment with prev/next buttons is correct.
          </p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with width=extended, heading and description on light background"
      >
        <PCarousel heading="Heading (width=extended)" description="Description (width=extended)" width="extended">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with width=extended, slotted heading and slotted description on light background"
      >
        <PCarousel width="extended">
          <h2 slot="heading">Slotted heading (width=extended)</h2>
          <p slot="description">Slotted description (width=extended)</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with width=extended, multiline heading and multiline description"
      >
        <PCarousel
          width="extended"
          heading="Multiline heading (width=extended) could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
          description="Multiline description (width=extended) could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with width=extended, align-header=center multiline heading and multiline description"
      >
        <PCarousel
          width="extended"
          alignHeader="center"
          heading="Multiline heading (width=extended, align-header=center) could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
          description="Multiline description (width=extended, align-header=center) could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=2">
        <PCarousel heading="Slides per page: 2" slidesPerPage={2}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=3">
        <PCarousel heading="Slides per page: 3" slidesPerPage={3}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=4">
        <PCarousel heading="Slides per page: 4" slidesPerPage={4}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=5">
        <PCarousel heading="Slides per page: 5" slidesPerPage={5}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with responsive slidesPerPage">
        <PCarousel
          heading="Responsive slides per page: {base: 2, s: 3, m: 4, l: 5, xl: 6}"
          slidesPerPage={{base: 2, s: 3, m: 4, l: 5, xl: 6}}
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=auto">
        <PCarousel heading="slidesPerPage=auto" slidesPerPage="auto">
          <div style={{ width: '10vw' }}>Slide 1 10vw</div>
          <div style={{ width: '200px' }}>Slide 2 200px</div>
          <div style={{ width: '100px' }}>Slide 3 100px</div>
          <div style={{ width: '40vw' }}>Slide 4 40vw</div>
          <div style={{ width: '150px' }}>Slide 5 150px</div>
          <div style={{ width: '50vw' }}>Slide 6 50vw</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with disablePagination=true">
        <PCarousel heading="disablePagination=true" disablePagination={true}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>
      <div className="playground light" title="should render carousel with pagination=false">
        <PCarousel heading="pagination=false" pagination={false}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with responsive disablePagination">
        <PCarousel heading="disablePagination={base: false, m: true}" disablePagination={{base: false, m: true}}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>
      <div className="playground light" title="should render carousel with responsive pagination">
        <PCarousel heading="pagination={base: true, m: false}" pagination={{base: true, m: false}}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with rewind=false on light background">
        <PCarousel heading="rewind=false" rewind={false}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground dark" title="should render carousel with rewind=false on dark background">
        <PCarousel heading="rewind=false" rewind={false} theme="dark">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with custom background-color (also above 2560px)">
        <PCarousel heading="Heading" style={{ background: 'deeppink' }}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with infinite pagination with active slide at the start">
        <PCarousel heading="Infinite pagination start">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with infinite pagination with active slide in the middle">
        <PCarousel heading="Infinite pagination middle" activeSlideIndex={4}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
          <div>Slide 7</div>
        </PCarousel>
      </div>

      <div
        className="playground dark"
        title="should render carousel with infinite pagination with active slide in the middle on dark background"
      >
        <PCarousel heading="Infinite pagination middle" activeSlideIndex={4} theme="dark">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
          <div>Slide 7</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with infinite pagination with active slide at the end">
        <PCarousel heading="Infinite pagination end" activeSlideIndex={5}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel on light background with custom border-radius">
        <PCarousel heading="Slides with custom border radius" className="change-border-radius">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>
    </>
  );
};
