import * as React from 'react';

interface Props { }

interface State {
  component: React.ComponentClass;
  // tslint:disable-next-line:no-any
  store: any;
}

export default function lazyImport(importComponent: Function, storeComponent?: Function) {
  class AsyncComponent extends React.Component<Props, State> {

    constructor(props: Props) {
      super(props);

      this.state = {
        component: {}
      } as State;
    }

    async componentDidMount() {
      const component = await importComponent() as React.ComponentClass;
      let store = undefined;
      if (storeComponent) {
        store = await storeComponent();
      }
      this.setState({ component, store });
    }

    render() {
      const { component, store } = this.state;

      // tslint:disable-next-line:no-string-literal
      const Component = component['default'];
      // tslint:disable-next-line:no-string-literal
      const Store = store ? store['default'] : undefined;

      return Component
        ? <Component {...this.props} store={Store} />
        : null;
    }
  }
  return AsyncComponent;
}
