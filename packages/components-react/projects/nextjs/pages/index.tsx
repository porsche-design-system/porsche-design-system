import type { NextPage } from 'next';
import { PHeadline } from '@porsche-design-system/components-react/ssr';
import { routes } from '../routes';
import Link from 'next/link';

const HomePage: NextPage = (): JSX.Element => {
  return (
    <>
      <PHeadline>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </PHeadline>

      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>
              <a>{route.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;

/* Auto Generated Below */

export const generatedRoutes = {"accordion":{"path":"./accordion","name":"Accordion"},"banner":{"path":"./banner","name":"Banner"},"button":{"path":"./button","name":"Button"},"buttonGroup":{"path":"./button-group","name":"ButtonGroup"},"buttonPure":{"path":"./button-pure","name":"ButtonPure"},"carousel":{"path":"./carousel","name":"Carousel"},"checkboxWrapper":{"path":"./checkbox-wrapper","name":"CheckboxWrapper"},"contentWrapper":{"path":"./content-wrapper","name":"ContentWrapper"},"coreInitializer":{"path":"./core-initializer","name":"CoreInitializer"},"divider":{"path":"./divider","name":"Divider"},"fieldsetWrapper":{"path":"./fieldset-wrapper","name":"FieldsetWrapper"},"flex":{"path":"./flex","name":"Flex"},"grid":{"path":"./grid","name":"Grid"},"headline":{"path":"./headline","name":"Headline"},"icon":{"path":"./icon","name":"Icon"},"inlineNotification":{"path":"./inline-notification","name":"InlineNotification"},"link":{"path":"./link","name":"Link"},"linkPure":{"path":"./link-pure","name":"LinkPure"},"linkSocial":{"path":"./link-social","name":"LinkSocial"},"linkTile":{"path":"./link-tile","name":"LinkTile"},"marque":{"path":"./marque","name":"Marque"},"modalBasic":{"path":"./modal-basic","name":"ModalBasic"},"modalFullWidthSlot":{"path":"./modal-full-width-slot","name":"ModalFullWidthSlot"},"modalFullscreen":{"path":"./modal-fullscreen","name":"ModalFullscreen"},"modalFullscreenBreakpoint":{"path":"./modal-fullscreen-breakpoint","name":"ModalFullscreenBreakpoint"},"modalNoHeading":{"path":"./modal-no-heading","name":"ModalNoHeading"},"modalPrefixed":{"path":"./modal-prefixed","name":"ModalPrefixed"},"modalScrollable":{"path":"./modal-scrollable","name":"ModalScrollable"},"modalSlottedHeading":{"path":"./modal-slotted-heading","name":"ModalSlottedHeading"},"overview":{"path":"./overview","name":"Overview"},"pagination":{"path":"./pagination","name":"Pagination"},"popover":{"path":"./popover","name":"Popover"},"radioButtonWrapper":{"path":"./radio-button-wrapper","name":"RadioButtonWrapper"},"scroller":{"path":"./scroller","name":"Scroller"},"segmentedControl":{"path":"./segmented-control","name":"SegmentedControl"},"selectWrapper":{"path":"./select-wrapper","name":"SelectWrapper"},"spinner":{"path":"./spinner","name":"Spinner"},"stepperHorizontal":{"path":"./stepper-horizontal","name":"StepperHorizontal"},"switch":{"path":"./switch","name":"Switch"},"tabs":{"path":"./tabs","name":"Tabs"},"tabsBar":{"path":"./tabs-bar","name":"TabsBar"},"tag":{"path":"./tag","name":"Tag"},"tagDismissible":{"path":"./tag-dismissible","name":"TagDismissible"},"text":{"path":"./text","name":"Text"},"textFieldWrapper":{"path":"./text-field-wrapper","name":"TextFieldWrapper"},"textList":{"path":"./text-list","name":"TextList"},"textareaWrapper":{"path":"./textarea-wrapper","name":"TextareaWrapper"},"toastBasic":{"path":"./toast-basic","name":"ToastBasic"},"toastBasicDark":{"path":"./toast-basic-dark","name":"ToastBasicDark"},"toastBasicLongText":{"path":"./toast-basic-long-text","name":"ToastBasicLongText"},"toastOffset":{"path":"./toast-offset","name":"ToastOffset"},"toastPrefixed":{"path":"./toast-prefixed","name":"ToastPrefixed"},"typographyCyril":{"path":"./typography-cyril","name":"TypographyCyril"},"typographyFallbackStrategy":{"path":"./typography-fallback-strategy","name":"TypographyFallbackStrategy"},"typographyGreekAndCoptic":{"path":"./typography-greek-and-coptic","name":"TypographyGreekAndCoptic"},"typographyLatin":{"path":"./typography-latin","name":"TypographyLatin"}};
