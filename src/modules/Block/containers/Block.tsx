import * as React from 'react';
import { observer } from 'mobx-react';
import BlockContentComponent from '../components/BlockContent';
// import globalStore from 'App/stores/GlobalStore';
import { match as Match } from 'react-router';
import AppStore from '../../App/stores/AppStore';

interface Props {
  match: Match<IMatchParams>;
}
interface State { }

@observer
class BlockContainer extends React.Component<Props, State> {

  componentWillMount() {
    if (AppStore.isMenuOpen) {
      AppStore.displayMenuMobile();
    }
  }

  componentWillUnmount() {
    //
  }

  render() {
    return (
      <div>
        <BlockContentComponent />
      </div>
    );
  }
}

export default BlockContainer as React.ComponentClass<Props>;
