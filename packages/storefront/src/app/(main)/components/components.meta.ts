import { accordionMeta } from '@/app/(main)/components/accordion/accordion.meta';
import { aiTagMeta } from '@/app/(main)/components/ai-tag/ai-tag.meta';
import { bannerMeta } from '@/app/(main)/components/banner/banner.meta';
import { buttonMeta } from '@/app/(main)/components/button/button.meta';
import { buttonPureMeta } from '@/app/(main)/components/button-pure/button-pure.meta';
import { buttonTileMeta } from '@/app/(main)/components/button-tile/button-tile.meta';
import { canvasMeta } from '@/app/(main)/components/canvas/canvas.meta';
import { carouselMeta } from '@/app/(main)/components/carousel/carousel.meta';
import { checkboxMeta } from '@/app/(main)/components/checkbox/checkbox.meta';
import { crestMeta } from '@/app/(main)/components/crest/crest.meta';
import { displayMeta } from '@/app/(main)/components/display/display.meta';
import { dividerMeta } from '@/app/(main)/components/divider/divider.meta';
import { drilldownMeta } from '@/app/(main)/components/drilldown/drilldown.meta';
import { fieldsetMeta } from '@/app/(main)/components/fieldset/fieldset.meta';
import { flagMeta } from '@/app/(main)/components/flag/flag.meta';
import { flyoutMeta } from '@/app/(main)/components/flyout/flyout.meta';
import { headingMeta } from '@/app/(main)/components/heading/heading.meta';
import { iconMeta } from '@/app/(main)/components/icon/icon.meta';
import { inlineNotificationMeta } from '@/app/(main)/components/inline-notification/inline-notification.meta';
import { inputDateMeta } from '@/app/(main)/components/input-date/input-date.meta';
import { inputEmailMeta } from '@/app/(main)/components/input-email/input-email.meta';
import { inputMonthMeta } from '@/app/(main)/components/input-month/input-month.meta';
import { inputNumberMeta } from '@/app/(main)/components/input-number/input-number.meta';
import { inputPasswordMeta } from '@/app/(main)/components/input-password/input-password.meta';
import { inputSearchMeta } from '@/app/(main)/components/input-search/input-search.meta';
import { inputTelMeta } from '@/app/(main)/components/input-tel/input-tel.meta';
import { inputTextMeta } from '@/app/(main)/components/input-text/input-text.meta';
import { inputTimeMeta } from '@/app/(main)/components/input-time/input-time.meta';
import { inputUrlMeta } from '@/app/(main)/components/input-url/input-url.meta';
import { inputWeekMeta } from '@/app/(main)/components/input-week/input-week.meta';
import { linkMeta } from '@/app/(main)/components/link/link.meta';
import { linkPureMeta } from '@/app/(main)/components/link-pure/link-pure.meta';
import { linkTileMeta } from '@/app/(main)/components/link-tile/link-tile.meta';
import { linkTileProductMeta } from '@/app/(main)/components/link-tile-product/link-tile-product.meta';
import { modalMeta } from '@/app/(main)/components/modal/modal.meta';
import { modelSignatureMeta } from '@/app/(main)/components/model-signature/model-signature.meta';
import { multiSelectMeta } from '@/app/(main)/components/multi-select/multi-select.meta';
import { paginationMeta } from '@/app/(main)/components/pagination/pagination.meta';
import { pinCodeMeta } from '@/app/(main)/components/pin-code/pin-code.meta';
import { popoverMeta } from '@/app/(main)/components/popover/popover.meta';
import { radioGroupMeta } from '@/app/(main)/components/radio-group/radio-group.meta';
import { scrollerMeta } from '@/app/(main)/components/scroller/scroller.meta';
import { segmentedControlMeta } from '@/app/(main)/components/segmented-control/segmented-control.meta';
import { selectMeta } from '@/app/(main)/components/select/select.meta';
import { sheetMeta } from '@/app/(main)/components/sheet/sheet.meta';
import { spinnerMeta } from '@/app/(main)/components/spinner/spinner.meta';
import { stepperHorizontalMeta } from '@/app/(main)/components/stepper-horizontal/stepper-horizontal.meta';
import { switchMeta } from '@/app/(main)/components/switch/switch.meta';
import { tableMeta } from '@/app/(main)/components/table/table.meta';
import { tabsMeta } from '@/app/(main)/components/tabs/tabs.meta';
import { tabsBarMeta } from '@/app/(main)/components/tabs-bar/tabs-bar.meta';
import { tagMeta } from '@/app/(main)/components/tag/tag.meta';
import { tagDismissibleMeta } from '@/app/(main)/components/tag-dismissible/tag-dismissible.meta';
import { textMeta } from '@/app/(main)/components/text/text.meta';
import { textListMeta } from '@/app/(main)/components/text-list/text-list.meta';
import { textareaMeta } from '@/app/(main)/components/textarea/textarea.meta';
import { toastMeta } from '@/app/(main)/components/toast/toast.meta';
import { wordmarkMeta } from '@/app/(main)/components/wordmark/wordmark.meta';
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
