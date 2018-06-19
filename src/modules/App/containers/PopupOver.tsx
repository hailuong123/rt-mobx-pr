import * as React from 'react';
import { observer } from 'mobx-react';
import popOverStore from '../stores/PopOverStore';

interface Props { }
interface State { }

@observer
class PopOverContainer extends React.Component<Props, State> {
  render() {
    if (!popOverStore.isOpen) {
      return null;
    }
    return <popOverStore.Component {...popOverStore.props} />;
  }
}

export default PopOverContainer as React.ComponentClass<Props>;
