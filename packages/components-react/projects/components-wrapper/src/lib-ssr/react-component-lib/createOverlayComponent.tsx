import React from 'react';
import ReactDOM from 'react-dom';
import { attachEventProps } from './utils/attachEventProps';

interface LoadingElement {
  present: () => any;
  dismiss: () => any;
}
interface ReactOverlayProps<E> {
  children?: React.ReactNode;
  isOpen: boolean;
  onDidDismiss?: (event: CustomEvent<E>) => void;
}

export function createOverlayComponent<
  T extends object,
  LoadingElementType extends LoadingElement,
  OverlayEventDetail
>(displayName: string, controller: { create: (options: any) => Promise<LoadingElementType> }) {
  const dismissEventName = `on${displayName}DidDismiss`;

  type Props = T & ReactOverlayProps<OverlayEventDetail>;

  return class ReactOverlayComponent extends React.Component<Props> {
    controller?: LoadingElementType;
    el: HTMLDivElement;

    constructor(props: Props) {
      super(props);
      this.el = document.createElement('div');
    }

    static get displayName() {
      return displayName;
    }

    componentDidMount() {
      if (this.props.isOpen) {
        this.present();
      }
    }

    async componentDidUpdate(prevProps: Props) {
      if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen === true) {
        this.present(prevProps);
      }
      if (
        this.controller &&
        prevProps.isOpen !== this.props.isOpen &&
        this.props.isOpen === false
      ) {
        await this.controller.dismiss();
      }
    }

    async present(prevProps?: Props) {
      // tslint:disable-next-line:no-empty
      const { children, isOpen, onDidDismiss = () => {}, ...cProps } = this.props;
      const elementProps = {
        ...cProps,
        [dismissEventName]: onDidDismiss,
      };

      this.controller = await controller.create({
        ...elementProps,
        component: this.el,
        componentProps: {},
      });

      attachEventProps(this.controller as any, elementProps, prevProps);

      this.controller.present();
    }

    render() {
      return ReactDOM.createPortal(this.props.children, this.el);
    }
  };
}
