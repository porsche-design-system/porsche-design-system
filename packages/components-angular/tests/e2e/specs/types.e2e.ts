import { IconName, TabChangeEvent } from '@porsche-design-system/components-angular';

describe('types', () => {
  it('should be exported from root', () => {
    const icon: IconName = '360';
    const event: TabChangeEvent = { activeTabIndex: 1 };
    expect(icon).toBe('360');
    expect(event).toEqual({ activeTabIndex: 1 });
  });
});
