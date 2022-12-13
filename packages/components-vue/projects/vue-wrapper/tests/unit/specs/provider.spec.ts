import { fireEvent, getByTestId, render } from '@testing-library/vue';
import { PorscheDesignSystemProvider, PButton } from '../../../src/public-api';
import { h, ref } from 'vue';
import * as pds from '@porsche-design-system/components-js';

jest.mock('@porsche-design-system/components-js', () => {
  const ActualPDS = jest.requireActual('@porsche-design-system/components-js');

  return {
    ...ActualPDS,
    load: jest.fn().mockImplementation(ActualPDS.load),
  };
});

describe('PorscheDesignSystemProvider', () => {
  it('should render unprefixed components', () => {
    const { container } = render(PorscheDesignSystemProvider, { slots: { default: PButton } });

    expect(container.firstElementChild.tagName).toBe('P-BUTTON');
  });

  it('should render prefixed components', () => {
    const { container } = render(PorscheDesignSystemProvider, {
      props: { prefix: 'my-prefix' },
      slots: { default: PButton },
    });

    expect(container.firstElementChild.tagName).toBe('MY-PREFIX-P-BUTTON');
  });

  it('should support changing prefix at runtime', async () => {
    function testComponent() {
      const prefix = ref('my-prefix');

      return h(PorscheDesignSystemProvider, { prefix: prefix.value }, () =>
        h(PButton, { 'data-testid': 'button', onClick: () => (prefix.value = 'new-prefix') }, () => 'Some label')
      );
    }

    const { container, getByTestId } = render(testComponent);
    const spy = jest.spyOn(pds, 'load');
    const button = getByTestId('button');

    expect(container).toMatchSnapshot();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({ prefix: 'my-prefix' });

    await fireEvent.click(button);

    expect(container).toMatchSnapshot();
    expect(pds.load).toBeCalledTimes(2);
    expect(pds.load).toBeCalledWith({ prefix: 'new-prefix' });
  });

  it('should render components wrapped with nested provider and prefix', () => {
    const { container } = render(
      h(PorscheDesignSystemProvider, { prefix: 'my-prefix' }, () => [
        h(PButton, () => 'Some label'),
        h(PorscheDesignSystemProvider, { prefix: 'another-prefix' }, () => [
          h(PButton, () => 'Some label'),
          h(PorscheDesignSystemProvider, () => h(PButton, () => 'Some label')),
        ]),
      ])
    );

    expect(container).toMatchSnapshot();
  });

  it('should throw error if not provided', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    expect(() => render(PButton)).toThrowErrorMatchingInlineSnapshot(
      '"It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it."'
    );

    spy.mockRestore();
  });
});
