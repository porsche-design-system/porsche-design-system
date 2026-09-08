import {
  vanillaExtractBasic,
  vanillaExtractBasicHalfEnd,
  vanillaExtractBasicHalfStart,
  vanillaExtractBasicThirdEnd,
  vanillaExtractBasicThirdFollow,
  vanillaExtractBasicThirdStart,
  vanillaExtractBasicTwoThirdsEnd,
  vanillaExtractBasicTwoThirdsStart,
  vanillaExtractExtended,
  vanillaExtractExtendedHalfEnd,
  vanillaExtractExtendedHalfStart,
  vanillaExtractFull,
  vanillaExtractGridWrapper,
  vanillaExtractNarrow,
  vanillaExtractNarrowHalfEnd,
  vanillaExtractNarrowHalfStart,
  vanillaExtractPaddingSmall,
  vanillaExtractSubgridBasic,
  vanillaExtractSubgridExtended,
  vanillaExtractSubgridNarrow,
  vanillaExtractWide,
} from './grid.css';

export const VanillaExtractGrid = () => (
  <div className={`${vanillaExtractGridWrapper} _pds-grid-visualization`}>
    <div className={`${vanillaExtractFull} ${vanillaExtractPaddingSmall}`}>Full</div>
    <div className={`${vanillaExtractWide} ${vanillaExtractPaddingSmall}`}>Wide</div>
    <div className={`${vanillaExtractExtended} ${vanillaExtractPaddingSmall}`}>Extended</div>
    <div className={`${vanillaExtractBasic} ${vanillaExtractPaddingSmall}`}>Basic</div>
    <div className={`${vanillaExtractNarrow} ${vanillaExtractPaddingSmall}`}>Narrow</div>
    <div className={vanillaExtractSubgridExtended}>
      <div className={vanillaExtractExtendedHalfStart}>One Half (Extended)</div>
      <div className={vanillaExtractExtendedHalfEnd}>One Half (Extended)</div>
    </div>
    <div className={vanillaExtractSubgridBasic}>
      <div className={vanillaExtractBasicHalfStart}>One Half (Basic)</div>
      <div className={vanillaExtractBasicHalfEnd}>One Half (Basic)</div>
      <div className={vanillaExtractBasicThirdStart}>One Third (Basic)</div>
      <div className={vanillaExtractBasicThirdFollow}>One Third (Basic)</div>
      <div className={vanillaExtractBasicThirdEnd}>One Third (Basic)</div>
      <div className={vanillaExtractBasicTwoThirdsStart}>Two Thirds (Basic)</div>
      <div className={vanillaExtractBasicThirdEnd}>One Third (Basic)</div>
      <div className={vanillaExtractBasicThirdStart}>One Third (Basic)</div>
      <div className={vanillaExtractBasicTwoThirdsEnd}>Two Thirds (Basic)</div>
    </div>
    <div className={vanillaExtractSubgridNarrow}>
      <div className={vanillaExtractNarrowHalfStart}>One Half (Narrow)</div>
      <div className={vanillaExtractNarrowHalfEnd}>One Half (Narrow)</div>
    </div>
  </div>
);
