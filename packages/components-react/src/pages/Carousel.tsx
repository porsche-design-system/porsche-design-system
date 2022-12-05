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
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

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

      <div className="playground light" title="should render carousel with slotted heading and description on light background">
        <PCarousel description="Prop description">
          <h2 slot="heading">Slotted heading</h2>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground dark" title="should render carousel with slotted heading and description on dark background">
        <PCarousel description="Prop description" theme="dark">
          <h2 slot="heading">Slotted heading</h2>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with slotted heading and slotted description on light background"
      >
        <PCarousel>
          <h2 slot="heading">Slotted heading</h2>
          <p slot="description">Slotted description</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground dark"
        title="should render carousel with slotted heading and slotted description on dark background"
      >
        <PCarousel theme="dark">
          <h2 slot="heading">Slotted heading</h2>
          <p slot="description">Slotted description</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with rewind=false on light background">
        <PCarousel heading="Heading without rewind" rewind={false}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground dark" title="should render carousel with rewind=false on dark background">
        <PCarousel heading="Heading without rewind" rewind={false} theme="dark">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with wrapped content and description on light background">
        <PCarousel heading="Wrapped content heading" description="Description" wrapContent={true}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with wrapped slotted heading and slotted description on light background"
      >
        <PCarousel wrapContent={true}>
          <h2 slot="heading">Wrapped content slotted heading</h2>
          <p slot="description">Description</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with multiline heading on light background">
        <PCarousel
          heading="Multiline heading could be quite long especially on smaller screens but it wraps luckily. Let us see if the alignment with prev/next buttons is correct."
        >
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with multiline heading and multiline description on light background"
      >
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
        title="should render carousel with slotted multiline heading and multiline description on light background"
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

      <div className="playground light" title="should render carousel with slidesPerPage=2 on light background">
        <PCarousel heading="Slides per page: 2" slidesPerPage={2}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=3 on light background">
        <PCarousel heading="Slides per page: 3" slidesPerPage={3}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=4 on light background">
        <PCarousel heading="Slides per page: 4" slidesPerPage={4}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=5 on light background">
        <PCarousel heading="Slides per page: 5" slidesPerPage={5}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with responsive slidesPerPage on light background">
        <PCarousel heading="Responsive slides per page" slidesPerPage={{base: 2, s: 3, m: 4, l: 5, xl: 6}}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with disablePagination on light background">
        <PCarousel heading="Disabled pagination" disablePagination={true}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with responsive disablePagination on light background">
        <PCarousel heading="Responsive disabled pagination" disablePagination={{base: false, m: true}}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>
    </>
  );
};
