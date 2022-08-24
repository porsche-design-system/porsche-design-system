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

      <div className="playground light" title="should render carousel with slotted subheading on light background">
        <PCarousel heading="Heading">
          <p slot="subheading">Slotted subheading</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground dark" title="should render carousel with slotted subheading on dark background">
        <PCarousel heading="Heading" theme="dark">
          <p slot="subheading">Slotted subheading</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with wrapped heading and slotted subheading on light background"
      >
        <PCarousel heading="Wrapped heading" wrapHeading={true}>
          <p slot="subheading">Slotted subheading</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div
        className="playground light"
        title="should render carousel with wrapped slotted heading and slotted subheading on light background"
      >
        <PCarousel wrapHeading={true}>
          <h2 slot="heading">Wrapped slotted heading</h2>
          <p slot="subheading">Slotted subheading</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with multiline heading and subheading on light background">
        <PCarousel heading="Multiline heading could be quite long especially on smaller screens but it wraps luckily">
          <p slot="subheading">Multiline subheading could be quite long especially on smaller screens but it wraps luckily</p>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=2 light background">
        <PCarousel heading="Slides per page: 2" slidesPerPage={2}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=3 light background">
        <PCarousel heading="Slides per page: 3" slidesPerPage={3}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=4 light background">
        <PCarousel heading="Slides per page: 4" slidesPerPage={4}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
          <div>Slide 6</div>
        </PCarousel>
      </div>

      <div className="playground light" title="should render carousel with slidesPerPage=5 light background">
        <PCarousel heading="Slides per page: 5" slidesPerPage={4}>
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

      <div
        className="playground light"
        title="should render carousel with overflowVisible on light background"
        style={{ padding: '0 5vw', overflowX: 'hidden' }}
      >
        <PCarousel heading="Overflow Visible" overflowVisible={true}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>
    </>
  );
};
