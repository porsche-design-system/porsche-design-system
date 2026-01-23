import { useState } from 'react';

export const TailwindcssMotion = () => {
  const [isMovingActive, setIsMovingActive] = useState(false);
  const [isEnterExitActive, setIsEnterExitActive] = useState(false);
  const [isShowHideActive, setIsShowHideActive] = useState(false);
  const [isExpandActive, setIsExpandActive] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-fluid-md p-fluid-md">
      <h3 className="prose-heading-md text-primary-light text-center w-full">Moving</h3>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: ok */}
      <div
        className={`[transition:transform_var(--transition-duration-short)] w-[200px] h-[100px] leading-[100px] text-center text-primary-light bg-surface-light rounded-lg cursor-pointer ${isMovingActive ? 'transform-[translateX(200px)]' : 'transform-[translateX(-200px)]'}`}
        onClick={() => setIsMovingActive((prev) => !prev)}
      >
        play
      </div>

      <h3 className="prose-heading-md text-primary-light text-center w-full">Enter / Exit</h3>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: ok */}
      <div
        className={`w-[200px] h-[100px] leading-[100px] text-center text-primary-light bg-surface-light rounded-lg cursor-pointer ${
          isEnterExitActive
            ? 'opacity-[0] transform-[translateY(40%)] [transition:opacity_var(--transition-duration-short)_var(--ease-out),transform_var(--transition-duration-short)_var(--ease-out)]'
            : 'opacity-[1] transform-[translateY(0px)] [transition:opacity_var(--transition-duration-moderate)_var(--ease-in),transform_var(--transition-duration-moderate)_var(--ease-in)]'
        }`}
        onClick={() => setIsEnterExitActive((prev) => !prev)}
      >
        play
      </div>

      <h3 className="prose-heading-md text-primary-light text-center w-full">Show / Hide</h3>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: ok */}
      <div
        className={`[transition:opacity_var(--transition-duration-long)] w-[200px] h-[100px] leading-[100px] text-center text-primary-light bg-surface-light rounded-lg cursor-pointer ${isShowHideActive ? 'opacity-[0]' : 'opacity-[1]'}`}
        onClick={() => setIsShowHideActive((prev) => !prev)}
      >
        play
      </div>

      <h3 className="prose-heading-md text-primary-light text-center w-full">Expand</h3>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: ok */}
      <div
        className={`w-[200px] h-[100px] leading-[100px] text-center text-primary-light bg-surface-light rounded-lg cursor-pointer ${
          isExpandActive
            ? 'h-[200px] [transition:height_var(--transition-duration-moderate)]'
            : 'h-auto [transition:height_var(--transition-duration-short)_var(--ease-in)]'
        }`}
        onClick={() => setIsExpandActive((prev) => !prev)}
      >
        play
      </div>
    </div>
  );
};
