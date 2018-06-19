import * as React from 'react';
import { observer } from 'mobx-react';
import HomeContentComponent from '../components/HomeContent';
// import globalStore from 'App/stores/GlobalStore';
import { match as Match } from 'react-router';
// import AppStore from 'modules/App/stores/AppStore';
import GlobalStore from 'modules/App/stores/GlobalStore';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State { }

@observer
class HomeContainer extends React.Component<Props, State> {
  
  componentDidMount() {
    const { location } = this.props;
    if (location.pathname === '/') {
      document.body.classList.add('homepage');
    }
  }

  render() {
    const currentPath = GlobalStore.currentPath;
    
    switch (currentPath) {
      case 'transaction':
        document.title = 'HB Explorer - Transactions Information';
        break;
      case 'transactions':
        document.title = 'HB Explorer - Transactions Information';
        break;
      case 'blocks':
        document.title = 'HB Explorer - Block Information';
        break;
      case 'block':
        document.title = 'HB Explorer - Block Information';
        break;
      case 'accounts':
        document.title = 'HB Explorer - Account Information';
        break;
      case 'address':
        document.title = 'HB Explorer - Account Information';
        break;
      case 'token':
        document.title = 'HB Explorer - Token Information';
        break;
      case 'profile':
        document.title = 'HB Explorer - Profile Information';
        break;
      default:
        document.title = 'HB Explorer - Ethereum BlockChain Explorer';
        break;
    }

    return (
      <div>
        <HomeContentComponent />
      </div>
    );
  }
}

export default HomeContainer as React.ComponentClass<Props>;
