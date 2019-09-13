import React from 'react';
import ReactDOM from 'react-dom';
import { attachEventProps, dashToPascalCase } from './utils';

export interface ReactExternalProps<ElementType> {
  ref?: React.RefObject<ElementType>;
  children?: React.ReactNode;
}
interface ReactInternalProps<ElementType> {
  forwardedRef?: React.RefObject<ElementType>;
  children?: React.ReactNode;
}
type InternalProps<AttributeProps, ElementType> = AttributeProps & ReactInternalProps<ElementType>;

export function createReactComponent<T extends object, E>(tagName: string) {
  const displayName = dashToPascalCase(tagName);

  class ReactComponent extends React.Component<InternalProps<T, E>> {
    componentRef: React.RefObject<E>;

    constructor(props: T & ReactInternalProps<E>) {
      super(props);
      this.componentRef = React.createRef();
    }

    static get displayName() {
      return displayName;
    }

    componentDidMount() {
      this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props: InternalProps<T, E>) {
      const node = ReactDOM.findDOMNode(this) as HTMLElement;
      attachEventProps(node, props);
    }

    render() {
      const { children, forwardedRef, ...cProps } = this.props;

      return React.createElement(
        tagName,
        {
          ...cProps,
          ref: forwardedRef
        },
        children
      );
    }
  }

  function forwardRef(props: InternalProps<T, E>, ref: React.Ref<E>) {
    return <ReactComponent {...props} forwardedRef={ref} />;
  }
  forwardRef.displayName = displayName;

  return React.forwardRef<E, T & ReactExternalProps<E>>(forwardRef);
}
