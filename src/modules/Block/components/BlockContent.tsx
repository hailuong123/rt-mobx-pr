import * as React from 'react';
import { observer } from 'mobx-react';
// import blockStore from '../stores/BotStore';

interface Props { }
interface State { }

@observer
class BlockContentComponent extends React.Component<Props, State> {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default BlockContentComponent as React.ComponentClass<Props>;
