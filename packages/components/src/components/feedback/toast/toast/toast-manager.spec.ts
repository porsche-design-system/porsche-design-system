describe('register()', () => {
  it('should throw', () => {});
  it('should return toast manager instance', () => {});
});

describe('unregister()', () => {
  it('should remove toastEl reference, remove messages and clear timeout', () => {});
});

describe('addMessage()', () => {
  it('should throw if no toastEl reference is set', () => {});
  it('should set message state to neutral if none was provided', () => {});
  it('should throw if an invalid message state was provided', () => {});
  it('should add messages to messages array', () => {});
  it('should force update if first element was added to messages array', () => {});
});

describe('dismissToastItem()', () => {
  it('should clear timeout, remove first element in array by shifting and trigger force update', () => {});
});

describe('getToast()', () => {
  it('should get first element in array', () => {});
  it('should get undefined if array is empty', () => {});
});

describe('startTimeout()', () => {
  it('should set a timeout', () => {});
});
