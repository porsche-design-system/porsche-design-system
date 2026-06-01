import { accordionMeta } from '@/app/components/accordion/accordion.meta';
import { aiTagMeta } from '@/app/components/ai-tag/ai-tag.meta';
import { bannerMeta } from '@/app/components/banner/banner.meta';
import { buttonMeta } from '@/app/components/button/button.meta';
import { buttonPureMeta } from '@/app/components/button-pure/button-pure.meta';
import { buttonTileMeta } from '@/app/components/button-tile/button-tile.meta';
import { canvasMeta } from '@/app/components/canvas/canvas.meta';
import { carouselMeta } from '@/app/components/carousel/carousel.meta';
import { checkboxMeta } from '@/app/components/checkbox/checkbox.meta';
import { crestMeta } from '@/app/components/crest/crest.meta';
import { displayMeta } from '@/app/components/display/display.meta';
import { dividerMeta } from '@/app/components/divider/divider.meta';
import { drilldownMeta } from '@/app/components/drilldown/drilldown.meta';
import { fieldsetMeta } from '@/app/components/fieldset/fieldset.meta';
import { flagMeta } from '@/app/components/flag/flag.meta';
import { flyoutMeta } from '@/app/components/flyout/flyout.meta';
import { headingMeta } from '@/app/components/heading/heading.meta';
import { iconMeta } from '@/app/components/icon/icon.meta';
import { inlineNotificationMeta } from '@/app/components/inline-notification/inline-notification.meta';
import { inputDateMeta } from '@/app/components/input-date/input-date.meta';
import { inputEmailMeta } from '@/app/components/input-email/input-email.meta';
import { inputMonthMeta } from '@/app/components/input-month/input-month.meta';
import { inputNumberMeta } from '@/app/components/input-number/input-number.meta';
import { inputPasswordMeta } from '@/app/components/input-password/input-password.meta';
import { inputSearchMeta } from '@/app/components/input-search/input-search.meta';
import { inputTelMeta } from '@/app/components/input-tel/input-tel.meta';
import { inputTextMeta } from '@/app/components/input-text/input-text.meta';
import { inputTimeMeta } from '@/app/components/input-time/input-time.meta';
import { inputUrlMeta } from '@/app/components/input-url/input-url.meta';
import { inputWeekMeta } from '@/app/components/input-week/input-week.meta';
import { linkMeta } from '@/app/components/link/link.meta';
import { linkPureMeta } from '@/app/components/link-pure/link-pure.meta';
import { linkTileMeta } from '@/app/components/link-tile/link-tile.meta';
import { linkTileProductMeta } from '@/app/components/link-tile-product/link-tile-product.meta';
import { modalMeta } from '@/app/components/modal/modal.meta';
import { modelSignatureMeta } from '@/app/components/model-signature/model-signature.meta';
import { multiSelectMeta } from '@/app/components/multi-select/multi-select.meta';
import { paginationMeta } from '@/app/components/pagination/pagination.meta';
import { pinCodeMeta } from '@/app/components/pin-code/pin-code.meta';
import { popoverMeta } from '@/app/components/popover/popover.meta';
import { radioGroupMeta } from '@/app/components/radio-group/radio-group.meta';
import { scrollerMeta } from '@/app/components/scroller/scroller.meta';
import { segmentedControlMeta } from '@/app/components/segmented-control/segmented-control.meta';
import { selectMeta } from '@/app/components/select/select.meta';
import { sheetMeta } from '@/app/components/sheet/sheet.meta';
import { spinnerMeta } from '@/app/components/spinner/spinner.meta';
import { stepperHorizontalMeta } from '@/app/components/stepper-horizontal/stepper-horizontal.meta';
import { switchMeta } from '@/app/components/switch/switch.meta';
import { tableMeta } from '@/app/components/table/table.meta';
import { tabsMeta } from '@/app/components/tabs/tabs.meta';
import { tabsBarMeta } from '@/app/components/tabs-bar/tabs-bar.meta';
import { tagMeta } from '@/app/components/tag/tag.meta';
import { tagDismissibleMeta } from '@/app/components/tag-dismissible/tag-dismissible.meta';
import { textMeta } from '@/app/components/text/text.meta';
import { textListMeta } from '@/app/components/text-list/text-list.meta';
import { textareaMeta } from '@/app/components/textarea/textarea.meta';
import { toastMeta } from '@/app/components/toast/toast.meta';
import { wordmarkMeta } from '@/app/components/wordmark/wordmark.meta';
import type { ComponentDocsMeta } from '@/models/meta';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Aggregated documentation meta for all components.
 */
export const componentDocsMeta = {
  'p-accordion': accordionMeta,
  'p-ai-tag': aiTagMeta,
  'p-banner': bannerMeta,
  'p-button': buttonMeta,
  'p-button-pure': buttonPureMeta,
  'p-button-tile': buttonTileMeta,
  'p-canvas': canvasMeta,
  'p-carousel': carouselMeta,
  'p-checkbox': checkboxMeta,
  'p-crest': crestMeta,
  'p-display': displayMeta,
  'p-divider': dividerMeta,
  'p-drilldown': drilldownMeta,
  'p-fieldset': fieldsetMeta,
  'p-flag': flagMeta,
  'p-flyout': flyoutMeta,
  'p-heading': headingMeta,
  'p-icon': iconMeta,
  'p-inline-notification': inlineNotificationMeta,
  'p-input-date': inputDateMeta,
  'p-input-email': inputEmailMeta,
  'p-input-month': inputMonthMeta,
  'p-input-number': inputNumberMeta,
  'p-input-password': inputPasswordMeta,
  'p-input-search': inputSearchMeta,
  'p-input-tel': inputTelMeta,
  'p-input-text': inputTextMeta,
  'p-input-time': inputTimeMeta,
  'p-input-url': inputUrlMeta,
  'p-input-week': inputWeekMeta,
  'p-link': linkMeta,
  'p-link-pure': linkPureMeta,
  'p-link-tile': linkTileMeta,
  'p-link-tile-product': linkTileProductMeta,
  'p-modal': modalMeta,
  'p-model-signature': modelSignatureMeta,
  'p-multi-select': multiSelectMeta,
  'p-pagination': paginationMeta,
  'p-pin-code': pinCodeMeta,
  'p-popover': popoverMeta,
  'p-radio-group': radioGroupMeta,
  'p-scroller': scrollerMeta,
  'p-segmented-control': segmentedControlMeta,
  'p-select': selectMeta,
  'p-sheet': sheetMeta,
  'p-spinner': spinnerMeta,
  'p-stepper-horizontal': stepperHorizontalMeta,
  'p-switch': switchMeta,
  'p-table': tableMeta,
  'p-tabs': tabsMeta,
  'p-tabs-bar': tabsBarMeta,
  'p-tag': tagMeta,
  'p-tag-dismissible': tagDismissibleMeta,
  'p-text': textMeta,
  'p-text-list': textListMeta,
  'p-textarea': textareaMeta,
  'p-toast': toastMeta,
  'p-wordmark': wordmarkMeta,
} satisfies Partial<{ [Tag in HTMLTagOrComponent]: ComponentDocsMeta<Tag> }>;
