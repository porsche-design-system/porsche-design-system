export const setDialogVisibility = (isOpen: boolean, dialog: HTMLDialogElement, scrollArea: HTMLElement): void => {
  // `.showModal()` / `.close()` shall only be called when state changes and after render cycle has finished
  // (e.g. in `componentDidRender()`) to prepare visibility states of dialog in order to focus the dismiss button correctly
  if (isOpen === true && !dialog.open) {
    scrollArea.scrollTo(0, 0); // reset scroll position each time dialog gets opened again
    dialog.showModal(); // shows modal on `#top-layer`
  } else if (isOpen === false && dialog.open) {
    dialog.close();
  }
};

export const onCancelDialog = (e: Event, cb: () => void): void => {
  e.preventDefault(); // prevent closing the dialog uncontrolled by ESC
  cb();
};

export const onClickDialog = (e: MouseEvent, cb: () => void, disable: boolean = false): void => {
  if (!disable && (e as MouseEvent & { target: HTMLElement }).target.className === 'scroller') {
    cb(); // dismiss dialog when clicked on backdrop
  }
};
