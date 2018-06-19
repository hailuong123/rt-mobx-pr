import * as React from 'react';
// import lazyImport from 'resources/components/LazyImport';

import FooterComponent from '../components/Footer';
import history from '../../../resources/libs/History';

interface Props { }

interface State {
}

class FooterContainer extends React.Component<Props, State> {
  state = {
    currentPath: history.location.pathname
  };

  render() {
    return (
        <FooterComponent />
    );
  }

}

export default FooterContainer as React.ComponentClass<Props>;
