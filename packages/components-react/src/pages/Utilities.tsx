import { themeLight, textFluidSmall } from '@porsche-design-system/components-react/utilities/js';

export const UtilitiesPage = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
        width: '100px',
        background: themeLight.primary,
        color: '#fff',
        ...textFluidSmall,
      }}
    >
      {themeLight.primary}
    </div>
  );
};
