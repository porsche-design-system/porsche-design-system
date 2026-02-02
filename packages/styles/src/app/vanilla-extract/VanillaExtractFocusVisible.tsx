import { vanillaExtractFocusVisibleButton, vanillaExtractFocusVisibleWrapper } from './focus-visible.css.ts';

export const VanillaExtractFocusVisible = () => {
  return (
    <div className={vanillaExtractFocusVisibleWrapper}>
      <button className={vanillaExtractFocusVisibleButton} type="button">
        Focus Visible
      </button>
    </div>
  );
};
