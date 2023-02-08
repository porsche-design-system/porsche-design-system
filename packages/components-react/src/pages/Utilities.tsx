import { themeLight, textSmallStyle } from '@porsche-design-system/components-react/styles';

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
        ...textSmallStyle,
      }}
    >
      {themeLight.primary}
    </div>
  );
};
