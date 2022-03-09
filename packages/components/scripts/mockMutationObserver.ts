// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
(() => {
  class MutationObserverMock {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-member-accessibility,@typescript-eslint/no-empty-function
    constructor(callback) {}

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/no-empty-function
    disconnect() {}

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    observe(element, initObject) {}
  }

  global.MutationObserver = MutationObserverMock;
})();
