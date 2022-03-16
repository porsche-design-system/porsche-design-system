import { themeLight, textSmall } from '@porsche-design-system/components-react/utilities/jss';

export const UtilitiesPage = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
        width: '100px',
        background: themeLight.brand,
        color: '#fff',
        ...textSmall,
      }}
    >
      {themeLight.brand}
    </div>
  );
};
