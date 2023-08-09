/* Auto Generated File */
import type { NextPage } from 'next';
import { PHeading, PModal, PText } from '@porsche-design-system/components-react/ssr';

const ModalPage: NextPage = (): JSX.Element => {
  const style = `
    body {
      overflow: auto !important;
      background: deeppink;
    }

    .playground {
      height: 600px;
      padding: 0;
      background: linear-gradient(
        90deg,
        rgba(20, 84, 255, 0) 0%,
        rgba(20, 84, 255, 1) 50%,
        rgba(20, 84, 255, 0) 100%
      ) !important;
      transform: translate3d(0, 0, 0);
    }
    .playground {
      margin: 16px 0;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should show modal">
        <PModal heading="Heading" open={true}>Some Content: should show modal</PModal>
      </div>

      <div className="playground light" title="should show modal (fullscreen=true)">
        <PModal heading="Heading" open={true} fullscreen={true}> Some content: should show modal (fullscreen=true) </PModal>
      </div>

      <div className="playground light" title="should display a full width div when using .stretch-to-full-modal-width">
        <PModal open={true} aria={{ 'aria-label': 'Some Heading' }}>
          <div className="stretch-to-full-modal-width" style={{ background: 'deeppink', height: '60px' }} />
          <PText>Some Content: should display a full width div when using .stretch-to-full-modal-width</PText>
          <div className="stretch-to-full-modal-width" style={{ background: 'deeppink', height: '60px' }} />
        </PModal>
      </div>

      <div className="playground light" title="should show modal (fullscreen=responsive)">
        <PModal
          heading="Heading"
          open={true}
          fullscreen={{ base: true, xs: false, s: true, m: false, l: true, xl: false, xxl: true }}
        >
          Some Content: should show modal (fullscreen=responsive)
        </PModal>
      </div>

      <div className="playground light" title="should display close button on the correct position without a heading">
        <PModal open={true} aria={{ 'aria-label': 'Some Heading' }}>
          Some Content: should display close button on the correct position without a heading
        </PModal>
      </div>

      <div className="playground light" title="should show scrollable modal">
        <PModal heading="Heading" open={true}>
          Some content: should show scrollable modal
          <br />
          <br />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
          eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
          dolor sit amet.
          <br />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
          eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
          dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet.
          <br />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
          eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
          dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet.
          <br />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
          eos et accusam.
        </PModal>
      </div>

      <div className="playground light" title="should show modal with slotted heading">
        <PModal open={true} aria={{ 'aria-label': 'Slotted Headline' }}>
          <div slot="heading">
            <PText tag="div" role="doc-subtitle">Slotted Subtitle</PText>
            <PHeading tag="h2">Slotted heading</PHeading>
          </div>
          <span>
            Some Content: should show modal with slotted heading
            <br />
            <br />
            And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PModal>
      </div>

      <div className="playground light" title="should show modal with disableCloseButton=true">
        <PModal open={true} heading="disableCloseButton=true" disableCloseButton={true}>
          Some Content: should show modal with disableCloseButton=true
        </PModal>
      </div>

      <div className="playground light" title="should show modal with dismissButton=false">
        <PModal open={true} heading="dismissButton=false" dismissButton={false}>
          Some Content: should show modal with dismissButton=false
        </PModal>
      </div>

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
    </>
  );
};

export default ModalPage;
